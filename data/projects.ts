import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "project-1",
    title: "マグロの惑星",
    description: "手足や翼が生えた、突然変異したマグロに襲撃された宇宙船からの脱出を目指す、サバイバルアクション脱出ゲーム。\n道中に落ちているアイテムやそれを利用したクラフト要素を駆使し、体力や空腹度に気を配りながら、マグロの脅威をかいくぐりながら先を目指す。\n日本ゲーム大賞 U18部門で銀賞を受賞。",
    imageUrl: "assets/Tuna.png",
    tags: [
      "Unity",
      "C#",
      "MagicaVoxel"
    ],
    links: [
      {
        label: "日本ゲーム大賞 U18部門 受賞作品",
        url: "https://u18.awards.cesa.or.jp/news/pressrelease20211003/"
      },
      {
        label: "作品ファイル",
        url: "https://drive.google.com/file/d/19nUF5Rbv83x38WguA_1VRrAf6Hp5zxQG/view?usp=drive_link"
      }
    ]
  },
  {
    id: 'project-2',
    title: 'Pixel Art RPG',
    description: '懐かしさを感じるドット絵のRPG。C++と自作エンジンで構築し、ゲームの低レイヤーな部分への理解を深めた。',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    tags: ['C++', 'Custom Engine', 'Pixel Art'],
    links: [
        { label: 'View Project', url: '#' },
    ],
  },
  {
    id: 'project-3',
    title: 'VR Communication App',
    description: 'UnityとVRMを利用したVRコミュニケーションツール。アバターを通じた新しい形の対話体験を追求した。',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    tags: ['Unity', 'VR', 'C#', 'Networking'],
    links: [
        { label: 'Source Code', url: 'https://github.com/Nemesis62542' },
    ],
  },
    {
    id: 'project-4',
    title: 'Portfolio Website',
    description: 'このポートフォリオサイト自体も作品の一つです。ReactとTailwind CSSで構築し、静的サイトとして公開しています。',
    imageUrl: 'https://picsum.photos/seed/project4/600/400',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: [
        { label: 'Source Code', url: 'https://github.com/Nemesis62542/portfolio' },
    ],
  },
];