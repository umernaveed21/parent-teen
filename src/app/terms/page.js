import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[#009999]">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight text-[#003366]">
            Terms of Service
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <p className="text-slate-600 leading-relaxed text-base">
            Welcome to ParentAndTeen.com.pk. By accessing or using this website, you agree to these terms.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Content</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Articles, illustrations, and resources on this site are for informational and educational purposes only. They do not replace professional medical, psychological, or legal advice. Always consult a qualified professional for concerns about your child's health or development.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              All content on this site — text, images, and design — is owned by ParentAndTeen.com.pk or used with permission from contributors, unless otherwise credited. You may share links to our articles freely. Reproducing full articles elsewhere requires our written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">User Accounts</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              If you create an account (for example, as a contributing writer), you're responsible for keeping your login credentials secure and for any activity under your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">User Conduct</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              When commenting or interacting on this site, you agree not to post content that is abusive, defamatory, or harmful to children or families.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              ParentAndTeen.com.pk is provided "as is." We do our best to ensure accuracy but make no guarantees about completeness or fitness for a particular purpose. We are not liable for decisions made based on content published here.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Changes</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We may update these terms from time to time. Continued use of the site means you accept the current version.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Contact</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Questions about these terms? Reach us at{' '}
              <a href="mailto:info@parentandteen.com.pk" className="text-[#009999] hover:underline font-semibold">
                info@parentandteen.com.pk
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}