# PROJECT_CONTEXT.md — プロジェクトの全体像

> **新しい会話を始めたAIエージェントへ：**
> このファイルを読めば、プロジェクトの全体像を把握できます。
> 合わせて `CONTRIBUTING.md` も必ず読んでください。

---

## プロジェクト概要

**佐賀県農業法人協会** の会員紹介サイト。
農業法人同士のつながりを促進し、入会案内・会員一覧を提供する静的サイト。

- **公開URL**: https://i8ei.github.io/sanoukai-members/
- **リポジトリ**: https://github.com/i8ei/sanoukai-members
- **デプロイ**: `main` に push → GitHub Actions 自動ビルド → `gh-pages` に公開

---

## 技術スタック

| 項目           | 技術                                     |
| :------------- | :--------------------------------------- |
| フレームワーク | **Astro** v5                             |
| スタイル       | **Tailwind CSS** v3                      |
| ホスティング   | **GitHub Pages** (`gh-pages` ブランチ)   |
| CI/CD          | **GitHub Actions** (`deploy.yml`)        |
| データ         | `/src/lib/members.ts` から JSON 読み込み |
| ビルド出力     | `/dist/`                                 |

---

## ファイル構成

```
src/
├── components/
│   ├── Badge.astro          # バッジ（販路チャネル表示）
│   └── MemberCard.astro     # 会員カード
├── layouts/
│   └── BaseLayout.astro     # 共通レイアウト（ヘッダー・フッター・ナビ）
├── lib/
│   └── members.ts           # 会員データの読み込み・ユーティリティ
├── pages/
│   ├── index.astro          # 🏠 トップページ（Hero + 協会紹介）
│   ├── join/index.astro     # 📝 会員募集ページ
│   ├── members/index.astro  # 📋 会員一覧
│   ├── members/[slug].astro # 👤 個別会員ページ
│   ├── supporters/index.astro # 🏢 賛助会員一覧
│   ├── about/index.astro    # ℹ️ 協会について
│   └── api/                 # API エンドポイント
└── styles/
    └── global.css           # グローバルスタイル（hero, アニメーション等）

tailwind.config.mjs          # カラーパレット・シャドウ・アニメーション定義
astro.config.mjs             # site: i8ei.github.io, base: /sanoukai-members
public/images/hero-bg.png    # Hero背景（AI生成の棚田水彩画）
```

---

## デザイン方針

- **プレミアム感**: グラスモーフィズム（ヘッダー半透明＋ブラー）、リッチなシャドウ
- **カラーパレット**: 農業をイメージした緑（`brand` #2D6A4F）＋ 金（`sun` #E7A83A）＋ アース系
- **Hero**: AI生成の棚田水彩画を背景に、半透明グラデーションオーバーレイ
- **アニメーション**:
  - ページロード時: `fade-in-up` CSS アニメーション
  - スクロール時: Intersection Observer による `data-animate` → `is-visible`
- **可読性重視**: 本文は `text-base`（16px）以上、`ink-soft` は `#3D4A2A`（高コントラスト）

---

## よく使うコマンド

```bash
npm run dev       # ローカル開発サーバー (localhost:4321)
npm run build     # 本番ビルド
npm run ci        # CI（validate + build + URL check）
npm run preview   # ビルド結果のプレビュー
```

---

## 運用上の注意

1. **複数のAIエージェントが同時作業しています** — 必ず `CONTRIBUTING.md` を読むこと
2. **`main` push → 自動デプロイ** — CHANGELOG 自動更新もあるため push 後にリモートが進む
3. **`base: '/sanoukai-members'` が設定済み** — リンクの `href` は `${BASE}path/` の形式で書くこと
4. **会員データ（JSONファイル）は Python スクリプトで同期管理** — 手動編集しない
