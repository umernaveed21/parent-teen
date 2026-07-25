import { createClient } from 'contentful-management';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (!user || role !== 'admin') {
    return Response.json({ error: 'Not authorized' }, { status: 403 });
  }

  const { entryId } = await request.json();
  if (!entryId) {
    return Response.json({ error: 'Missing entryId' }, { status: 400 });
  }

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = 'master';

  try {
    const entry = await client.entry.get({ spaceId, environmentId, entryId });
    const unpublished = await client.entry.unpublish({ spaceId, environmentId, entryId }, entry);

    return Response.json({ success: true, entryId: unpublished.sys.id });
  } catch (error) {
    console.error('Unpublish error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}