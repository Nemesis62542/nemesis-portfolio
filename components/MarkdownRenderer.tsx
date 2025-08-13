
import React from 'react';
import type { JSX } from 'react';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    // This is a simplified parser. For production, a library like 'marked' or 'react-markdown' is recommended.
    const renderMarkdown = () => {
        if (!content) return null;
        
        const lines = content.split('\n');
        const elements: JSX.Element[] = [];
        let inList = false;
        let listItems: JSX.Element[] = [];
        let inCodeBlock = false;
        let codeContent = '';

        const flushList = (key: string | number) => {
            if (inList) {
                elements.push(<ul key={`ul-${key}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-lg leading-relaxed text-text-primary">{listItems}</ul>);
                listItems = [];
                inList = false;
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
                    flushList(i);
                }
                inCodeBlock = !inCodeBlock;
                continue;
            }

            if (inCodeBlock) {
                codeContent += line + '\n';
                continue;
            }
            
            flushList(i); // Flush list if a non-list item is encountered

            if (line.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-3xl font-bold text-white mt-8 mb-4 border-b-2 border-surface pb-2">{line.substring(3)}</h2>);
            } else if (line.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.substring(4)}</h3>);
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                if (!inList) {
                    inList = true;
                }
                listItems.push(<li key={i}>{line.substring(2)}</li>);
            } else if (line.trim() !== '') {
                 elements.push(<p key={i} className="my-4 text-lg leading-relaxed text-text-primary">{line}</p>);
            }
        }
        
        flushList('end'); // Flush any remaining list at the end of the content

        return elements;
    };

    return <div className="prose prose-invert max-w-none">{renderMarkdown()}</div>;
};

export default MarkdownRenderer;