# member_site_astro

Astro + Tailwind で構築した会員紹介サイトのスキャフォールドです。

## セットアップ

```bash
cd member_site_astro
npm install
```

## 開発

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## データ更新について

- 会員データは `../members.generated.json` を参照します。
- この JSON の `.members` 配列をページ生成に使用します。
- 内容を更新した場合は再ビルドしてください。

## 内部運用ドキュメント

- 事務局運用ガイド: `docs/INTERNAL_OPERATIONS.md`
- 事務局メールテンプレ: `事務局テンプレ.md`

※ 上記は運用用ファイルです（公開ページには表示しません）。
