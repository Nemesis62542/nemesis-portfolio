import { Project } from '../types';

export const projects: Project[] = [
  {
    "id": "project-1",
    "title": "マグロの惑星",
    "description": "手足や翼が生えた、突然変異したマグロに襲撃された宇宙船からの脱出を目指す、サバイバルアクション脱出ゲーム。\n道中に落ちているアイテムやそれを利用したクラフト要素を駆使し、体力や空腹度に気を配りながら、マグロの脅威をかいくぐりながら先を目指す。\n日本ゲーム大賞 U18部門で銀賞を受賞。\n\n### こだわった部分\n- **テーマの追求**： 好きな要素ややりたいことを詰め込むことを意識し、自分らしい世界観を追求しました。\n- **世界観演出**： シリアスな状況下にあっても、どこか笑える空気感を持たせるように工夫しました（「サメ映画」のようなイメージ）。\n- **システム面**： クラフトシステムなど一度実装してみたかった仕組みを導入し、さらにアイテムごとにフレーバーテキストを設定することで、「アイテムを拾う楽しさ」を演出しました。",
    "imageUrl": "assets/images/Tuna.png",
    "tags": [
      "Unity",
      "C#",
      "MagicaVoxel"
    ],
    "links": [
      {
        "label": "日本ゲーム大賞 U18部門 受賞作品",
        "url": "https://u18.awards.cesa.or.jp/news/pressrelease20211003/"
      },
      {
        "label": "作品ファイル",
        "url": "https://drive.google.com/file/d/19nUF5Rbv83x38WguA_1VRrAf6Hp5zxQG/view?usp=drive_link"
      }
    ],
    "images": [
      "assets/images/Tuna.png"
    ],
    "videos": [
      "assets/videos/maguro_planet.mp4"
    ],
    "thumbnailUrl": "assets/images/Tuna.png"
  },
  {
    "id": "project-2",
    "title": "The Hungry Cat",
    "description": "「食べたものが持つ能力を自分のものにする」猫が、のどかな田舎町の中を暴れまわる、アクションゲーム。町に住む人や野良犬、悪魔や龍や神も登場して激闘を繰り広げる。\n\nUnityユースクリエイターカップでブロンズアワードを受賞。\n\n### こだわった部分\n- **世界観** :  難しいことを何も考えず、自由に暴れられる世界観を表現。人や動物に加え、神や悪魔、龍といった、「のどかな街」とはかけ離れた存在も登場させることで、ギャップによる面白さを狙いました。\n- **システム** : 「食べたものの能力を得る」システムにより、プレイヤーの探究心を刺激し、「何を食べればどんな能力が得られるのか？」と試行錯誤できる様になり、遊びの幅を増やしました。また、時間の経過による昼夜の概念により、街ののどかさを演出しつつ、出現するキャラクターが変化することで、プレイヤーが飽きにくくする工夫も取り入れました。",
    "imageUrl": "assets/images/Cat.png",
    "tags": [
      "Unity",
      "C#",
      "MagicaVoxel"
    ],
    "links": [
      {
        "label": "作品ファイル",
        "url": "https://drive.google.com/file/d/16IIqP_K_yQPi-GvVZnwKakfhCkx1FAGK/view?usp=sharing"
      }
    ],
    "images": [
      "assets/images/Cat.png"
    ],
    "videos": [
      "assets/videos/TheHungryCat_Movie.mp4"
    ],
    "thumbnailUrl": "assets/images/Cat.png"
  },
  {
    "id": "project-3",
    "title": "Home Wars",
    "description": "小さくなった戦闘機が家の中を飛び回り、家具や小物と戦うシューティングゲーム。\nNemesisのゲームクリエイターとしての処女作であり、PCNプロコン2017夏にて**最優秀賞を受賞**。",
    "imageUrl": "assets/images/home wars.png",
    "tags": [
      "Scratch"
    ],
    "links": [
      {
        "label": "PCNプロコン2017夏 受賞作品",
        "url": "https://pcn.club/contest/contest07.html"
      }
    ],
    "images": [
      "assets/images/home wars.png"
    ],
    "videos": [],
    "thumbnailUrl": "assets/images/home wars.png"
  },
  {
    "id": "project-1755113077974",
    "title": "ポートフォリオサイト",
    "description": "このポートフォリオサイトも自作。Google AI Studioで大枠を作り、細かい部分や掲載内容を自分で担当し、ページの公開はGithub Pagesを利用。\n\n### こだわった部分\n- **使いやすさ**：ProjectsやBlogのページの内容は、後から追加・削除・修正などの変更が行いやすいように、管理者用機能でサイト内に専用のページを用意し、そこから内容を追加・変更できるようにしています。\n- **ビジュアル**：見やすさを意識したコンテンツの配置と、エンジニアらしさをイメージしたVSCode風の色を使用しています。",
    "imageUrl": "assets/images/Portfolio.png",
    "tags": [
      "React",
      "TailwindCSS",
      "Github"
    ],
    "links": [
      {
        "label": "ポートフォリオサイト",
        "url": "https://nemesis62542.github.io/nemesis-portfolio/"
      }
    ],
    "images": [
      "assets/images/Portfolio.png"
    ],
    "videos": [],
    "thumbnailUrl": "assets/images/Portfolio.png"
  }
];