// src/app/page.js
import React from 'react';
import { getAllPosts } from '../lib/contentful';

export const revalidate = 60;

export default async function Home() {
  const blogPosts = await getAllPosts();

  return (
    <div>
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <span className="bg-slate-100 text-[#003366] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
            Every Teen Deserves to Be Heard
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight text-[#003366]">
            Parenting, Child Rights, <br />
            <span style={{ color: '#009999' }}>And Childhood in South Asia.</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
            A safe space for parents and teenagers to find common ground, share perspectives, and navigate the journey of growing up together.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#003366]">Latest Articles</h2>
          <a href="/archive" className="text-sm font-semibold text-[#009999] hover:text-[#008080] hover:underline transition">
            View all &rarr;
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const formattedDate = post.date
              ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : '';

            return (
              <a href={`/blog/${post.slug}`} key={post.slug} className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer text-left block">
                <div>
                  {post.coverImageUrl && (
                    <img src={post.coverImageUrl} alt={post.title} className="w-full h-44 object-cover rounded-xl mb-4" />
                  )}
                  <span className="text-xs font-bold text-[#009999] tracking-wide uppercase bg-teal-50/60 border border-teal-100/80 px-2.5 py-1 rounded-md inline-block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#003366] mt-4 leading-snug group-hover:text-[#009999] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mt-2 text-sm line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                  <span>{formattedDate}</span>
                  <span className="flex items-center space-x-1">
                    <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}