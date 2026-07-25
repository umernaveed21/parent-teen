import React from 'react';

export default function EditorialPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm text-center">
        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[#009999]">
          Our Standards
        </span>
        <h1 className="text-3xl font-extrabold mt-4 tracking-tight text-[#003366]">
          Editorial Staff & Standards
        </h1>
        <p className="text-slate-500 mt-4 leading-relaxed">
          Details on our editorial process and the team behind our content are coming soon. In the meantime, meet our contributors on the Our Team page.
        </p>
        <a href="/our-team" className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-white bg-[#009999] hover:bg-[#008080] px-6 py-3 rounded-xl transition">
          Meet Our Team
        </a>
      </div>
    </div>
  );
}