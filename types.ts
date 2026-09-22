export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  title?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  order: number; // 大きいほど一覧の上に表示
  featured: boolean; // Home の「代表作品」に表示するか
  imageUrl: string; // thumbnailUrlがない場合のフォールバック
  thumbnailUrl?: string; // 一覧表示用サムネイル
  images?: string[]; // 複数画像
  videos?: string[]; // 動画URL配列
  tags: string[];
  links: {
    label: string;
    url: string;
  }[];
}

export interface Post {
  id: string;
  title:string;
  date: string;
  excerpt: string;
  content: string;
  thumbnailUrl?: string; // OGP画像用サムネイル
}