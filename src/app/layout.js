'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { GoogleAnalytics } from '@next/third-parties/google';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const toggleMobileDropdown = (category) => {
    if (activeMobileDropdown === category) {
      setActiveMobileDropdown(null);
    } else {
      setActiveMobileDropdown(category);
    }
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          />
          <meta name="google-site-verification" content="QLNoJX5bqOFMheMzBHHY21zaaAvYonNVzLCwG9dnVlo" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Parent and Teen South Asia',
                url: 'https://www.parentandteen.com.pk',
                logo: 'https://www.parentandteen.com.pk/favicon.ico',
                sameAs: [
                  'https://www.facebook.com/share/1Heq4px7QW/',
                  'https://www.instagram.com/parentandteen_?igsh=MWY0aWdhcTY0YTk5eA==',
                  'https://www.linkedin.com/company/parentandteen/',
                ],
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Parent and Teen South Asia',
                url: 'https://www.parentandteen.com.pk',
              }),
            }}
          />
        </head>
        <body className={`${inter.className} bg-slate-50 text-slate-800 min-h-screen flex flex-col justify-between`}>

          {/* ================= HEADER ================= */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

              {/* Brand Logo */}
              <div className="flex items-center space-x-1 flex-shrink-0">
                <a href="/" className="text-xl font-black tracking-tight" style={{ color: '#003366' }}>
                  Parent<span style={{ color: '#009999' }}>AndTeen</span>
                  <span className="text-xs font-normal text-slate-400">.com.pk</span>
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-5 font-semibold text-xs uppercase tracking-wider text-slate-600">

                {/* Home - No Dropdown */}
                <div className="py-5">
                  <a href="/" className="hover:text-[#009999] transition">Home</a>
                </div>

                {/* Childhood Realities Dropdown */}
                <div className="relative group py-5 cursor-pointer">
                  <span className="hover:text-[#009999] transition whitespace-nowrap">Childhood Realities</span>
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block normal-case tracking-normal text-sm font-medium">
                    <a href="/categories/education-schools" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Education & Schools</a>
                    <a href="/categories/child-rights-protection" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Child Rights and Protection</a>
                    <a href="/categories/poverty-inequality" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Poverty & Inequality</a>
                  </div>
                </div>

                {/* Teens Dropdown */}
                <div className="relative group py-5 cursor-pointer">
                  <span className="hover:text-[#009999] transition">Teens</span>
                  <div className="absolute top-full left-0 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block normal-case tracking-normal text-sm font-medium">
                    <a href="/categories/teen-behavior" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Teen Behavior</a>
                    <a href="/categories/study-stress" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Study Stress</a>
                    <a href="/categories/social-media-mental-health" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Social Media & Mental Health</a>
                  </div>
                </div>

                {/* Parenting Dropdown */}
                <div className="relative group py-5 cursor-pointer">
                  <span className="hover:text-[#009999] transition">Parenting</span>
                  <div className="absolute top-full left-0 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block normal-case tracking-normal text-sm font-medium">
                    <a href="/categories/positive-parenting" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Positive Parenting</a>
                    <a href="/categories/discipline-boundaries" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Discipline & Boundaries</a>
                    <a href="/categories/parenting-realities" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Parenting Realities</a>
                  </div>
                </div>

                {/* Family Dropdown */}
                <div className="relative group py-5 cursor-pointer">
                  <span className="hover:text-[#009999] transition">Family</span>
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block normal-case tracking-normal text-sm font-medium">
                    <a href="/categories/family-dynamics" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Family Dynamics</a>
                    <a href="/categories/relationships-communication" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Relationships and Communication</a>
                    <a href="/categories/family-culture-social-influences" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Family Culture & Social Influences</a>
                  </div>
                </div>

                {/* Health Dropdown */}
                <div className="relative group py-5 cursor-pointer">
                  <span className="hover:text-[#009999] transition">Health</span>
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block normal-case tracking-normal text-sm font-medium">
                    <a href="/categories/mental-emotional-wellbeing" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Mental & Emotional Well-being</a>
                    <a href="/categories/physical-health-nutrition" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Physical Health & Nutrition</a>
                    <a href="/categories/healthy-living-prevention" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Healthy Living & Prevention</a>
                  </div>
                </div>

                {/* Teen Perspectives Dropdown */}
                <div className="relative group py-5 cursor-pointer">
                  <span className="hover:text-[#009999] transition whitespace-nowrap">Teen Perspectives</span>
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block normal-case tracking-normal text-sm font-medium">
                    <a href="/categories/wish-parents-knew" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">What Teens Wish Parents Knew</a>
                    <a href="/categories/real-teen-stories" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Real Teen Stories</a>
                    <a href="/categories/when-i-was-a-teen" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">When I Was a Teen</a>
                  </div>
                </div>

                {/* About Dropdown */}
                <div className="relative group py-5 cursor-pointer">
                  <span className="hover:text-[#009999] transition">About</span>
                  <div className="absolute top-full right-0 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block normal-case tracking-normal text-sm font-medium">
                    <a href="/about" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">About Us</a>
                    <a href="/our-team" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition">Our Team</a>
                    <a href="/about#write-for-us" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition font-bold text-[#009999]">Write for Us</a>
                  </div>
                </div>
              </nav>

              {/* Contact Button */}
              <div className="hidden lg:block flex-shrink-0">
                <a href="/contact" className="bg-[#009999] hover:bg-[#008080] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-300 shadow-sm inline-block">
                  Contact Us
                </a>
              </div>

              {/* Mobile Button */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-[#009999] p-2">
                  {isMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Content */}
            {isMenuOpen && (
              <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 font-semibold text-sm uppercase tracking-wider text-slate-600 shadow-inner">
                <a href="/" className="block py-2.5 border-b border-slate-50 hover:text-[#009999]">Home</a>

                {/* Childhood Realities Accordion */}
                <div>
                  <button onClick={() => toggleMobileDropdown('childhood')} className="w-full text-left py-2.5 border-b border-slate-50 hover:text-[#009999] flex justify-between items-center uppercase font-semibold text-sm tracking-wider text-slate-600">
                    <span>Childhood Realities</span>
                  </button>
                  {activeMobileDropdown === 'childhood' && (
                    <div className="pl-4 py-2 space-y-2 normal-case tracking-normal text-slate-500 text-sm font-medium bg-slate-50 rounded-lg mt-1">
                      <a href="/categories/education-schools" className="block py-1">Education & Schools</a>
                      <a href="/categories/child-rights-protection" className="block py-1">Child Rights and Protection</a>
                      <a href="/categories/poverty-inequality" className="block py-1">Poverty & Inequality</a>
                    </div>
                  )}
                </div>

                {/* Teens Accordion */}
                <div>
                  <button onClick={() => toggleMobileDropdown('teens')} className="w-full text-left py-2.5 border-b border-slate-50 hover:text-[#009999] flex justify-between items-center uppercase font-semibold text-sm tracking-wider text-slate-600">
                    <span>Teens</span>
                  </button>
                  {activeMobileDropdown === 'teens' && (
                    <div className="pl-4 py-2 space-y-2 normal-case tracking-normal text-slate-500 text-sm font-medium bg-slate-50 rounded-lg mt-1">
                      <a href="/categories/teen-behavior" className="block py-1">Teen Behavior</a>
                      <a href="/categories/study-stress" className="block py-1">Study Stress</a>
                      <a href="/categories/social-media-mental-health" className="block py-1">Social Media & Mental Health</a>
                    </div>
                  )}
                </div>

                {/* Parenting Accordion */}
                <div>
                  <button onClick={() => toggleMobileDropdown('parenting')} className="w-full text-left py-2.5 border-b border-slate-50 hover:text-[#009999] flex justify-between items-center uppercase font-semibold text-sm tracking-wider text-slate-600">
                    <span>Parenting</span>
                  </button>
                  {activeMobileDropdown === 'parenting' && (
                    <div className="pl-4 py-2 space-y-2 normal-case tracking-normal text-slate-500 text-sm font-medium bg-slate-50 rounded-lg mt-1">
                      <a href="/categories/positive-parenting" className="block py-1">Positive Parenting</a>
                      <a href="/categories/discipline-boundaries" className="block py-1">Discipline & Boundaries</a>
                      <a href="/categories/parenting-realities" className="block py-1">Parenting Realities</a>
                    </div>
                  )}
                </div>

                {/* Family Accordion */}
                <div>
                  <button onClick={() => toggleMobileDropdown('family')} className="w-full text-left py-2.5 border-b border-slate-50 hover:text-[#009999] flex justify-between items-center uppercase font-semibold text-sm tracking-wider text-slate-600">
                    <span>Family</span>
                  </button>
                  {activeMobileDropdown === 'family' && (
                    <div className="pl-4 py-2 space-y-2 normal-case tracking-normal text-slate-500 text-sm font-medium bg-slate-50 rounded-lg mt-1">
                      <a href="/categories/family-dynamics" className="block py-1">Family Dynamics</a>
                      <a href="/categories/relationships-communication" className="block py-1">Relationships and Communication</a>
                      <a href="/categories/family-culture-social-influences" className="block py-1">Family Culture & Social Influences</a>
                    </div>
                  )}
                </div>

                {/* Health Accordion */}
                <div>
                  <button onClick={() => toggleMobileDropdown('health')} className="w-full text-left py-2.5 border-b border-slate-50 hover:text-[#009999] flex justify-between items-center uppercase font-semibold text-sm tracking-wider text-slate-600">
                    <span>Health</span>
                  </button>
                  {activeMobileDropdown === 'health' && (
                    <div className="pl-4 py-2 space-y-2 normal-case tracking-normal text-slate-500 text-sm font-medium bg-slate-50 rounded-lg mt-1">
                      <a href="/categories/mental-emotional-wellbeing" className="block py-1">Mental & Emotional Well-being</a>
                      <a href="/categories/physical-health-nutrition" className="block py-1">Physical Health & Nutrition</a>
                      <a href="/categories/healthy-living-prevention" className="block py-1">Healthy Living & Prevention</a>
                    </div>
                  )}
                </div>

                {/* Teen Perspectives Accordion */}
                <div>
                  <button onClick={() => toggleMobileDropdown('perspectives')} className="w-full text-left py-2.5 border-b border-slate-50 hover:text-[#009999] flex justify-between items-center uppercase font-semibold text-sm tracking-wider text-slate-600">
                    <span>Teen Perspectives</span>
                  </button>
                  {activeMobileDropdown === 'perspectives' && (
                    <div className="pl-4 py-2 space-y-2 normal-case tracking-normal text-slate-500 text-sm font-medium bg-slate-50 rounded-lg mt-1">
                      <a href="/categories/wish-parents-knew" className="block py-1">What Teens Wish Parents Knew</a>
                      <a href="/categories/real-teen-stories" className="block py-1">Real Teen Stories</a>
                      <a href="/categories/when-i-was-a-teen" className="block py-1">When I Was a Teen</a>
                    </div>
                  )}
                </div>

                {/* About Accordion */}
                <div>
                  <button onClick={() => toggleMobileDropdown('about')} className="w-full text-left py-2.5 border-b border-slate-50 hover:text-[#009999] flex justify-between items-center uppercase font-semibold text-sm tracking-wider text-slate-600">
                    <span>About</span>
                  </button>
                  {activeMobileDropdown === 'about' && (
                    <div className="pl-4 py-2 space-y-2 normal-case tracking-normal text-slate-500 text-sm font-medium bg-slate-50 rounded-lg mt-1">
                      <a href="/about" className="block py-1 hover:text-[#009999]">About Us</a>
                      <a href="/our-team" className="block py-1 hover:text-[#009999]">Our Team</a>
                      <a href="/about#write-for-us" className="block py-1 text-[#009999] font-bold">Write for Us</a>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <a href="/contact" className="block text-center bg-[#009999] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg shadow-sm">
                    Contact Us
                  </a>
                </div>
              </div>
            )}
          </header>

          {/* Dynamic Content Slot */}
          <div className="flex-grow">
            {children}
          </div>

          {/* ================= FOOTER ================= */}
          <footer className="bg-white border-t border-slate-200 mt-16">
            <div className="bg-slate-50 border-b border-slate-200 py-10">
              <div className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-xl font-bold text-[#003366]">Have a Story or Expertise to Share?</h3>
                <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
                  We are always looking for fresh, inspiring perspectives from professional counselors, experienced parents, and teenagers themselves.
                </p>
                <div className="mt-4">
                  <a href="/about#write-for-us" className="inline-block text-sm font-bold text-[#009999] hover:text-[#008080] hover:underline transition">
                    Read Our Submission Guidelines & Write For Us &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="text-center md:text-left">
                &copy; 2026 ParentAndTeen.com.pk. All rights reserved.
              </div>

              <div className="flex items-center justify-center gap-5 text-base">
                <a href="https://www.facebook.com/share/1Heq4px7QW/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#009999] transition">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/parentandteen_?igsh=MWY0aWdhcTY0YTk5eA==" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#009999] transition">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/parentandteen/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#009999] transition">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>

              <div className="flex justify-center md:justify-end space-x-6">
                <a href="/privacy-policy" className="hover:text-[#009999]">Privacy Policy</a>
                <a href="/terms" className="hover:text-[#009999]">Terms of Service</a>
                <a href="/editorial" className="hover:text-[#009999]">Editorial Staff</a>
              </div>
            </div>
          </footer>

        </body>
        <GoogleAnalytics gaId="G-Z1C69SHN2C" />
      </html>
    </ClerkProvider>
  );
}