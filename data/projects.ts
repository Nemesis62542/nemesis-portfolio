
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '3D Action Game',
    description: 'UnityとC#で開発した、爽快なコンボが特徴の3Dアクションゲーム。企画、プログラミング、エフェクト制作まで担当。',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    tags: ['Unity', 'C#', 'Blender', 'Game Design'],
    projectUrl: '#',
    sourceUrl: 'https://github.com/Nemesis62542',
  },
  {
    id: 'project-2',
    title: 'Pixel Art RPG',
    description: '懐かしさを感じるドット絵のRPG。C++と自作エンジンで構築し、ゲームの低レイヤーな部分への理解を深めた。',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    tags: ['C++', 'Custom Engine', 'Pixel Art'],
    projectUrl: '#',
  },
  {
    id: 'project-3',
    title: 'VR Communication App',
    description: 'UnityとVRMを利用したVRコミュニケーションツール。アバターを通じた新しい形の対話体験を追求した。',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    tags: ['Unity', 'VR', 'C#', 'Networking'],
    sourceUrl: 'https://github.com/Nemesis62542',
  },
    {
    id: 'project-4',
    title: 'Portfolio Website',
    description: 'このポートフォリオサイト自体も作品の一つです。ReactとTailwind CSSで構築し、静的サイトとして公開しています。',
    imageUrl: 'https://picsum.photos/seed/project4/600/400',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    sourceUrl: 'https://github.com/Nemesis62542/portfolio',
  },
];
