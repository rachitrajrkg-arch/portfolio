'use client';

import React from 'react';
import { Block } from '../../types';
import { Heading, Pilcrow, List, CheckSquare, Image as ImageIcon, Quote, Minus, Trash2, ChevronUp, ChevronDown, Plus } from 'lucide-react';

interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

function newBlock(type: Block['type']): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case 'heading':
      return { id, type: 'heading', level: 2, text: '' };
    case 'paragraph':
      return { id, type: 'paragraph', text: '' };
    case 'bulletList':
      return { id, type: 'bulletList', items: [''] };
    case 'todo':
      return { id, type: 'todo', items: [{ id: crypto.randomUUID(), text: '', checked: false }] };
    case 'image':
      return { id, type: 'image', url: '', caption: '' };
    case 'quote':
      return { id, type: 'quote', text: '', attribution: '' };
    case 'divider':
      return { id, type: 'divider' };
  }
}

const ADD_BUTTONS: { type: Block['type']; label: string; icon: React.ElementType }[] = [
  { type: 'heading', label: 'Heading', icon: Heading },
  { type: 'paragraph', label: 'Text', icon: Pilcrow },
  { type: 'bulletList', label: 'Bullets', icon: List },
  { type: 'todo', label: 'Checklist', icon: CheckSquare },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'quote', label: 'Quote', icon: Quote },
  { type: 'divider', label: 'Divider', icon: Minus },
];

const inputClass = 'w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-600';

export const BlockEditor: React.FC<BlockEditorProps> = ({ blocks, onChange }) => {
  const updateBlock = (index: number, updated: Block) => {
    const next = [...blocks];
    next[index] = updated;
    onChange(next);
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addBlock = (type: Block['type']) => {
    onChange([...blocks, newBlock(type)]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ADD_BUTTONS.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold transition-colors"
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {blocks.length === 0 && (
          <p className="text-sm text-slate-500 italic">No blocks yet — add one above to start writing.</p>
        )}

        {blocks.map((block, index) => (
          <div key={block.id} className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">{block.type}</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-30 transition-colors">
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-30 transition-colors">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => removeBlock(index)} className="p-1.5 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {block.type === 'heading' && (
              <div className="flex gap-2">
                <select
                  value={block.level}
                  onChange={(e) => updateBlock(index, { ...block, level: Number(e.target.value) as 2 | 3 })}
                  className={`${inputClass} w-24`}
                >
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                </select>
                <input
                  type="text"
                  value={block.text}
                  onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                  placeholder="Heading text"
                  className={inputClass}
                />
              </div>
            )}

            {block.type === 'paragraph' && (
              <textarea
                rows={3}
                value={block.text}
                onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                placeholder="Write a paragraph..."
                className={inputClass}
              />
            )}

            {block.type === 'quote' && (
              <div className="space-y-2">
                <textarea
                  rows={2}
                  value={block.text}
                  onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                  placeholder="Quote text"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={block.attribution || ''}
                  onChange={(e) => updateBlock(index, { ...block, attribution: e.target.value })}
                  placeholder="Attribution (optional)"
                  className={inputClass}
                />
              </div>
            )}

            {block.type === 'bulletList' && (
              <div className="space-y-2">
                {block.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const items = [...block.items];
                        items[i] = e.target.value;
                        updateBlock(index, { ...block, items });
                      }}
                      placeholder={`Item ${i + 1}`}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => updateBlock(index, { ...block, items: block.items.filter((_, ii) => ii !== i) })}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateBlock(index, { ...block, items: [...block.items, ''] })}
                  className="flex items-center gap-1 text-sm font-bold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add item
                </button>
              </div>
            )}

            {block.type === 'todo' && (
              <div className="space-y-2">
                {block.items.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => {
                        const items = [...block.items];
                        items[i] = { ...items[i], checked: e.target.checked };
                        updateBlock(index, { ...block, items });
                      }}
                      className="w-4 h-4 accent-teal-500 shrink-0"
                    />
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => {
                        const items = [...block.items];
                        items[i] = { ...items[i], text: e.target.value };
                        updateBlock(index, { ...block, items });
                      }}
                      placeholder={`To-do ${i + 1}`}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => updateBlock(index, { ...block, items: block.items.filter((_, ii) => ii !== i) })}
                      className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateBlock(index, { ...block, items: [...block.items, { id: crypto.randomUUID(), text: '', checked: false }] })}
                  className="flex items-center gap-1 text-sm font-bold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to-do
                </button>
              </div>
            )}

            {block.type === 'image' && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {block.url && <img src={block.url} alt="" className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0" />}
                  <input
                    type="text"
                    value={block.url}
                    onChange={(e) => updateBlock(index, { ...block, url: e.target.value })}
                    placeholder="https://... (paste a Cloudinary URL)"
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  value={block.caption || ''}
                  onChange={(e) => updateBlock(index, { ...block, caption: e.target.value })}
                  placeholder="Caption (optional)"
                  className={inputClass}
                />
              </div>
            )}

            {block.type === 'divider' && <p className="text-sm text-slate-500">A horizontal divider line.</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
