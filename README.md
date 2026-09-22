# Nemesis Portfolio

ゲームクリエイター Nemesis のポートフォリオサイト。

公開URL: https://nemesis62542.github.io/nemesis-portfolio/

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## コンテンツの編集

Projects / Blog の記事は `content/projects/*.md` と `content/blog/*.md` にあります。
書き方や仕組みは [docs/作業メモ.md](docs/作業メモ.md) を参照してください。

## Deploy

main に push すると GitHub Actions が自動でビルドして GitHub Pages に公開します。
手動で公開する場合は `npm run build` の後に `npm run deploy` を実行します。
