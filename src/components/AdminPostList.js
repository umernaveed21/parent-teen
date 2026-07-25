'use client';

import React, { useState } from 'react';

export default function AdminPostList({ posts }) {
  const [loadingId, setLoadingId] = useState(null);
  const [statusOverrides, setStatusOverrides] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const handlePublish = async (entryId) => {
    setLoadingId(entryId);
    setErrorMsg('');

    try {
      const res = await fetch('/api/posts/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatusOverrides((prev) => ({ ...prev, [entryId]: true }));
      } else {
        setErrorMsg(`Error: ${data.error}`);
      }
    } catch (err) {
      setErrorMsg(`Error: ${err.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  const handleUnpublish = async (entryId) => {
    setLoadingId(entryId);
    setErrorMsg('');

    try {
      const res = await fetch('/api/posts/unpublish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatusOverrides((prev) => ({ ...prev, [entryId]: false }));
      } else {
        setErrorMsg(`Error: ${data.error}`);
      }
    } catch (err) {
      setErrorMsg(`Error: ${err.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-sm">
        No articles submitted yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errorMsg && (
        <div className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {errorMsg}
        </div>
      )}

      {posts.map((post) => {
        const isLive = statusOverrides[post.id] !== undefined ? statusOverrides[post.id] : post.isPublished;
        const isLoading = loadingId === post.id;

        return (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-md ${
                isLive ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
              }`}>
                {isLive ? 'Published' : 'Draft — Pending Review'}
              </span>
              <h3 className="text-lg font-bold text-[#003366] mt-2">{post.title}</h3>
              <p className="text-sm text-slate-500 mt-1">
                By {post.author} &middot; {post.category}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`/dashboard/admin/preview/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#009999] hover:text-[#008080] font-bold text-xs uppercase tracking-wider px-4 py-2.5 border border-teal-200 rounded-xl transition hover:bg-teal-50"
              >
                Preview
              </a>

              {isLive ? (
                <button
                  onClick={() => handleUnpublish(post.id)}
                  disabled={isLoading}
                  className="bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {isLoading ? 'Unpublishing...' : 'Unpublish'}
                </button>
              ) : (
                <button
                  onClick={() => handlePublish(post.id)}
                  disabled={isLoading}
                  className="bg-[#009999] hover:bg-[#008080] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {isLoading ? 'Publishing...' : 'Publish'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}