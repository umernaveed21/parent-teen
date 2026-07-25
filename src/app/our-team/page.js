import React from 'react';
import { getAllAuthors } from '../../lib/contentful';

export default async function OurTeamPage() {
  const authors = await getAllAuthors();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white border-b border-slate-200 py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[#009999]">
            The People Behind ParentAndTeen
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight text-[#003366]">
            Meet Our Team
          </h1>
          <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            Counselors, researchers, and writers dedicated to helping families communicate better.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        {authors.length > 0 ? (
          authors.map((author) => (
            <div key={author.slug} id={author.slug} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start scroll-mt-24">
              {author.photoUrl ? (
                <img src={author.photoUrl} alt={author.name} className="w-24 h-24 rounded-full object-cover border border-slate-100 shrink-0" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#009999] text-white flex items-center justify-center font-black text-3xl shrink-0">
                  {author.name.charAt(0)}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-[#003366]">{author.name}</h2>
                <p className="text-sm font-semibold text-[#009999] mt-1">{author.role}</p>
                <p className="text-slate-600 text-base leading-relaxed mt-3">{author.bio}</p>

                {author.linkedinUrl && (
                  <a href={author.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-slate-600 hover:text-[#0A66C2] transition group">
                    <span className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-base group-hover:scale-105 transition">
                      <i className="bi bi-linkedin"></i>
                    </span>
                    <span>View LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-400 text-sm py-12">
            Our team profiles are being set up. Check back soon!
          </div>
        )}
      </main>
    </div>
  );
}