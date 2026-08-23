import React from 'react';

export default function EditorialPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[#009999]">
            Our Standards
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight text-[#003366]">
            Editorial Staff & Standards
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <p className="text-slate-600 leading-relaxed text-base">
            At ParentAndTeen.com.pk, we write for South Asian families navigating parenting, childhood, and child rights in a fast-changing world. Our editorial approach is guided by a few core commitments:
          </p>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Culturally Grounded, Not Borrowed</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Every piece is written with South Asian family structures, extended households, and cultural realities in mind.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Respect Over Judgment</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We write for parents, not at them. Our goal is to inform and support — never to shame or talk down to our readers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Evidence-Informed</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Where we reference research, child development science, or expert opinion, we cite our sources. Personal essays and translated pieces are clearly presented as such.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Editorial Independence</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Our writers and contributors bring diverse perspectives, but every article goes through review before publishing to ensure it aligns with our standards of accuracy, dignity, and care — particularly when writing about children or vulnerable subjects.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mt-4">
              Views expressed by individual writers and contributors are their own and do not necessarily reflect the views or position of ParentAndTeen.com.pk as an organization.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Corrections</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              If you spot an error in one of our articles, please{' '}
              <a href="/contact" className="text-[#009999] hover:underline font-semibold">
                contact us
              </a>
              . We take accuracy seriously and will review and correct promptly.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-slate-600 text-base">
              Want to write for us, or learn more about the people behind ParentAndTeen?{' '}
              <a href="/our-team" className="text-[#009999] hover:underline font-semibold">
                Meet our team &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}