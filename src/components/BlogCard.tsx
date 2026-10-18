import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../types';
import { estimateReadTime, formatBlogDate } from '../lib/blogUtils';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, className = '' }) => (
  <Link
    href={`/blog/${post.slug}`}
    className={`group border border-ink/10 rounded-2xl overflow-hidden hover:border-ink/20 transition-colors flex flex-col ${className}`}
  >
    <div className="h-40 overflow-hidden relative bg-forest-50">
      {post.coverUrl && (
        <img
          src={post.coverUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
      {post.category && (
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-paper/95 text-forest-700 text-sm font-semibold">
          {post.category}
        </span>
      )}
    </div>

    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-ink">{post.title}</h3>
        <p className="text-sm text-ink/60 mt-1.5 leading-relaxed line-clamp-2">{post.summary}</p>
      </div>
      <div className="pt-3 border-t border-ink/10 flex items-center justify-between">
        <span className="text-sm text-ink/50">{post.publishedAt ? formatBlogDate(post.publishedAt) : ''}</span>
        <span className="text-sm text-ink/50">{estimateReadTime(post.content)}</span>
      </div>
    </div>
  </Link>
);
