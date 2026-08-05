'use client';

import React, { useState, useEffect } from 'react';
import PostEditor from '../../components/PostEditor';
import { useUser } from '@clerk/nextjs';

const CATEGORY_OPTIONS = [
  { subCategory: 'education-schools', category: 'Education & Schools', parentCat: 'Childhood Realities', subcatName: 'Education & Schools', subcatLink: 'education-schools' },
  { subCategory: 'child-rights-protection', category: 'Child Rights and Protection', parentCat: 'Childhood Realities', subcatName: 'Child Rights and Protection', subcatLink: 'child-rights-protection' },
  { subCategory: 'poverty-inequality', category: 'Poverty & Inequality', parentCat: 'Childhood Realities', subcatName: 'Poverty & Inequality', subcatLink: 'poverty-inequality' },
  { subCategory: 'teen-behavior', category: 'Teen Behavior', parentCat: 'Teens', subcatName: 'Teen Behavior', subcatLink: 'teen-behavior' },
  { subCategory: 'study-stress', category: 'Study Stress', parentCat: 'Teens', subcatName: 'Study Stress', subcatLink: 'study-stress' },
  { subCategory: 'social-media-mental-health', category: 'Social Media & Mental Health', parentCat: 'Teens', subcatName: 'Social Media & Mental Health', subcatLink: 'social-media-mental-health' },
  { subCategory: 'positive-parenting', category: 'Positive Parenting', parentCat: 'Parenting', subcatName: 'Positive Parenting', subcatLink: 'positive-parenting' },
  { subCategory: 'discipline-boundaries', category: 'Discipline & Boundaries', parentCat: 'Parenting', subcatName: 'Discipline & Boundaries', subcatLink: 'discipline-boundaries' },
  { subCategory: 'parent-teen-communication', category: 'Parent-Teen Communication', parentCat: 'Parenting', subcatName: 'Parent-Teen Communication', subcatLink: 'parent-teen-communication' },
  { subCategory: 'family-dynamics', category: 'Family Dynamics', parentCat: 'Family', subcatName: 'Family Dynamics', subcatLink: 'family-dynamics' },
  { subCategory: 'relationships-communication', category: 'Relationships and Communication', parentCat: 'Family', subcatName: 'Relationships and Communication', subcatLink: 'relationships-communication' },
  { subCategory: 'family-culture-social-influences', category: 'Family Culture & Social Influences', parentCat: 'Family', subcatName: 'Family Culture & Social Influences', subcatLink: 'family-culture-social-influences' },
  { subCategory: 'mental-emotional-wellbeing', category: 'Mental & Emotional Well-being', parentCat: 'Health', subcatName: 'Mental & Emotional Well-being', subcatLink: 'mental-emotional-wellbeing' },
  { subCategory: 'physical-health-nutrition', category: 'Physical Health & Nutrition', parentCat: 'Health', subcatName: 'Physical Health & Nutrition', subcatLink: 'physical-health-nutrition' },
  { subCategory: 'healthy-living-prevention', category: 'Healthy Living & Prevention', parentCat: 'Health', subcatName: 'Healthy Living & Prevention', subcatLink: 'healthy-living-prevention' },
  { subCategory: 'wish-parents-knew', category: 'Teen Perspectives', parentCat: 'Teen Perspectives', subcatName: 'What Teens Wish Parents Knew', subcatLink: 'wish-parents-knew' },
  { subCategory: 'real-teen-stories', category: 'Teen Perspectives', parentCat: 'Teen Perspectives', subcatName: 'Real Teen Stories', subcatLink: 'real-teen-stories' },
  { subCategory: 'when-i-was-a-teen', category: 'Teen Perspectives', parentCat: 'Teen Perspectives', subcatName: 'When I Was a Teen', subcatLink: 'when-i-was-a-teen' },
];

export default function DashboardPage() {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [guestAuthorBio, setGuestAuthorBio] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0].subCategory);
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState('');

  useEffect(() => {
    fetch('/api/authors')
      .then((res) => res.json())
      .then((data) => setAuthors(data.authors || []))
      .catch(() => setAuthors([]));
  }, []);

  const generateSlug = (text) =>
    text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  const calculateReadTime = (tiptapJSON) => {
    const extractText = (node) => {
      let text = '';
      if (node.type === 'text') text += node.text || '';
      if (node.content) node.content.forEach((child) => { text += ' ' + extractText(child); });
      return text;
    };

    const fullText = extractText(tiptapJSON);
    const wordCount = fullText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage({
        data: reader.result,
        fileName: file.name,
        contentType: file.type,
      });
      setCoverImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!title || !content) {
      setMessage('Please add a title and some content before saving.');
      return;
    }

    setSaving(true);
    setMessage('');

    const categoryData = CATEGORY_OPTIONS.find((c) => c.subCategory === selectedCategory);
    const selectedAuthor = authors.find((a) => a.id === selectedAuthorId);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: generateSlug(title),
          description,
          author: selectedAuthor ? selectedAuthor.name : (authorName || user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Unknown'),
          authorRole: selectedAuthor ? selectedAuthor.role : authorRole,
          guestAuthorBio: selectedAuthor ? '' : guestAuthorBio,
          authorReferenceId: selectedAuthorId || null,
          readTime: calculateReadTime(content),
          content,
          coverImage,
          ...categoryData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Draft saved successfully! Your team head will review it before publishing.');
        setTitle('');
        setDescription('');
        setAuthorName('');
        setAuthorRole('');
        setGuestAuthorBio('');
        setContent(null);
        setCoverImage(null);
        setCoverImagePreview(null);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#003366]">Write a New Article</h1>
          <p className="text-slate-500 text-sm mt-1">
            Logged in as {user?.fullName || user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#003366] mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009999]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#003366] mb-2">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="1-2 sentence preview shown on homepage cards"
              rows={2}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009999]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#003366] mb-2">Your Author Profile</label>
            <select
              value={selectedAuthorId}
              onChange={(e) => setSelectedAuthorId(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009999]"
            >
              <option value="">Guest contributor (no team profile)</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">
              Selecting your profile links this article to your Our Team page automatically.
            </p>
          </div>

          {!selectedAuthorId && (
            <>
              <div>
                <label className="block text-sm font-bold text-[#003366] mb-2">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Leave blank to use your account name"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009999]"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Useful for guest contributors, like a teen writing under their own name.
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#003366] mb-2">Author Role/Title</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Family Counselor & Child Psychologist"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009999]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#003366] mb-2">Short Author Bio (optional)</label>
                <input
                  type="text"
                  value={guestAuthorBio}
                  onChange={(e) => setGuestAuthorBio(e.target.value)}
                  placeholder="A one-line intro shown under your name"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009999]"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-[#003366] mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009999]"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.subCategory} value={c.subCategory}>{c.subcatName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#003366] mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-teal-50 file:text-[#009999] hover:file:bg-teal-100"
            />
            {coverImagePreview && (
              <img src={coverImagePreview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-xl border border-slate-200" />
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#003366] mb-2">Content</label>
            <PostEditor content={content} onChange={setContent} />
          </div>

          {message && (
            <div className="text-sm font-medium text-[#003366] bg-teal-50 border border-teal-100 rounded-lg px-4 py-3">
              {message}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#009999] hover:bg-[#008080] text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
        </div>
      </div>
    </div>
  );
}