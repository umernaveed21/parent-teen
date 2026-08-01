import { createClient } from 'contentful-management';
import { currentUser } from '@clerk/nextjs/server';
import { tiptapToContentfulRichText } from '../../../../lib/tiptapToContentful';

async function uploadCoverImage(client, spaceId, environmentId, coverImage) {
  const matches = coverImage.data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid image data');

  const contentType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  const upload = await client.upload.create({ spaceId }, { file: buffer });

  let asset = await client.asset.create(
    { spaceId, environmentId },
    {
      fields: {
        title: { 'en-US': coverImage.fileName },
        file: {
          'en-US': {
            contentType,
            fileName: coverImage.fileName,
            uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
          },
        },
      },
    }
  );

  asset = await client.asset.processForAllLocales({ spaceId, environmentId }, asset);
  asset = await client.asset.publish({ spaceId, environmentId, assetId: asset.sys.id }, asset);

  return asset.sys.id;
}

export async function GET(request, { params }) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (!user || role !== 'admin') {
    return Response.json({ error: 'Not authorized' }, { status: 403 });
  }

  const resolvedParams = await params;
  const entryId = resolvedParams.id;

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = 'master';

  try {
    const entry = await client.entry.get({ spaceId, environmentId, entryId });
    const fields = entry.fields;
    const get = (f) => fields[f]?.['en-US'];

    let coverImageUrl = null;
    const coverImageLink = get('coverImage');
    if (coverImageLink?.sys?.id) {
      try {
        const asset = await client.asset.get({ spaceId, environmentId, assetId: coverImageLink.sys.id });
        coverImageUrl = asset.fields?.file?.['en-US']?.url ? `https:${asset.fields.file['en-US'].url}` : null;
      } catch {
        coverImageUrl = null;
      }
    }

    let authorReferenceId = null;
    const authorRefLink = get('authorReference');
    if (authorRefLink?.sys?.id) authorReferenceId = authorRefLink.sys.id;

    return Response.json({
      id: entry.sys.id,
      title: get('title'),
      description: get('description'),
      author: get('author'),
      authorRole: get('authorRole'),
      authorReferenceId,
      subCategory: get('subCategory'),
      content: get('content'),
      coverImageUrl,
      isPublished: !!entry.sys.publishedVersion,
    });
  } catch (error) {
    console.error('Fetch entry error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (!user || role !== 'admin') {
    return Response.json({ error: 'Not authorized' }, { status: 403 });
  }

  const resolvedParams = await params;
  const entryId = resolvedParams.id;
  const body = await request.json();

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = 'master';

  try {
    let entry = await client.entry.get({ spaceId, environmentId, entryId });
    const wasPublished = !!entry.sys.publishedVersion;

    entry.fields.title = { 'en-US': body.title };
    entry.fields.description = { 'en-US': body.description };
    entry.fields.author = { 'en-US': body.author };
    entry.fields.authorRole = { 'en-US': body.authorRole };
    entry.fields.subCategory = { 'en-US': body.subCategory };
    entry.fields.category = { 'en-US': body.category };
    entry.fields.parentCat = { 'en-US': body.parentCat };
    entry.fields.subcatName = { 'en-US': body.subcatName };
    entry.fields.subcatLink = { 'en-US': body.subcatLink };
    entry.fields.content = { 'en-US': tiptapToContentfulRichText(body.content) };

    if (body.authorReferenceId) {
      entry.fields.authorReference = {
        'en-US': { sys: { type: 'Link', linkType: 'Entry', id: body.authorReferenceId } },
      };
    }

    if (body.coverImage) {
      const coverImageAssetId = await uploadCoverImage(client, spaceId, environmentId, body.coverImage);
      entry.fields.coverImage = {
        'en-US': { sys: { type: 'Link', linkType: 'Asset', id: coverImageAssetId } },
      };
    }

    entry = await client.entry.update({ spaceId, environmentId, entryId }, entry);

    if (wasPublished) {
      entry = await client.entry.publish({ spaceId, environmentId, entryId }, entry);
    }

    return Response.json({ success: true, entryId: entry.sys.id, rePublished: wasPublished });
  } catch (error) {
    console.error('Update entry error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}