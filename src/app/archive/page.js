// src/app/archive/page.js
import React from 'react';
import { getAllPosts } from '../../lib/contentful';

export default async function ArchivePage() {
  const allPosts = await getAllPosts();

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <nav className="flex items-center space-x-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
          <a href="/" className="hover:text-[#009999] transition">Home</a>
          <span>&gt;</span>
          <span className="text-[#009999]">All Articles</span>
        </nav>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-[#003366] tracking-tight">
            The Master Library
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Browse through our entire history of research-backed insights, teen perspectives, and parenting guides organized by timeline.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 grid lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
          {allPosts.map((post) => {
            const formattedDate = post.date
              ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : '';

            return (
              <a href={`/blog/${post.slug}`} key={post.slug} className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer text-left block gap-4">
                <div className="flex items-start md:items-center gap-4 max-w-2xl">
                  {post.coverImageUrl && (
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="hidden md:block w-28 h-28 object-cover rounded-xl border border-slate-100 shrink-0"
                    />
                  )}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#009999] tracking-wide uppercase">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#003366] group-hover:text-[#009999] transition-colors duration-300 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium shrink-0 md:text-right border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto border-slate-100 flex md:flex-col justify-between md:justify-center gap-1">
                  <span className="text-slate-700 font-semibold">{formattedDate}</span>
                  <span>{post.readTime}</span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003366] mb-4">
            Filter by Section
          </h3>
          <div className="space-y-2 flex flex-col">
            <a href="/categories/teen-behavior" className="text-sm font-medium text-slate-600 hover:text-[#009999] p-2 hover:bg-slate-50 rounded-lg transition flex justify-between">
              <span>Teen Behavior</span>
            </a>
            <a href="/categories/social-media-mental-health" className="text-sm font-medium text-slate-600 hover:text-[#009999] p-2 hover:bg-slate-50 rounded-lg transition flex justify-between">
              <span>Media & Mental Health</span>
            </a>
            <a href="/categories/study-stress" className="text-sm font-medium text-slate-600 hover:text-[#009999] p-2 hover:bg-slate-50 rounded-lg transition flex justify-between">
              <span>Study Stress</span>
            </a>
            <a href="/categories/positive-parenting" className="text-sm font-medium text-slate-600 hover:text-[#009999] p-2 hover:bg-slate-50 rounded-lg transition flex justify-between">
              <span>Positive Parenting</span>
            </a>
            <a href="/categories/wish-parents-knew" className="text-sm font-medium text-slate-600 hover:text-[#009999] p-2 hover:bg-slate-50 rounded-lg transition flex justify-between">
              <span>Teen Perspectives</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}