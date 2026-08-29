'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ShareButton({ title, url }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the native share sheet, do nothing
      }
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access failed, silently ignore
    }
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={handleShareClick}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-[#009999] transition px-3 py-1.5 border border-slate-200 rounded-full hover:border-teal-200 hover:bg-teal-50"
      >
        <i className="bi bi-share-fill"></i>
        Share
      </button>

      {menuOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-20">
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition"
          >
            <i className="bi bi-whatsapp text-base"></i>
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition"
          >
            <i className="bi bi-facebook text-base"></i>
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition"
          >
            <i className="bi bi-twitter-x text-base"></i>
            X (Twitter)
          </a>
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#009999] transition text-left"
          >
            <i className="bi bi-link-45deg text-base"></i>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      )}
    </div>
  );
}