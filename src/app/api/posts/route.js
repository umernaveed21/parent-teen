import { createClient } from 'contentful-management';
import { currentUser } from '@clerk/nextjs/server';
import { tiptapToContentfulRichText } from '../../../lib/tiptapToContentful';

async function uploadCoverImage(client, spaceId, environmentId, coverImage) {
  // coverImage.data looks like "data:image/png;base64,iVBORw0KGgo..."
  const matches = coverImage.data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid image data');

  const contentType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  // Step 1: upload the raw file bytes
  const upload = await client.upload.create(
    { spaceId },
    { file: buffer }
  );

  // Step 2: create an asset pointing at that upload
  let asset = await client.asset.create(
    { spaceId, environmentId },
    {
      fields: {
        title: { 'en-US': coverImage.fileName },
        file: {
          'en-US': {
            contentType,
            fileName: coverImage.fileName,
            uploadFrom: {
              sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id },
            },
          },
        },
      },
    }
  );

  // Step 3: process the asset (generates the actual public URL)
  asset = await client.asset.processForAllLocales(
    { spaceId, environmentId },
    asset
  );

  // Step 4: publish the asset so it's publicly accessible
  asset = await client.asset.publish(
    { spaceId, environmentId, assetId: asset.sys.id },
    asset
  );

  return asset.sys.id;
}

export async function POST(request) {
  const user = await currentUser();
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = 'master';

  try {
    let coverImageAssetId = null;
    if (body.coverImage) {
      coverImageAssetId = await uploadCoverImage(client, spaceId, environmentId, body.coverImage);
    }

    const fields = {
      title: { 'en-US': body.title },
      slug: { 'en-US': body.slug },
      description: { 'en-US': body.description },
      author: { 'en-US': body.author },
      authorRole: { 'en-US': body.authorRole },
      date: { 'en-US': new Date().toISOString() },
      readTime: { 'en-US': body.readTime || '5 min read' },
      category: { 'en-US': body.category },
      subCategory: { 'en-US': body.subCategory },
      parentCat: { 'en-US': body.parentCat },
      subcatName: { 'en-US': body.subcatName },
      subcatLink: { 'en-US': body.subcatLink },
      content: { 'en-US': tiptapToContentfulRichText(body.content) },
    };

    if (coverImageAssetId) {
      fields.coverImage = {
        'en-US': {
          sys: { type: 'Link', linkType: 'Asset', id: coverImageAssetId },
        },
      };
    }

    if (body.authorReferenceId) {
  fields.authorReference = {
    'en-US': {
      sys: { type: 'Link', linkType: 'Entry', id: body.authorReferenceId },
    },
  };
}
    const entry = await client.entry.create(
      { spaceId, environmentId, contentTypeId: 'blogPost' },
      { fields }
    );

    return Response.json({ success: true, entryId: entry.sys.id });
  } catch (error) {
    console.error('Contentful error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}