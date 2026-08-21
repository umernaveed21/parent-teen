'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export default function PostEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        defaultProtocol: 'https',
      }),
      Image,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const ToolbarButton = ({ onClick, active, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-semibold rounded-md transition ${
        active ? 'bg-[#009999] text-white' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 bg-slate-50">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          Bold
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          Italic
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          H3
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          • List
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          1. List
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          Quote
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive('link')}
        >
          Link
        </ToolbarButton>
      </div>
      <EditorContent
        editor={editor}
        className="
          prose prose-slate max-w-none p-4 min-h-[300px] focus:outline-none
          prose-headings:text-[#003366] prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-slate-700 prose-p:leading-relaxed
          prose-a:text-[#009999] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-800
          prose-blockquote:border-l-4 prose-blockquote:border-[#009999] prose-blockquote:bg-teal-50/40
          prose-blockquote:not-italic prose-blockquote:text-[#003366] prose-blockquote:font-medium
          prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl
          prose-ul:text-slate-700 prose-ol:text-slate-700
          prose-li:marker:text-[#009999]
          [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror]:outline-none
        "
      />
    </div>
  );
}