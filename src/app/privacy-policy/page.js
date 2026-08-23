import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[#009999]">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight text-[#003366]">
            Privacy Policy
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <p className="text-slate-600 leading-relaxed text-base">
            ParentAndTeen.com.pk respects your privacy. This policy explains what information we collect and how we use it.
          </p>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Information We Collect</h2>
            <ul className="list-disc pl-5 text-slate-600 leading-relaxed text-base space-y-2">
              <li><strong>Contact form submissions:</strong> name, email, and message content when you reach out to us.</li>
              <li><strong>Account information:</strong> if you register as a writer or contributor, we collect your name, email, and login details.</li>
              <li><strong>Usage data:</strong> basic analytics (pages visited, general location, device type) to understand how readers use our site.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-5 text-slate-600 leading-relaxed text-base space-y-2">
              <li>To respond to your messages and inquiries</li>
              <li>To manage writer/contributor accounts</li>
              <li>To improve our content and site experience</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mt-4">
              We do not sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Cookies</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Our site may use cookies for basic functionality and analytics. You can disable cookies in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Children's Privacy</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We do not knowingly collect personal information directly from children.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Data Security</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We take reasonable steps to protect your information but cannot guarantee absolute security for data transmitted online.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Your Rights</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              You can request access to, correction of, or deletion of your personal data by contacting us at{' '}
              <a href="mailto:info@parentandteen.com.pk" className="text-[#009999] hover:underline font-semibold">
                info@parentandteen.com.pk
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We may update this policy periodically. Significant changes will be noted on this page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-3">Contact</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Questions about your privacy? Reach us at{' '}
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