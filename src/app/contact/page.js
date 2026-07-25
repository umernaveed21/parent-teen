'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO BANNER */}
      <section className="bg-white border-b border-slate-200 py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-full border border-slate-200" style={{ color: '#009999' }}>
            Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold mt-4 tracking-tight text-[#003366]">
            We're Here to <span style={{ color: '#009999' }}>Listen.</span>
          </h1>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed max-w-xl mx-auto">
            Have a question, feedback, or a personal story you want to share? Drop us a message below. We read every single note that comes in.
          </p>
        </div>
      </section>

      {/* TWO-COLUMN CONTACT SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Column 1 & 2: The Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-[#003366] mb-6">Send Us a Message</h2>

            {status === 'success' ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-[#003366]">Message Sent!</h3>
                <p className="text-slate-500 text-sm mt-2">
                  Thanks for reaching out. We'll get back to you as soon as we can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009999] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009999] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009999] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#009999] focus:bg-white transition resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                    Something went wrong. Please try again, or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full md:w-auto bg-[#009999] hover:bg-[#008080] text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Contact Info sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#003366] mb-4">Direct Contact</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 text-[#009999]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700">General Inquiries</h4>
                    <a href="mailto:info@parentandteen.com.pk" className="text-[#009999] hover:underline">info@parentandteen.com.pk</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <div className="mt-1 text-[#009999]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700">Editorial & Submissions</h4>
                    <a href="mailto:submit@parentandteen.com.pk" className="text-[#009999] hover:underline">submit@parentandteen.com.pk</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#003366] text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2">Our Promise</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you are a parent looking for immediate guidance or a teenager looking for a safe platform to express yourself, we are fully committed to providing a secure, non-judgmental environment. Your privacy is paramount to us.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}