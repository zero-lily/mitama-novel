# みたまノベル - ティザーサイト

ノベルゲーム「みたまノベル」の公式ティザーサイトです。

## 構成

- **index.html** - メインのHTMLファイル
- **style.css** - カスタムスタイルシート
- **main.js** - JavaScript機能（スクロールアニメ、データ読み込み等）
- **data/** - JSONデータファイル
  - `news.json` - ニュース情報
  - `characters.json` - キャラクター情報
  - `gallery.json` - ギャラリー画像情報
- **assets/** - 画像・音声・その他リソース
  - `images/` - 画像ファイル
  - `audio/` - 音声ファイル

## 技術スタック

- **HTML5** - マークアップ
- **Tailwind CSS (CDN)** - スタイリング
- **Vanilla JavaScript** - インタラクティブ機能
- **JSON** - データ管理

## ローカルでの確認方法

1. このリポジトリをクローンまたはダウンロード
2. ローカルサーバーを起動（例：Python）
   ```bash
   # Python 3の場合
   python -m http.server 8000
   
   # Node.jsの場合（http-serverを使用）
   npx http-server
   ```
3. ブラウザで `http://localhost:8000` にアクセス

## GitHub Pagesでのデプロイ方法

### 1. GitHubリポジトリの作成

1. GitHubにログイン
2. 新しいリポジトリを作成（リポジトリ名：`mitama-novel`）
3. リポジトリをPublicに設定（GitHub Pagesの無料版を使用するため）

### 2. ファイルのアップロード

```bash
# Gitでリポジトリを初期化
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/mitama-novel.git
git push -u origin main
```

または、GitHubのWebインターフェースから直接ファイルをアップロードすることも可能です。

### 3. GitHub Pagesの有効化

1. リポジトリの **Settings** タブを開く
2. 左メニューから **Pages** を選択
3. **Source** で **Deploy from a branch** を選択
4. **Branch** で `main` を選択し、`/ (root)` を選択
5. **Save** をクリック

### 4. サイトの公開

数分待つと、以下のURLでサイトが公開されます：
```
https://your-username.github.io/mitama-novel/
```

## コンテンツの更新方法

### ニュースの更新

`data/news.json` を編集します。新しいニュースは配列の先頭に追加してください。

```json
[
  {
    "date": "2025.12.15",
    "title": "新しいニュースタイトル",
    "content": "ニュースの内容"
  },
  ...
]
```

### キャラクター情報の更新

`data/characters.json` を編集します。

```json
[
  {
    "name": "キャラクター名",
    "description": "キャラクターの説明",
    "image": "assets/images/characters/character-name.png",
    "voice": "assets/audio/voice-file.ogg"
  }
]
```

### ギャラリーの更新

`data/gallery.json` を編集します。

```json
[
  {
    "title": "画像タイトル",
    "thumbnail": "assets/images/gallery/thumb-1.jpg",
    "image": "assets/images/gallery/full-1.jpg"
  }
]
```

### 画像・音声ファイルの追加

1. 画像ファイルを `assets/images/` の適切なサブディレクトリに配置
2. 音声ファイルを `assets/audio/` に配置
3. JSONファイルでパスを更新

## カスタマイズ

### カラーテーマの変更

`style.css` の `:root` セクションでカラー変数を変更できます：

```css
:root {
  --primary-color: #9333ea;    /* メインカラー */
  --primary-dark: #7e22ce;     /* ダークバージョン */
  --secondary-color: #a855f7; /* セカンダリカラー */
  --accent-color: #c084fc;     /* アクセントカラー */
}
```

### タイトル・ロゴの変更

`index.html` の以下の部分を編集：

```html
<div class="text-2xl font-bold">みたまノベル</div>
```

### OGP画像の設定

1. OGP用の画像（1200x630px推奨）を `assets/images/og-image.jpg` として配置
2. `index.html` のOGPメタタグのURLを更新：

```html
<meta property="og:image" content="https://your-username.github.io/mitama-novel/assets/images/og-image.jpg">
```

## 注意事項

- 画像ファイルは適切に最適化（WebP形式推奨）してからアップロードしてください
- 音声ファイルはOGG形式またはMP3形式を使用してください
- 大きなファイルはGitHubの制限（100MB）に注意してください
- カスタムドメインを使用する場合は、リポジトリのSettings > Pagesで設定できます

## ライセンス

このプロジェクトは開発中のものです。素材・情報等はすべて開発中のものであり、予告なく変更される場合がございます。

