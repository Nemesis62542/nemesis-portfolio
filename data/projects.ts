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
    id: "project-2",
    title: "The Hungry Cat",
    description: "「食べたものが持つ能力を自分のものにする」猫が、のどかな田舎町の中を暴れまわる、アクションゲーム。町に住む人や野良犬、悪魔や龍や神も登場して激闘を繰り広げる。\n\nUnityユースクリエイターカップでブロンズアワードを受賞。",
    imageUrl: "assets/Cat.png",
    tags: [
      "Unity",
      "C#",
      "MagicaVoxel"
    ],
    links: [
      {
        label: "作品ファイル",
        url: "https://drive.google.com/file/d/16IIqP_K_yQPi-GvVZnwKakfhCkx1FAGK/view?usp=sharing"
      }
    ]
  },
  {
    id: "project-3",
    title: "Home Wars",
    description: "小さくなった戦闘機が家の中を飛び回り、家具や小物と戦うシューティングゲーム。\nNemesisのゲームクリエイターとしての処女作であり、PCNプロコン2017夏にて**最優秀賞を受賞**。",
    imageUrl: "assets/home wars.png",
    tags: [
      "Scratch"
    ],
    links: [
      {
        label: "PCNプロコン2017夏 受賞作品",
        url: "https://pcn.club/contest/contest07.html"
      }
    ]
  }
];