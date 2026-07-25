import { getAllAuthors } from '../../../lib/contentful';

export async function GET() {
  try {
    const authors = await getAllAuthors();
    return Response.json({ authors });
  } catch (error) {
    console.error('Error fetching authors:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}