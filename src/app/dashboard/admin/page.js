import { createClient } from 'contentful-management';
import { currentUser } from '@clerk/nextjs/server';
import AdminPostList from '../../../components/AdminPostList';

export default async function AdminDashboardPage() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (!user || role !== 'admin') {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#003366]">Admins Only</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            This area is restricted to team admins.
          </p>
        </div>
      </div>
    );
  }

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = 'master';

  const response = await client.entry.getMany({
    spaceId,
    environmentId,
    query: {
      content_type: 'blogPost',
      order: '-sys.createdAt',
      limit: 100,
    },
  });

  const posts = response.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title?.['en-US'] || '(untitled)',
    author: item.fields.author?.['en-US'] || 'Unknown',
    category: item.fields.category?.['en-US'] || '',
    isPublished: !!item.sys.publishedVersion,
    createdAt: item.sys.createdAt,
  }));

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#003366]">Review & Publish</h1>
          <p className="text-slate-500 text-sm mt-1">
            All submitted articles across your team.
          </p>
        </div>

        <AdminPostList posts={posts} />
      </div>
    </div>
  );
}