import React from 'react';
import { Block } from '../types';
import { CheckSquare, Square } from 'lucide-react';

interface BlockRendererProps {
  blocks: Block[];
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  return (
    <div className="space-y-5">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading': {
            const Tag = block.level === 2 ? 'h2' : 'h3';
            return (
              <Tag key={block.id} className={block.level === 2 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}>
                {block.text}
              </Tag>
            );
          }
          case 'paragraph':
            return (
              <p key={block.id} className="text-base text-ink/80 leading-relaxed whitespace-pre-line">
                {block.text}
              </p>
            );
          case 'bulletList':
            return (
              <ul key={block.id} className="list-disc pl-5 space-y-1.5 text-base text-ink/80 leading-relaxed">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'todo':
            return (
              <ul key={block.id} className="space-y-2">
                {block.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5 text-base text-ink/80">
                    {item.checked ? (
                      <CheckSquare className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-ink/30 shrink-0 mt-0.5" />
                    )}
                    <span className={item.checked ? 'line-through text-ink/50' : ''}>{item.text}</span>
                  </li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <figure key={block.id} className="space-y-2">
                <div className="rounded-2xl border border-ink/10 overflow-hidden bg-forest-50">
                  <img src={block.url} alt={block.caption || ''} className="w-full h-auto object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="text-sm text-ink/50 text-center">{block.caption}</figcaption>
                )}
              </figure>
            );
          case 'quote':
            return (
              <blockquote key={block.id} className="border-l-4 border-forest-600 pl-4 italic text-ink/80 text-base">
                <p>{block.text}</p>
                {block.attribution && <cite className="block not-italic text-sm text-ink/50 mt-1.5">— {block.attribution}</cite>}
              </blockquote>
            );
          case 'divider':
            return <hr key={block.id} className="border-ink/10" />;
        }
      })}
    </div>
  );
};
