# デザインアップグレード変更履歴

- **実施日**: 2026-02-21
- **対象**: `member_site_astro`（会員紹介サイト）
- **方針**: 農業法人協会らしい明るく力強い、大地に根ざしたデザインへ刷新。ダークモードなし。スマホ対応強化。全テキスト文言は変更なし。

---

## 変更概要

| 区分 | 変更前 | 変更後 |
|------|--------|--------|
| 配色 | 薄いグレー背景 (`#F7F6F3`)、紫ブランド (`#5B21B6`) | 温かみのあるベージュ (`#FAF8F2`)、深緑ブランド (`#2D6A4F`) |
| フォント | ブラウザデフォルト | Noto Sans JP (Google Fonts) |
| ヘッダー | テキストのみ、固定なし | 🌾ロゴ付き、sticky、モバイルハンバーガーメニュー |
| フッター | なし | ダークグリーンのフッター（ナビ + コピーライト） |
| トップページ | テキストのみのカード | CSS グラデーション ヒーローセクション + 色分けされた特徴カード |
| 会員一覧 | プレーンな見出し | グラデーション バナーヘッダー + 掲載数バッジ |
| 会員カード | 白背景のみ | 左緑アクセントボーダー + エリア色ドット + ホバーアニメーション |
| 会員詳細 | 統一的な白カード | グラデーントヘッダー + セクション別アイコン + アクセントボーダー |
| アニメーション | hover で微上昇のみ | fade-in-up / fade-in / slide-in + stagger + shadow 変化 |
| レスポンシブ | 基本対応 | ハンバーガーメニュー + max-w-6xl + 細かい余白調整 |

---

## 変更ファイル詳細

### 1. `tailwind.config.mjs` — デザイントークン

```diff
 colors:
-  bg: '#F7F6F3'
-  brand: '#5B21B6'
+  bg: '#FAF8F2'
+  brand: '#2D6A4F'（深緑）
+  brand-light: '#40916C'
+  brand-dark: '#1B4332'
+  accent: '#C45D3E'（テラコッタ）
+  leaf: '#40916C' + light / pale バリエーション
+  sun: '#E7A83A' + light / pale バリエーション
+  earth: '#8B7355' + light / pale バリエーション
+  ink: '#2C3315'（暗い抹茶系）
```

追加項目:
- `fontFamily.sans` — Noto Sans JP
- `backgroundImage` — ヒーロー・セクション用グラデーション 5 種
- `keyframes` / `animation` — fade-in-up, fade-in, slide-in
- `boxShadow` — card-hover, hero

---

### 2. `src/styles/global.css` — 共通スタイル

追加内容:
- Google Fonts `@import` (Noto Sans JP)
- `.hero-section` — 多層グラデーション背景 + SVG リーフパターン疑似要素
- `.card-interactive` — ホバー時に shadow + translate 変化
- `.section-divider` — セクション間の緑グラデーション区切り線
- `.stagger-1` 〜 `.stagger-5` — アニメーション遅延
- `.mobile-nav` / `.mobile-nav.is-open` — モバイルナビ オーバーレイ
- `.accent-border-leaf / sun / water / brand` — 左アクセントボーダー 4 色
- `.area-dot-west / central / east / default` — エリア色ドットインジケーター

---

### 3. `src/layouts/BaseLayout.astro` — 共通レイアウト

| 要素 | 変更 |
|------|------|
| `<head>` | OGP メタタグ (`og:title`, `og:description`, `og:type`) 追加 |
| ヘッダー | sticky + backdrop-blur、🌾ブランドアイコン、hover 効果付きナビリンク |
| モバイルナビ | ハンバーガーボタン (sm 以下のみ表示) + フルスクリーン オーバーレイ |
| フッター | 新規追加。`brand-dark` 背景、ロゴ + ナビ + コピーライト |
| `<script>` | モバイルナビの開閉制御 JS |
| `max-w` | 5xl → 6xl |

---

### 4. `src/pages/index.astro` — トップページ

| セクション | 変更 |
|------------|------|
| ヒーロー | 新規。`.hero-section` 全幅グラデーション背景。英語サブタイトル + 白テキスト + CTA ボタン |
| 特徴カード 3 枚 | アイコンバッジ (🌾🌱🚚) 付き、色別左アクセントボーダー (leaf/sun/water) |
| 更新情報 | 色付きピル型バッジ (緑: 法人数、黄: 更新日時) |
| おすすめ会員 | ⭐ アイコン付き見出し、ホバーで shadow + translate |
| 協会情報 | 🏛️ アイコン、`section-green` 背景 |
| お問い合わせ | ✉️ アイコン |

---

### 5. `src/pages/members/index.astro` — 会員一覧

- ページ上部にグラデーション バナー (`brand-dark → brand → leaf`) + SVG パターン装飾
- `{members.length} 法人を掲載中` ピルバッジ

---

### 6. `src/pages/members/[id].astro` — 会員詳細

| セクション | 変更 |
|------------|------|
| ヘッダー | グラデーション背景カード (`brand-dark` → `leaf`)、ドットパターン装飾 |
| 概要 4 枚タイル | `bg-white/10 backdrop-blur-sm` ガラス効果 |
| 基本情報 | 📋 アイコン + `accent-border-brand` + `bg-bg-soft` タイル |
| 生産 | 🌱 アイコン + `accent-border-leaf` + hover 効果 |
| 販売 | 🛒 アイコン + `accent-border-sun` |
| 補足メモ | 📝 アイコン + `accent-border-water` |
| 戻るリンク | ボタンスタイル (`bg-brand` 角丸 + ホバー効果) |

---

### 7. `src/components/MemberCard.astro`

- `.accent-border-leaf` 左緑ボーダー
- `.card-interactive` ホバーアニメーション (shadow + translate)
- `.area-dot` エリア色ドット (西部=赤、中部=緑、東部=青)
- group hover でタイトルがブランド色に変化

---

### 8. `src/components/Badge.astro`

- パディング拡大 (`px-2.5 py-1` → `px-3 py-1`)
- `tracking-wide` 追加
- neutral トーンを `earth-pale` ベースに変更

---

## カラーパレット

```
brand     #2D6A4F  ██  深い森の緑（メインカラー）
brand-lt  #40916C  ██  明るい緑
brand-dk  #1B4332  ██  濃い緑（フッター）
leaf      #40916C  ██  葉の緑
leaf-pale #D8F3DC  ██  淡い緑（背景）
sun       #E7A83A  ██  太陽の黄金
sun-pale  #FFF8E7  ██  淡い黄（背景）
soil      #8B6914  ██  土
earth     #8B7355  ██  大地
accent    #C45D3E  ██  テラコッタ（エリアドット西部）
water     #2F6F8F  ██  水
bg        #FAF8F2  ██  温かいベージュ（ページ背景）
ink       #2C3315  ██  暗い抹茶（テキスト）
```

---

## 注意事項

- **文言は一切変更していません**。HTML テンプレート内のテキストはすべて元のまま。
- `members.ts`（データ読み込みロジック）は変更なし。
- `astro.config.mjs` は変更なし (`base: '/sanoukai-members'`)。
- 画像アセットは未使用（CSS グラデーション + SVG パターンで代替）。
  将来的にヒーロー画像を追加する場合は `src/assets/hero.webp` に配置し、
  `index.astro` の `.hero-section` に `background-image` を追加してください。
