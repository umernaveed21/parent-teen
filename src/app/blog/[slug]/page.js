import React from 'react';
import { getPostBySlug } from '../../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richTextOptions } from '../../../lib/richTextRenderer';
import ShareButton from '../../../components/ShareButton';

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = await getPostBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found | ParentAndTeen.com.pk',
    };
  }

  const url = `https://www.parentandteen.com.pk/blog/${resolvedParams.slug}`;

  return {
    title: `${article.title} | ParentAndTeen.com.pk`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: 'ParentAndTeen.com.pk',
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: [article.author],
      images: article.coverImageUrl
        ? [
            {
              url: article.coverImageUrl,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const article = await getPostBySlug(slug);

  if (!article) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#003366]">Article In Production</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Our editorial team is busy editing and verifying this specific deep-dive. Check back with us shortly!
          </p>
          <a href="/" className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-white bg-[#009999] hover:bg-[#008080] px-6 py-3 rounded-xl transition">
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const articleUrl = `https://www.parentandteen.com.pk/blog/${slug}`;

  const AuthorBox = () => (
    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 bg-slate-50/60 p-5 rounded-xl border border-slate-100 hover:bg-slate-100/60 transition">
      {article.authorPhotoUrl ? (
        <img
          src={article.authorPhotoUrl}
          alt={article.author}
          className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-[#009999] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
          {article.author.charAt(0)}
        </div>
      )}
      <div>
        <h4 className="text-base font-bold text-[#003366]">{article.author}</h4>
        <p className="text-xs text-[#009999] font-semibold">{article.authorRole}</p>
        <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">
          {article.authorBio || 'Contributing writer for ParentAndTeen.com.pk.'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <nav className="flex flex-wrap items-center space-x-2 text-xs font-bold tracking-wide text-slate-400 uppercase">
          <a href="/" className="hover:text-[#009999] transition">Home</a>
          <span>&gt;</span>
          <span className="text-slate-500">{article.parentCat}</span>
          <span>&gt;</span>
          <a href={`/categories/${article.subcatLink}`} className="hover:text-[#009999] transition text-slate-500">
            {article.subcatName}
          </a>
          <span className="hidden sm:inline">&gt;</span>
          <span className="text-[#009999] truncate max-w-[200px] hidden sm:inline">{article.title}</span>
        </nav>
      </div>

      <header className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#009999] bg-teal-50 border border-teal-100 px-3 py-1 rounded-md">
          {article.subcatName}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#003366] mt-4 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center text-sm text-slate-400 font-medium mt-6 pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center space-x-2 text-slate-700">
            <span className="w-7 h-7 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-xs">
              {article.author ? article.author.charAt(0) : 'A'}
            </span>
            <span>By <strong>{article.author || "Anonymous"}</strong></span>
          </div>
          <span className="text-slate-200">|</span>
          <span>{formattedDate}</span>
          <span className="text-slate-200">|</span>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{article.readTime}</span>
          </span>
        </div>

        <div className="mt-4">
          <ShareButton title={article.title} url={articleUrl} />
        </div>
      </header>

      {article.coverImageUrl && (
        <div className="max-w-4xl mx-auto px-4 mb-10">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full h-[300px] md:h-[420px] object-cover rounded-2xl border border-slate-200 shadow-sm"
          />
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm">
          <article>
            {article.content ? (
              documentToReactComponents(article.content, richTextOptions)
            ) : (
              <p className="text-slate-500 italic">This article is currently draft-only.</p>
            )}
          </article>

          {article.author && (
            article.authorSlug ? (
              <a href={`/our-team#${article.authorSlug}`} className="block">
                <AuthorBox />
              </a>
            ) : (
              <AuthorBox />
            )
          )}
        </div>
      </main>

    </div>
  );
}