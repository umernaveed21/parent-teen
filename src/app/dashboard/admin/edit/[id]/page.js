import { currentUser } from '@clerk/nextjs/server';
import EditPostForm from '../../../../components/EditPostForm';

export default async function EditArticlePage({ params }) {
  const resolvedParams = await params;
  const postId = resolvedParams.id;

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (!user || role !== 'admin') {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#003366]">Admins Only</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#003366]">Edit Article</h1>
          <a href="/dashboard/admin" className="text-sm font-semibold text-[#009999] hover:underline">
            &larr; Back to Review & Publish
          </a>
        </div>

        <EditPostForm postId={postId} />
      </div>
    </div>
  );
}