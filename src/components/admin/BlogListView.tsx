'use client';

import React from 'react';
import { BlogPost } from '../../types';
import { Plus, Pencil, CalendarPlus, Trash2, ExternalLink } from 'lucide-react';

interface BlogListViewProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onAddUpdate: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  onCreateNew: () => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({ posts, onEdit, onAddUpdate, onDelete, onCreateNew }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-sans font-bold text-white">Manage Blog Posts</h2>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-400 text-sm">No blog posts yet — create your first one above.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-white truncate">{post.title}</span>
                  <span className={`text-sm font-bold px-2 py-0.5 rounded ${post.status === 'published' ? 'bg-teal-950 text-teal-300 border border-teal-800' : 'bg-slate-700 text-slate-300 border border-slate-600'}`}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                  {post.content.updates.length > 0 && (
                    <span className="text-sm text-slate-400">{post.content.updates.length} update{post.content.updates.length > 1 ? 's' : ''}</span>
                  )}
                </div>
                <p className="text-sm text-slate-400">
                  /blog/{post.slug} · Updated {new Date(post.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {post.status === 'published' && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                    title="View live"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => onAddUpdate(post)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition-colors"
                  title="Continue this post with a new dated update"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Add Update
                </button>
                <button
                  onClick={() => onEdit(post)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post)}
                  className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
