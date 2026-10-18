'use client';

import React, { useRef, useState } from 'react';
import { BlogPost, BlogPostInput, BlogUpdate, Block } from '../../types';
import { slugify } from '../../lib/blogUtils';
import { BlockEditor } from './BlockEditor';
import { ArrowLeft, Plus, Save, Send, Trash2 } from 'lucide-react';

interface BlogEditorProps {
  post: BlogPost | null; // null = creating a new post
  /** 'original' (default) opens the post's main content; 'new' auto-creates and
   *  selects a fresh dated update, which is exactly the "continue this post" flow. */
  initialLayer?: 'original' | 'new';
  onSave: (input: BlogPostInput, status: 'draft' | 'published') => Promise<void>;
  onCancel: () => void;
}

type Layer = 'original' | { updateId: string };

const inputClass = 'w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-teal-500 outline-none text-sm font-medium text-white placeholder-slate-600';
const labelClass = 'text-sm font-bold text-slate-300';

export const BlogEditor: React.FC<BlogEditorProps> = ({ post, initialLayer, onSave, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!post);
  const [summary, setSummary] = useState(post?.summary || '');
  const [coverUrl, setCoverUrl] = useState(post?.coverUrl || '');
  const [category, setCategory] = useState(post?.category || '');
  const [author, setAuthor] = useState(post?.author || 'Dr. Rachit Raj');
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '');
  const [showSeo, setShowSeo] = useState(false);

  // When opened via "Add Update", generate the new update's id once and seed it straight
  // into `updates` + `activeLayer` below, so the chip row and block editor agree from the start.
  const pendingUpdateIdRef = useRef<string | null>(initialLayer === 'new' ? crypto.randomUUID() : null);
  const todayISO = new Date().toISOString().split('T')[0];

  const [originalBlocks, setOriginalBlocks] = useState<Block[]>(post?.content.original.blocks || []);
  const [updates, setUpdates] = useState<BlogUpdate[]>(() => {
    const base = post?.content.updates || [];
    return pendingUpdateIdRef.current ? [...base, { id: pendingUpdateIdRef.current, date: todayISO, blocks: [] }] : base;
  });
  const [activeLayer, setActiveLayer] = useState<Layer>(() =>
    pendingUpdateIdRef.current ? { updateId: pendingUpdateIdRef.current } : 'original'
  );

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited) setSlug(slugify(value));
  };

  const activeBlocks: Block[] =
    activeLayer === 'original' ? originalBlocks : updates.find((u) => u.id === activeLayer.updateId)?.blocks || [];

  const setActiveBlocks = (blocks: Block[]) => {
    if (activeLayer === 'original') {
      setOriginalBlocks(blocks);
    } else {
      setUpdates(updates.map((u) => (u.id === activeLayer.updateId ? { ...u, blocks } : u)));
    }
  };

  const addNewUpdate = () => {
    const newUpdate: BlogUpdate = { id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0], blocks: [] };
    setUpdates([...updates, newUpdate]);
    setActiveLayer({ updateId: newUpdate.id });
  };

  const removeUpdate = (id: string) => {
    setUpdates(updates.filter((u) => u.id !== id));
    if (activeLayer !== 'original' && activeLayer.updateId === id) setActiveLayer('original');
  };

  const setUpdateDate = (id: string, date: string) => {
    setUpdates(updates.map((u) => (u.id === id ? { ...u, date } : u)));
  };

  const buildInput = (status: 'draft' | 'published'): BlogPostInput => ({
    title,
    slug,
    summary,
    coverUrl: coverUrl || undefined,
    category,
    author,
    status,
    metaTitle: metaTitle || undefined,
    metaDescription: metaDescription || undefined,
    content: { original: { blocks: originalBlocks }, updates },
  });

  const handleSave = async (status: 'draft' | 'published') => {
    setError('');
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!slug.trim()) {
      setError('Slug is required.');
      return;
    }
    setSaving(true);
    try {
      await onSave(buildInput(status), status);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save post.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all posts
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-xl font-sans font-bold text-white">{post ? 'Edit Blog Post' : 'New Blog Post'}</h2>

        <div className="space-y-1">
          <label className={labelClass}>Title</label>
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} placeholder="Post title" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => { setSlug(slugify(e.target.value)); setSlugManuallyEdited(true); }}
              className={inputClass}
              placeholder="post-url-slug"
            />
            <p className="text-sm text-slate-500">/blog/{slug || 'your-slug'}</p>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} placeholder="e.g. Laser Proctology" />
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Cover Image URL</label>
          <div className="flex items-center gap-3">
            {coverUrl && <img src={coverUrl} alt="" className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0" />}
            <input type="text" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className={inputClass} placeholder="https://... (paste a Cloudinary URL)" />
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Summary</label>
          <textarea rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} className={inputClass} placeholder="Shown on the blog listing card" />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-700">
          <button
            type="button"
            onClick={() => setShowSeo(!showSeo)}
            className="text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors"
          >
            {showSeo ? '▾' : '▸'} SEO (optional)
          </button>
          {showSeo && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className={labelClass}>Meta Title</label>
                <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputClass} placeholder={title || 'Defaults to post title'} />
              </div>
              <div className="space-y-1">
                <label className={labelClass}>Meta Description</label>
                <textarea rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className={inputClass} placeholder={summary || 'Defaults to summary'} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div>
          <h3 className="text-xl font-sans font-bold text-white">Content</h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Edit the original post, fix a past update, or start a brand-new dated update.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveLayer('original')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm transition-colors ${
              activeLayer === 'original' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Original
          </button>
          {updates.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setActiveLayer({ updateId: u.id })}
              className={`px-3 py-1.5 rounded-xl font-bold text-sm transition-colors ${
                activeLayer !== 'original' && activeLayer.updateId === u.id ? 'bg-teal-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Update — {u.date}
            </button>
          ))}
          <button
            type="button"
            onClick={addNewUpdate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Update
          </button>
        </div>

        {activeLayer !== 'original' && (
          <div className="flex items-center gap-3">
            <label className={labelClass}>Update date</label>
            <input
              type="date"
              value={updates.find((u) => u.id === activeLayer.updateId)?.date || ''}
              onChange={(e) => setUpdateDate(activeLayer.updateId, e.target.value)}
              className={`${inputClass} w-auto`}
            />
            <button
              type="button"
              onClick={() => removeUpdate(activeLayer.updateId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 text-sm font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete This Update
            </button>
          </div>
        )}

        <BlockEditor blocks={activeBlocks} onChange={setActiveBlocks} />
      </div>

      {error && <p className="text-sm text-rose-400 font-semibold">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave('draft')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save as Draft
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave('published')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          Publish
        </button>
      </div>
    </div>
  );
};
