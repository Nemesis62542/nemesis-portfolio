
import React from 'react';
import type { JSX } from 'react';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    // This is a simplified parser. For production, a library like 'marked' or 'react-markdown' is recommended.
    const renderMarkdown = () => {
        if (!content) return null;
        
        const parseInlineMarkdown = (text: string): React.ReactNode => {
            // Split the text by the bold markdown syntax, keeping the delimiters.
            const parts = text.split(/(\*\*.*?\*\*)/g);
            return parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    // If the part is bold syntax, render it as a <strong> element.
                    return <strong key={index} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                }
                // Otherwise, return the text as is.
                return part;
            });
        };

        const lines = content.split('\n');
        const elements: JSX.Element[] = [];
        let listItems: JSX.Element[] = [];
        let inCodeBlock = false;
        let codeContent = '';

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-lg leading-relaxed text-text-primary">{listItems}</ul>);
                listItems = [];
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    elements.push(
                        <pre key={`code-${i}`} className="bg-overlay p-4 rounded-md my-4 overflow-x-auto">
                            <code className="font-mono text-sm text-subtle">{codeContent.trim()}</code>
                        </pre>
                    );
                    codeContent = '';
                } else {
                    flushList();
                }
                inCodeBlock = !inCodeBlock;
                continue;
            }

            if (inCodeBlock) {
                codeContent += line + '\n';
                continue;
            }
            
            if (line.startsWith('## ')) {
                flushList();
                elements.push(<h2 key={i} className="text-3xl font-bold text-white mt-8 mb-4 border-b-2 border-surface pb-2">{line.substring(3)}</h2>);
            } else if (line.startsWith('### ')) {
                flushList();
                elements.push(<h3 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.substring(4)}</h3>);
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                listItems.push(<li key={i}>{parseInlineMarkdown(line.substring(2))}</li>);
            } else if (line.trim() !== '') {
                flushList();
                elements.push(<p key={i} className="my-4 text-lg leading-relaxed text-text-primary">{parseInlineMarkdown(line)}</p>);
            } else {
                flushList();
            }
        }
        
        flushList(); // Flush any remaining list at the end of the content

        return elements;
    };

    return <div className="prose prose-invert max-w-none">{renderMarkdown()}</div>;
};

export default MarkdownRenderer;