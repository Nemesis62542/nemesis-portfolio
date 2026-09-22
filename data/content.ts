import YAML from 'yaml';
import { Project, Post } from '../types';

// content/ 配下の Markdown をビルド時に取り込む。
// ファイル名（拡張子なし）がそのまま URL の ID になる。
const projectFiles = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const postFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parse(path: string, raw: string): { id: string; meta: Record<string, any>; body: string } {
  const id = path.split('/').pop()!.replace(/\.md$/, '');
  const match = raw.match(FRONTMATTER);
  if (!match) {
    throw new Error(`${path}: 先頭に --- で囲んだ frontmatter がありません`);
  }
  return { id, meta: YAML.parse(match[1]) ?? {}, body: match[2].trim() };
}

// order が大きいものほど上に表示する
export const projects: Project[] = Object.entries(projectFiles)
  .map(([path, raw]) => {
    const { id, meta, body } = parse(path, raw);
    return {
      id,
      title: meta.title,
      order: meta.order ?? 0,
      featured: meta.featured ?? false,
      description: body,
      imageUrl: meta.imageUrl ?? meta.thumbnailUrl ?? meta.images?.[0] ?? '',
      thumbnailUrl: meta.thumbnailUrl,
      images: meta.images ?? [],
      videos: meta.videos ?? [],
      tags: meta.tags ?? [],
      links: meta.links ?? [],
    };
  })
  .sort((a, b) => b.order - a.order);

// 新しい記事ほど上に表示する
export const posts: Post[] = Object.entries(postFiles)
  .map(([path, raw]) => {
    const { id, meta, body } = parse(path, raw);
    return {
      id,
      title: meta.title,
      date: String(meta.date),
      excerpt: meta.excerpt ?? '',
      content: body,
      thumbnailUrl: meta.thumbnailUrl,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
