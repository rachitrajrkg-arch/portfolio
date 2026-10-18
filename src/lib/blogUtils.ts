import { Block, BlogContent } from '../types';

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function blockText(block: Block): string {
  switch (block.type) {
    case 'heading':
    case 'paragraph':
    case 'quote':
      return block.text;
    case 'bulletList':
      return block.items.join(' ');
    case 'todo':
      return block.items.map((i) => i.text).join(' ');
    case 'image':
      return block.caption || '';
    case 'divider':
      return '';
  }
}

export function estimateReadTime(content: BlogContent): string {
  const allBlocks = [...content.original.blocks, ...content.updates.flatMap((u) => u.blocks)];
  const wordCount = allBlocks
    .map(blockText)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
