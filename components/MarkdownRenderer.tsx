
import React from 'react';
import type { JSX } from 'react';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const renderMarkdown = () => {
        if (!content) return null;
        
        const parseInlineMarkdown = (text: string): React.ReactNode => {
            // Handle multiple inline formats in order of precedence
            let result: React.ReactNode[] = [text];
            
            // Bold **text**
            result = result.flatMap((item, index) => {
                if (typeof item !== 'string') return item;
                const parts = item.split(/(\*\*.*?\*\*)/g);
                return parts.map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={`${index}-bold-${partIndex}`} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                });
            });
            
            // Italic *text*
            result = result.flatMap((item, index) => {
                if (typeof item !== 'string') return item;
                const parts = item.split(/(\*[^*]+?\*)/g);
                return parts.map((part, partIndex) => {
                    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                        return <em key={`${index}-italic-${partIndex}`} className="italic text-text-primary">{part.slice(1, -1)}</em>;
                    }
                    return part;
                });
            });
            
            // Strikethrough ~~text~~
            result = result.flatMap((item, index) => {
                if (typeof item !== 'string') return item;
                const parts = item.split(/(~~.*?~~)/g);
                return parts.map((part, partIndex) => {
                    if (part.startsWith('~~') && part.endsWith('~~')) {
                        return <del key={`${index}-strike-${partIndex}`} className="line-through text-text-secondary">{part.slice(2, -2)}</del>;
                    }
                    return part;
                });
            });
            
            // Inline code `code`
            result = result.flatMap((item, index) => {
                if (typeof item !== 'string') return item;
                const parts = item.split(/(`[^`]+?`)/g);
                return parts.map((part, partIndex) => {
                    if (part.startsWith('`') && part.endsWith('`')) {
                        return <code key={`${index}-code-${partIndex}`} className="bg-overlay px-2 py-1 rounded text-accent font-mono text-sm">{part.slice(1, -1)}</code>;
                    }
                    return part;
                });
            });
            
            // Images ![alt](url) - Process before links to avoid conflicts
            result = result.flatMap((item, index) => {
                if (typeof item !== 'string') return item;
                const parts = item.split(/(!\[([^\]]*)\]\(([^)]+)\))/g);
                const newParts = [];
                for (let i = 0; i < parts.length; i += 4) {
                    if (parts[i]) newParts.push(parts[i]);
                    if (parts[i + 1] && parts[i + 3]) {
                        newParts.push(
                            <img key={`${index}-img-${i}`} src={parts[i + 3]} alt={parts[i + 2] || ''} className="max-w-full h-auto rounded-md my-2" />
                        );
                    }
                }
                return newParts;
            });
            
            // Links [text](url)
            result = result.flatMap((item, index) => {
                if (typeof item !== 'string') return item;
                const parts = item.split(/(\[([^\]]+)\]\(([^)]+)\))/g);
                const newParts = [];
                for (let i = 0; i < parts.length; i += 4) {
                    if (parts[i]) newParts.push(parts[i]);
                    if (parts[i + 1] && parts[i + 2] && parts[i + 3]) {
                        newParts.push(
                            <a key={`${index}-link-${i}`} href={parts[i + 3]} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline">
                                {parts[i + 2]}
                            </a>
                        );
                    }
                }
                return newParts;
            });
            
            return result;
        };

        const lines = content.split('\n');
        const elements: JSX.Element[] = [];
        let listItems: JSX.Element[] = [];
        let orderedListItems: JSX.Element[] = [];
        let tableRows: JSX.Element[] = [];
        let inCodeBlock = false;
        let inTable = false;
        let codeContent = '';
        let codeLanguage = '';
        let codeTitle = '';

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-lg leading-relaxed text-text-primary">{listItems}</ul>);
                listItems = [];
            }
            if (orderedListItems.length > 0) {
                elements.push(<ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-2 my-4 pl-4 text-lg leading-relaxed text-text-primary">{orderedListItems}</ol>);
                orderedListItems = [];
            }
        };

        const flushTable = () => {
            if (tableRows.length > 0) {
                elements.push(
                    <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
                        <table className="min-w-full border border-surface">
                            <tbody>{tableRows}</tbody>
                        </table>
                    </div>
                );
                tableRows = [];
                inTable = false;
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code blocks
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    const titleElement = codeTitle ? <div className="bg-overlay text-text-secondary text-sm px-3 py-1 border-b border-surface">{codeTitle}</div> : null;
                    elements.push(
                        <div key={`code-${i}`} className="my-4 rounded-md overflow-hidden border border-surface">
                            {titleElement}
                            <pre className="bg-overlay p-4 overflow-x-auto">
                                <code className={`font-mono text-sm text-subtle ${codeLanguage ? `language-${codeLanguage}` : ''}`}>
                                    {codeContent.trim()}
                                </code>
                            </pre>
                        </div>
                    );
                    codeContent = '';
                    codeLanguage = '';
                    codeTitle = '';
                } else {
                    flushList();
                    flushTable();
                    // Parse language and title from ```javascript:title format
                    const match = line.match(/^```(\w+)?:?(.*)$/);
                    if (match) {
                        codeLanguage = match[1] || '';
                        codeTitle = match[2] || '';
                    }
                }
                inCodeBlock = !inCodeBlock;
                continue;
            }

            if (inCodeBlock) {
                codeContent += line + '\n';
                continue;
            }

            // Table detection
            if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
                if (!inTable) {
                    flushList();
                    inTable = true;
                }
                
                const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
                const isHeaderSeparator = cells.every(cell => /^:?-+:?$/.test(cell));
                
                if (!isHeaderSeparator) {
                    const isHeader = tableRows.length === 0;
                    const cellElements = cells.map((cell, cellIndex) => {
                        const alignment = i + 1 < lines.length && lines[i + 1].includes('|') 
                            ? (lines[i + 1].split('|')[cellIndex + 1] || '').trim()
                            : '';
                        const alignClass = alignment.startsWith(':') && alignment.endsWith(':') ? 'text-center' :
                                         alignment.endsWith(':') ? 'text-right' : 'text-left';
                        
                        return isHeader 
                            ? <th key={cellIndex} className={`border border-surface px-3 py-2 bg-surface font-bold text-white ${alignClass}`}>{parseInlineMarkdown(cell)}</th>
                            : <td key={cellIndex} className={`border border-surface px-3 py-2 text-text-primary ${alignClass}`}>{parseInlineMarkdown(cell)}</td>;
                    });
                    
                    tableRows.push(<tr key={`row-${i}`}>{cellElements}</tr>);
                }
                continue;
            } else if (inTable) {
                flushTable();
            }
            
            // Headings
            if (line.startsWith('# ')) {
                flushList();
                flushTable();
                elements.push(<h1 key={i} className="text-4xl font-bold text-white mt-8 mb-6 border-b-2 border-surface pb-3">{line.substring(2)}</h1>);
            } else if (line.startsWith('## ')) {
                flushList();
                flushTable();
                elements.push(<h2 key={i} className="text-3xl font-bold text-white mt-8 mb-4 border-b-2 border-surface pb-2">{line.substring(3)}</h2>);
            } else if (line.startsWith('### ')) {
                flushList();
                flushTable();
                elements.push(<h3 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.substring(4)}</h3>);
            } else if (line.startsWith('#### ')) {
                flushList();
                flushTable();
                elements.push(<h4 key={i} className="text-xl font-bold text-white mt-4 mb-2">{line.substring(5)}</h4>);
            } else if (line.startsWith('##### ')) {
                flushList();
                flushTable();
                elements.push(<h5 key={i} className="text-lg font-bold text-white mt-3 mb-2">{line.substring(6)}</h5>);
            } else if (line.startsWith('###### ')) {
                flushList();
                flushTable();
                elements.push(<h6 key={i} className="text-base font-bold text-white mt-2 mb-1">{line.substring(7)}</h6>);
            }
            // Horizontal rule
            else if (line.trim() === '---' || line.trim() === '***') {
                flushList();
                flushTable();
                elements.push(<hr key={i} className="my-6 border-surface" />);
            }
            // Blockquotes
            else if (line.startsWith('> ')) {
                flushList();
                flushTable();
                const quoteLevel = (line.match(/^>+/) || [''])[0].length;
                const quotePadding = `pl-${Math.min(quoteLevel * 4, 12)}`;
                elements.push(
                    <blockquote key={i} className={`border-l-4 border-accent bg-surface/50 py-2 px-4 my-4 ${quotePadding}`}>
                        <p className="text-text-primary italic">{parseInlineMarkdown(line.substring(quoteLevel + 1))}</p>
                    </blockquote>
                );
            }
            // Ordered lists
            else if (/^\d+\.\s/.test(line)) {
                flushTable();
                const match = line.match(/^(\d+)\.\s(.*)$/);
                if (match) {
                    orderedListItems.push(<li key={i} value={parseInt(match[1])}>{parseInlineMarkdown(match[2])}</li>);
                }
            }
            // Unordered lists
            else if (line.startsWith('- ') || line.startsWith('* ')) {
                flushTable();
                listItems.push(<li key={i}>{parseInlineMarkdown(line.substring(2))}</li>);
            }
            // Regular paragraphs
            else if (line.trim() !== '') {
                flushList();
                flushTable();
                elements.push(<p key={i} className="my-4 text-lg leading-relaxed text-text-primary">{parseInlineMarkdown(line)}</p>);
            } else {
                flushList();
                flushTable();
            }
        }
        
        flushList();
        flushTable();

        return elements;
    };

    return <div className="prose prose-invert max-w-none">{renderMarkdown()}</div>;
};

export default MarkdownRenderer;