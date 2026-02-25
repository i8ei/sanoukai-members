# フォーム回答をサイトに反映する手順

フォームで修正依頼が来たときに、JSONを直接編集してサイトに反映するための手引き。

---

## 基本の流れ

```
1. Googleスプレッドシートで回答内容を確認
2. data/members.generated.json を開く
3. 該当の会員を検索（法人名で Cmd+F）
4. 該当箇所を修正
5. git commit & push
```

---

## data/members.generated.json の構造

会員1社分のデータ例：

```json
{
  "id": "minori-farm1961",          // ← 変更不要（URLに使われる）
  "name": "有限会社みのり農場",      // ← 正式な法人名
  "name_short": "みのり農場",        // ← 略称（カード表示に使われる）
  "entity_type": "有限会社",         // ← 法人種別

  "location": {
    "postal_code": null,             // ← 郵便番号（例: "849-5131"）
    "address": "佐賀県唐津市...",    // ← 住所
    "city": "唐津市"                 // ← 市区町村のみ
  },

  "contact": {
    "representative": "麻生茂幸",   // ← 代表者名
    "phone": "0955-56-6802"         // ← 電話番号
  },

  "business": {
    "summary": "",                   // ← 事業概要（一言説明）
    "established": "1963年4月"       // ← 設立年
  },

  "products": [
    {
      "category": "鶏卵",            // ← 品目カテゴリ
      "name": "平飼い卵「やさしい卵」", // ← 商品名
      "description": "説明文..."     // ← 商品の説明
    }
    // 複数商品は { } をカンマで並べる
  ],

  "sales_channels": [
    "EC",
    "スーパー",
    "直売所"
    // 販路をリストで列挙
  ],

  "web_presence": {
    "website": "https://example.com" // ← 公式サイトURL
  }
}
```

---

## よくある修正パターン

### 代表者が変わった
```json
"contact": {
  "representative": "新しい代表者名",  // ← ここを変更
  "phone": "..."
}
```

### 住所が変わった
```json
"location": {
  "address": "新しい住所をフルで入力",
  "city": "市区町村名"  // ← 住所から市区町村だけ抜き出して入力
}
```

### 公式サイトURLが変わった・追加された
```json
"web_presence": {
  "website": "https://新しいURL"  // ← https:// を忘れずに
}
```

### 電話番号が変わった
```json
"contact": {
  "phone": "新しい電話番号"
}
```

### 事業概要を追加したい
```json
"business": {
  "summary": "一言で事業内容を説明するテキストを入れる"
}
```

### 販路を追加・変更したい
```json
"sales_channels": ["直売所", "EC", "スーパー"]
// 使える選択肢の例: 直売所, EC, スーパー, 道の駅, 外食, 卸売, 学校給食
```

---

## 編集後の手順

```bash
# 1. ターミナルでプロジェクトフォルダに移動
cd /Users/issei/antigravity/spaces/sanoukai-members

# 2. 最新の状態に更新
git pull --rebase origin main

# 3. ビルドが通るか確認
npm run build

# 4. コミット（「〇〇の情報を更新」など内容を書く）
git add data/members.generated.json
git commit -m "fix: 〇〇の代表者・住所を更新"

# 5. プッシュ（自動でサイトに反映される）
git push origin main
```

反映まで2〜3分かかる。

---

## 注意事項

- JSON はカンマや括弧のミスで壊れる。編集後は `npm run build` でエラーが出ないか必ず確認する
- `"id"` は絶対に変更しない（URLが壊れる）
- `null` は「情報なし」を意味する。削除しないこと
- `lat`（緯度）と `lng`（経度）は変更不要（地図の位置情報）
