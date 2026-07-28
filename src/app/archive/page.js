// src/app/archive/page.js
import React from 'react';
import { getAllPosts } from '../../lib/contentful';

export const revalidate = 60;

const FILTER_GROUPS = [
  {
    label: 'Childhood Realities',
    links: [
      { slug: 'education-schools', name: 'Education & Schools' },
      { slug: 'child-rights-protection', name: 'Child Rights and Protection' },
      { slug: 'poverty-inequality', name: 'Poverty & Inequality' },
    ],
  },
  {
    label: 'Teens',
    links: [
      { slug: 'teen-behavior', name: 'Teen Behavior' },
      { slug: 'study-stress', name: 'Study Stress' },
      { slug: 'social-media-mental-health', name: 'Social Media & Mental Health' },
    ],
  },
  {
    label: 'Parenting',
    links: [
      { slug: 'positive-parenting', name: 'Positive Parenting' },
      { slug: 'discipline-boundaries', name: 'Discipline & Boundaries' },
      { slug: 'parent-teen-communication', name: 'Parent-Teen Communication' },
    ],
  },
  {
    label: 'Family',
    links: [
      { slug: 'family-dynamics', name: 'Family Dynamics' },
      { slug: 'relationships-communication', name: 'Relationships and Communication' },
      { slug: 'family-culture-social-influences', name: 'Family Culture & Social Influences' },
    ],
  },
  {
    label: 'Health',
    links: [
      { slug: 'mental-emotional-wellbeing', name: 'Mental & Emotional Well-being' },
      { slug: 'physical-health-nutrition', name: 'Physical Health & Nutrition' },
      { slug: 'healthy-living-prevention', name: 'Healthy Living & Prevention' },
    ],
  },
  {
    label: 'Teen Perspectives',
    links: [
      { slug: 'wish-parents-knew', name: 'What Teens Wish Parents Knew' },
      { slug: 'real-teen-stories', name: 'Real Teen Stories' },
      { slug: 'when-i-was-a-teen', name: 'When I Was a Teen' },
    ],
  },
];

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

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-6 space-y-5 max-h-[calc(100vh-3rem)] overflow-y-auto">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#003366]">
            Filter by Section
          </h3>
          {FILTER_GROUPS.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">
                {group.label}
              </h4>
              <div className="flex flex-col">
                {group.links.map((link) => (
                  <a
                    key={link.slug}
                    href={`/categories/${link.slug}`}
                    className="text-sm font-medium text-slate-600 hover:text-[#009999] p-2 hover:bg-slate-50 rounded-lg transition"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}