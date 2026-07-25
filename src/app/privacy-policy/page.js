import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm text-center">
        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[#009999]">
          Legal
        </span>
        <h1 className="text-3xl font-extrabold mt-4 tracking-tight text-[#003366]">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mt-4 leading-relaxed">
          Our full privacy policy is being finalized and will be published here shortly. If you have any questions about how we handle your information in the meantime, reach out to us directly.
        </p>
        <a href="/contact" className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-white bg-[#009999] hover:bg-[#008080] px-6 py-3 rounded-xl transition">
          Contact Us
        </a>
      </div>
    </div>
  );
}