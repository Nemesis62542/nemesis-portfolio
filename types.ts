export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  title?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // 後方互換性のため残す（thumbnailUrlがない場合のフォールバック）
  thumbnailUrl?: string; // 一覧表示用サムネイル
  images?: string[]; // 複数画像（カンマ区切り文字列をパース）
  videos?: string[]; // 動画URL配列
  media?: MediaItem[]; // 統合メディア配列（画像・動画混在）
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
}