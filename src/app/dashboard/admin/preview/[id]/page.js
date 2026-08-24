import { createClient } from 'contentful-management';
import { currentUser } from '@clerk/nextjs/server';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richTextOptions } from '../../../../../lib/richTextRenderer';

export default async function PreviewPage({ params }) {
  const resolvedParams = await params;
  const entryId = resolvedParams.id;

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

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = 'master';

  const entry = await client.entry.get({ spaceId, environmentId, entryId });
  const fields = entry.fields;

  const get = (field) => fields[field]?.['en-US'];

  let coverImageUrl = null;
  const coverImageLink = get('coverImage');
  if (coverImageLink?.sys?.id) {
    try {
      const asset = await client.asset.get({ spaceId, environmentId, assetId: coverImageLink.sys.id });
      coverImageUrl = asset.fields?.file?.['en-US']?.url
        ? `https:${asset.fields.file['en-US'].url}`
        : null;
    } catch {
      coverImageUrl = null;
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-amber-50 border-b border-amber-200 py-3 px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
          Preview — This article is not yet published
        </span>
      </div>

      <header className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#009999] bg-teal-50 border border-teal-100 px-3 py-1 rounded-md">
          {get('subcatName')}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#003366] mt-4 tracking-tight leading-tight">
          {get('title')}
        </h1>
        <div className="flex flex-wrap items-center text-sm text-slate-400 font-medium mt-6 pb-6 border-b border-slate-200 gap-4">
          <span>By <strong>{get('author')}</strong></span>
          <span className="text-slate-200">|</span>
          <span>{get('readTime')}</span>
        </div>
      </header>

      {coverImageUrl && (
        <div className="max-w-4xl mx-auto px-4 mb-10">
          <img
            src={coverImageUrl}
            alt={get('title')}
            className="w-full h-[300px] md:h-[420px] object-cover rounded-2xl border border-slate-200 shadow-sm"
          />
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm">
          <article>
            {get('content') ? (
              documentToReactComponents(get('content'), richTextOptions)
            ) : (
              <p className="text-slate-500 italic">No content yet.</p>
            )}
          </article>
        </div>
      </main>

      <pre className="max-w-4xl mx-auto px-4 mt-8 text-xs bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto">
        {JSON.stringify(get('content'), null, 2)}
      </pre>

      <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
        <a href="/dashboard/admin" className="text-sm font-semibold text-[#009999] hover:underline">
          &larr; Back to Review & Publish
        </a>
      </div>
    </div>
  );
}