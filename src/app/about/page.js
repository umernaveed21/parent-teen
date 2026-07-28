import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      <section className="bg-white border-b border-slate-200 py-16 md:py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200" style={{ color: '#009999' }}>
            Our Story & Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight text-[#003366]">
            Empowering Families, <br />
            <span style={{ color: '#009999' }}>Amplifying Youth Voices.</span>
          </h1>
          <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            Welcome to ParentAndTeen.com.pk. We are dedicated to building a bridge of empathy, communication, and mutual respect between generations.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">

          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-3">Who We Are</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              At ParentAndTeen.com.pk, we are a team of people who care deeply about the emotional well-being of children, teenagers, and families.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-3">Where We Come From</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Growing up in South Asia, we have seen how a child's life is shaped not only by opportunity and education, but also by economic hardship, family pressures, social expectations, and the emotional environment in which they are raised. These realities can affect a child's confidence, learning, relationships, and sense of self.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-3">What We Believe</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We believe that many children and teenagers who struggle in school, at home, or in life are often carrying unseen emotional burdens. Behind poor grades, anger, withdrawal, anxiety, or silence, there is frequently a story of fear, criticism, neglect, humiliation, or emotional pain that has not been understood. <strong>Before we judge a child, we must first ask what happened to that child.</strong>
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-bold text-[#003366] mb-3">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Our mission is to encourage parents, caregivers, educators, and communities to build homes where children feel safe, respected, and heard. We do not believe in blaming parents; we believe that awareness, compassion, and understanding can help break cycles that have been passed down for generations.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mt-4">
              Through thoughtful articles, research, and real-life experiences, we hope to inspire healthier relationships between parents and teenagers and to create conversations that lead to lasting change.
            </p>
          </div>

          <div className="text-center pt-4">
            <p className="text-xl font-bold text-[#003366]">
              Because Every Teen Deserves to Be Heard.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div id="write-for-us" className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded bg-[#009999]">
              Contributor Guidelines
            </span>
            <h2 className="text-2xl font-bold text-[#003366] mt-3 mb-3">Write For Us</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-4">
              Are you a child psychologist, a seasoned parent with wisdom to share, or a teenager who wants to voice an honest perspective? We want to hear from you! We accept high-quality guest articles that align with our mission of fostering healthy family connections.
            </p>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#003366] uppercase tracking-wider">Submission Requirements:</h4>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Articles must be original, empathetic, and actionable.</li>
                <li>No word limit — express yourself however feels right for your story.</li>
                <li>We highly encourage submissions written directly by teenagers for our <em>Teen Perspectives</em> section.</li>
              </ul>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-4">
              Ready to pitch? Send your topic ideas or complete drafts to{' '}
              <a href="mailto:submit@parentandteen.com.pk" className="text-[#009999] hover:underline font-semibold">
                submit@parentandteen.com.pk
              </a>
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}