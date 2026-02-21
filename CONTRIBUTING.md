# sanoukai-members 協働ルール（AI Agent 向け）

このリポジトリは **複数のAIエージェント** が同時に作業する可能性があります。
衝突を防ぐため、以下のルールを **必ず** 守ってください。

---

## 🚨 最重要ルール：作業開始前に必ず同期する

**他のエージェントが変更を加えている可能性があります。**
作業を始める前に、**必ず以下のコマンドを実行**してローカルを最新状態にしてください。

```bash
# 作業開始時に毎回実行すること（省略禁止）
git fetch --all
git switch main
git pull --rebase origin main
npm install  # 依存関係が変わっている可能性あり
```

> ⚠️ **このステップを省略すると、古いコードの上に作業することになり、
> 他のエージェントの変更を上書きしてしまいます。**
> 実際にこの問題が発生し、デザイン改善が丸ごと消えた事故がありました。

---

## 1. ブランチ戦略

| 目的                   | ブランチ名        | 例                    |
| :--------------------- | :---------------- | :-------------------- |
| 本番公開               | `main`            | —                     |
| 機能開発・デザイン変更 | `mac/<短い説明>`  | `mac/hero-redesign`   |
| データ同期             | `sync/<短い説明>` | `sync/members-update` |

### ルール

- **`main` に直接コミットしない**。必ず作業ブランチで作業し、マージする
- ブランチ名は `<担当者または端末>/内容` の形式にする
- 短期ブランチ（マージ後不要になるもの）はマージ後に削除する

---

## 2. main へのマージ・Push 手順

`main` にマージする前に、必ず以下を実行してください：

```bash
# 1. 最新を取得
git fetch origin main

# 2. main に切り替え
git switch main

# 3. リモートの最新を反映
git pull --rebase origin main

# 4. 作業ブランチをマージ
git merge <作業ブランチ>

# 5. ビルド確認（必須）
npm run build

# 6. Push
git push origin main
```

### push が rejected された場合

```bash
# NG: git push --force（絶対に使わない）
# OK: 以下の手順で再取得してリトライ
git pull --rebase origin main
git push origin main
```

> ⚠️ `git pull --rebase` 時にコンフリクトが発生した場合は、
> 自分の変更が消えていないか **必ず確認** してから `git push` すること。

---

## 3. 自動処理の理解

`main` に push すると GitHub Actions が以下を **自動実行** します：

1. `npm run ci` — テスト＆検証
2. `sync:websites` — データ同期
3. `CHANGELOG.md` の自動更新（コミット＆push が発生する場合あり）
4. `dist/` のビルド → `gh-pages` ブランチへデプロイ
5. https://i8ei.github.io/sanoukai-members/ に公開

### 注意点

- **CHANGELOG の自動コミットにより、push 直後にリモートが 1 コミット先に進む**
- そのため、連続して push する場合は毎回 `git pull --rebase` が必要
- `[skip ci]` をコミットメッセージに含めるとデプロイをスキップできる

---

## 4. コミットメッセージ規約

```
<type>: <日本語で簡潔な説明>
```

| type    | 用途                 |
| :------ | :------------------- |
| `feat`  | 新機能・デザイン変更 |
| `fix`   | バグ修正             |
| `chore` | 設定変更・依存更新   |
| `sync`  | データ同期           |
| `docs`  | ドキュメント更新     |

例：

- `feat: Hero背景画像を追加`
- `sync: 会員データ更新`
- `fix: スマホ表示の文字サイズ修正`

---

## 5. ファイル所有権（衝突しやすいファイル）

以下のファイルは **複数エージェントが同時に編集すると衝突しやすい** ファイルです。
編集前にかならず `git pull` で最新化してください。

| ファイル                       | 役割                             |
| :----------------------------- | :------------------------------- |
| `src/pages/index.astro`        | トップページ                     |
| `src/layouts/BaseLayout.astro` | 共通レイアウト                   |
| `src/styles/global.css`        | グローバルスタイル               |
| `tailwind.config.mjs`          | デザイントークン                 |
| `src/pages/join/index.astro`   | 会員募集ページ                   |
| `CHANGELOG.md`                 | 自動更新されるため手動編集しない |

---

## 6. やってはいけないこと

- ❌ `main` への `git push --force`
- ❌ `CHANGELOG.md` の手動編集（自動更新と衝突する）
- ❌ `gh-pages` ブランチへの直接 push（Actions に任せる）
- ❌ `npm run build` を確認せずに main へマージ
- ❌ コンフリクト解消後に変更内容を確認せずに push
