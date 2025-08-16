import React, { useState } from 'react';
import { Eye, Edit3, Split } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface MarkdownEditorProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 10,
  placeholder = 'Markdownで記述してください...'
}) => {
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('edit');

  const ViewModeButton: React.FC<{
    mode: 'edit' | 'preview' | 'split';
    icon: React.ElementType;
    label: string;
  }> = ({ mode, icon: Icon, label }) => (
    <button
      type="button"
      onClick={() => setViewMode(mode)}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        viewMode === mode
          ? 'bg-accent text-white'
          : 'bg-overlay text-text-secondary hover:bg-muted hover:text-white'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="block text-sm font-medium text-subtle">
          {label}
        </label>
        <div className="flex gap-2">
          <ViewModeButton mode="edit" icon={Edit3} label="編集" />
          <ViewModeButton mode="preview" icon={Eye} label="プレビュー" />
          <ViewModeButton mode="split" icon={Split} label="分割" />
        </div>
      </div>

      <div className="border border-overlay rounded-md overflow-hidden">
        {viewMode === 'edit' && (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className="w-full bg-overlay border-none text-text-primary p-4 resize-none focus:ring-2 focus:ring-accent focus:outline-none"
          />
        )}

        {viewMode === 'preview' && (
          <div className="min-h-[200px] bg-surface border border-overlay rounded-md p-4">
            {value.trim() ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-text-secondary italic">プレビューするコンテンツがありません</p>
            )}
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-overlay">
            <div className="relative">
              <div className="absolute top-2 left-2 text-xs text-text-secondary font-medium bg-overlay px-2 py-1 rounded z-10">
                編集
              </div>
              <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                rows={rows}
                placeholder={placeholder}
                className="w-full h-full bg-overlay border-none text-text-primary p-4 pt-10 resize-none focus:ring-2 focus:ring-accent focus:outline-none"
              />
            </div>
            <div className="relative">
              <div className="absolute top-2 left-2 text-xs text-text-secondary font-medium bg-surface px-2 py-1 rounded z-10">
                プレビュー
              </div>
              <div className="min-h-[200px] bg-surface p-4 pt-10 overflow-auto">
                {value.trim() ? (
                  <MarkdownRenderer content={value} />
                ) : (
                  <p className="text-text-secondary italic">プレビューするコンテンツがありません</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-text-secondary">
        <strong>サポートされているMarkdown記法:</strong> 見出し (## ###)、太字 (**text**)、箇条書き (- または *)、コードブロック (```)
      </div>
    </div>
  );
};

// Mock lucide-react icons
if (typeof Eye === 'undefined') {
  (window as any).Eye = () => <svg/>;
  (window as any).Edit3 = () => <svg/>;
  (window as any).Split = () => <svg/>;
}

export default MarkdownEditor;