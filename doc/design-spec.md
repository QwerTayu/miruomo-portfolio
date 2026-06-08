# miruomo.com — ポートフォリオ設計仕様書

> **v2.2** · Astro + React · GitHub Pages → miruomo.com  
> アクセントカラー: `#FF301D` (Film Red)

---

## 目次

1. [フェーズ定義](#1-フェーズ定義)
2. [デザイントークン](#2-デザイントークン)
3. [ページ構成・ルーティング](#3-ページ構成ルーティング)
4. [ワイヤーフレーム](#4-ワイヤーフレーム)
5. [Three.js カメラフロー（Phase 2）](#5-threejs-カメラフローphase-2)
6. [技術スタック](#6-技術スタック)
7. [ディレクトリ構成](#7-ディレクトリ構成)
8. [i18n 方針](#8-i18n-方針)
9. [レスポンシブ方針](#9-レスポンシブ方針)
10. [画像最適化方針](#10-画像最適化方針)
11. [実装手順](#11-実装手順)

---

## 1. フェーズ定義

| フェーズ | スコープ | 目標 |
|---|---|---|
| **Phase 1** | コンテンツ・レイアウト・アニメーション（CSS/GSAP） | MVP として公開できる状態 |
| **Phase 2** | Three.js カメラオブジェクト・i18n 有効化 | 差し替え・追加のみで完結する |

### Phase 1 でやること

- NavBar（スティッキー）
- Hero / About / Works / Timeline / Articles の全セクション
- CSS スクロールアニメーション（Intersection Observer + CSS Transition）
- Works カード一覧（Astro Content Collections）
- Works カード → クリックでモーダル表示（Markdown 詳細記事）
- About スキルバー（GitHub API ビルド時 fetch + 手動スキル）
- Zenn API からの Articles 取得（ビルド時 fetch）
- i18n の**骨格だけ**仕込む（文言ファイル・ルーティング定義・言語スイッチUI。実際の翻訳は Phase 2）

### Phase 2 でやること

- Three.js CameraScene コンポーネントを差し込む（Hero 右上 + Works トランジション）
- GSAP ScrollTrigger を有効化
- i18n の翻訳テキストを埋める・`/en/` ルート有効化
- パフォーマンスチューニング・モバイルフォールバック

### 差し替えを容易にするための設計方針

Three.js を後から差し込めるよう、Hero と Works に**プレースホルダーコンポーネント**を置く。

```astro
<!-- Hero.astro -->
<!-- Phase 1: プレースホルダー -->
<div id="camera-mount" class="camera-placeholder" aria-hidden="true">
  <!-- Phase 2: <CameraScene client:only="react" /> に差し替え -->
</div>
```

```css
/* Phase 1 は CSS で代替演出 */
.camera-placeholder {
  width: 80px;
  height: 56px;
  border: 1.5px solid #FF301D;
  border-radius: 6px;
  opacity: 0.4;
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
```

---

## 2. デザイントークン

### カラー

```css
:root {
  --color-ink:     #1A1714;  /* 背景（ダーク） */
  --color-ink-2:   #3D3A36;  /* 本文テキスト */
  --color-ink-3:   #7A756E;  /* 補助テキスト */
  --color-accent:  #FF301D;  /* Film Red — アクセント全般 */
  --color-accent-d:#CC2010;  /* ホバー・影 */
  --color-paper:   #F7F4EF;  /* ライトセクション背景 */
  --color-paper-2: #EDE9E2;  /* カード背景・区切り */
  --color-border:  #D8D3CB;  /* ボーダー全般 */
  --color-white:   #FFFFFF;
}
```

### タイポグラフィ

| 用途 | フォント | サイズ / Weight |
|---|---|---|
| 見出し・ロゴ | `DM Serif Display` | 32–56px / 400 |
| ラベル・バッジ・コード | `DM Mono` | 10–13px / 400–500 |
| 本文・UI全般 | `Noto Sans JP` | 13–16px / 300–500 |

```html
<!-- layout.astro に追加 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Noto+Sans+JP:wght@300;400;500&display=swap" rel="stylesheet">
```

### スペーシング・イージング

```css
:root {
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    16px;
  --ease-smooth:  cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 3. ページ構成・ルーティング

### URL ルーティング

| URL | ファイル | Phase | 内容 |
|---|---|---|---|
| `/` | `src/pages/index.astro` | 1 | SPA 本体（全セクション） |
| `/en/` | `src/pages/en/index.astro` | 2 | 英語版（i18n 有効化後） |

> **方針:** ブログは外部（Zenn / Qiita）リンクのみ。記事詳細ページは持たない。

### セクション構成（SPA 内アンカー）

| アンカー | セクション名 | Phase | 備考 |
|---|---|---|---|
| `#hero` | Hero | 1 | Three.js mount point を仕込む |
| `#about` | About | 1 | GitHub API スキルバー |
| `#works` | Works | 1 | Content Collections・モーダル・暗転 mount point を仕込む |
| `#timeline` | Timeline | 1 | `doc/timeline.json` より |
| `#articles` | Articles | 1 | Zenn API ビルド時 fetch |

---

## 4. ワイヤーフレーム

### NavBar

```
┌─────────────────────────────────────────────────────────────────┐
│  miruomo.com         Hero  About  [Works]  Timeline  Articles  JA│
│                                    ────                           │
└─────────────────────────────────────────────────────────────────┘
  ↑ロゴ (#FF301D)               ↑active = #FF301D アンダーライン
  transparent → #141210 (scroll 40px超)
  モバイル: ハンバーガーメニュー
```

---

### Hero セクション

```
┌──────────────────────────────────────────────────────────────────┐  ↑
│  [NavBar]                              ┌──────────────────────┐  │
│                                        │  📷 camera-mount     │  │
│                                        │  (Phase1: CSS枠線)   │  │
│  miruomo.com                           │  (Phase2: Three.js)  │  │
│  ─────────────────────────────         └──────────────────────┘  │
│  SOFTWARE ENGINEER                                               │ 100vh
│  Akashi KOSEN → Nagaoka University of Technology                 │
│                                                                  │
│  [Works を見る →]    [About me]                                  │
│   ↑ #FF301D 塗り      ↑ ボーダーのみ                             │
│                                                                  │
│                         scroll ↓                                 │  ↓
└──────────────────────────────────────────────────────────────────┘
bg: #1A1714 + film grain (CSS noise)
```

---

### About セクション

```
PC (≥768px)
┌─────────────────────────────────────────────────────────────────┐
│  ABOUT                                                          │
│  About me                                                       │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  ┌──────────┐   SKILLS (GitHub API ビルド時取得 + 手動)          │
│  │          │   TypeScript  ████████░░  xx%  ← GitHub API       │
│  │  photo   │   JavaScript  ███████░░░  xx%  ← GitHub API       │
│  │  avatar  │   ...上位N言語...                                  │
│  │          │   Figma       ████░░░░░░  手動                     │
│  └──────────┘   AtCoder     ████░░░░░░  手動                     │
│  miruomo.com                                                    │
│  明石高専 → 長岡技科大  INTERESTS                                │
│                   [Photography] [Truck Camping] [NUTMEG]        │
│                   [Robocon]     [AtCoder]                       │
└─────────────────────────────────────────────────────────────────┘

Mobile (≤767px): 1カラム・センター寄せ
```

#### GitHub言語割合の取得方針

- **タイミング:** ビルド時（Astro フロントマター内で fetch）
- **更新:** GitHub Actions の週次 cron（毎週日曜 09:00 JST）で自動再ビルド
- **トークン:** `GITHUB_LANG_TOKEN`（Fine-grained PAT: Metadata Read-only）
  - サーバーサイドのみ使用 → ブラウザに漏れない
  - GitHub Actions Secrets に登録
- **処理:** owner リポジトリ（fork 除く）の言語バイト数を集計 → 割合変換 → 上位 N 件
- **手動スキル:** `src/data/skills.ts` に Figma・AtCoder 等を定義し、API 結果とマージ

---

### Works セクション（Phase 1）

Phase 1 では Three.js トランジションなし。シンプルなフェードインで表示。

```
┌─────────────────────────────────────────────────────────────────┐
│  WORKS                                                           │
│  Works                                                           │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  ┌───────────────────────┐  ┌───────────────────────┐          │
│  │  Project Name          │  │  Project Name          │          │
│  │  ─────────────────    │  │  ─────────────────    │          │
│  │  概要テキスト...        │  │  概要テキスト...        │          │
│  │                        │  │                        │          │
│  │  [React] [Three.js]    │  │  [Next.js] [TypeScript]│          │
│  │                        │  │                        │          │
│  │  GitHub →   Demo →     │  │  GitHub →   Demo →     │          │
│  └───────────────────────┘  └───────────────────────┘          │
│        ↑ hover: translateY(-4px) + #FF301D ボーダー             │
│        ↑ click: モーダルで詳細記事を表示                         │
└─────────────────────────────────────────────────────────────────┘
bg: #F7F4EF  2列グリッド (mobile: 1列)

<!-- Phase 2 差し替えポイント -->
<!-- Works 入口に Three.js 暗転トランジション追加 -->
```

#### Works モーダル

カードクリックで詳細モーダルを開く。モーダル内コンテンツは Markdown から生成。

```
┌────────────────────────────────────────────────┐
│  [×]                                           │
│  Project Name                                  │
│  ─────────────────────────────────────────    │
│  ## サービス概要                               │
│  ○○○○○○...                                    │
│  ## 使用技術                                   │
│  | 技術 | 用途 |                              │
│  | ... | ... |                               │
│  ## 開発の思い                                 │
│  ○○○○○○...                                    │
│  [スクリーンショット]                           │
│                          GitHub →  Demo →     │
└────────────────────────────────────────────────┘
```

#### Works データ構造（Astro Content Collections）

コンテンツは `src/content/works/{id}/` 以下で管理する。`src/data/works.ts` は使用しない。

```
src/content/
  works/
    tercet/
      index.md        ← frontmatter（カードデータ）+ 本文（モーダル記事）
      figures/
        hero.png
        screenshot1.png
```

```markdown
---
title: "TERCET"
description: "3秒動画ログアプリ"
tags: ["Next.js", "TypeScript", "PWA"]
github: "https://github.com/QwerTayu/tercet"
demo: null
year: 2024
featured: true
cover: "./figures/hero.png"
---

## サービス概要
...

## 使用技術
...

## 開発の思い
...
```

スキーマは `src/content/config.ts` に Zod で定義する。

---

### Works セクション — Phase 2 トランジション（Three.js）

```
① フォーカスモード          ② 極限ズーム               ③ Works 出現
┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│                   │   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │   │  WORKS            │
│      WORKS        │   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │   │                   │
│                   │   │ ▓▓▓  背面パネル  ▓ │   │  ┌──────┐┌──────┐│
│    ┌────────┐     │   │ ▓▓▓  が画面を   ▓ │   │  │ card ││ card ││
│    │ 📷 大  │     │   │ ▓▓▓  埋め尽くす ▓ │   │  └──────┘└──────┘│
│    │ 中央   │     │   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │   │  ┌──────┐┌──────┐│
│    └────────┘     │   │ canvas opacity→0 │   │  │ card ││ card ││
│  スクロール連動   │   │ 暗転色: #0D0C0B  │   │  └──────┘└──────┘│
│  Y軸 0→180° 回転  │   │                   │   │ grayscale→color  │
└───────────────────┘   └───────────────────┘   └───────────────────┘
  ScrollTrigger scrub      canvas フェードアウト   stagger 100ms
```

---

### Timeline セクション

実データは `doc/timeline.json` を参照。

```
PC: 左右交互レイアウト
┌─────────────────────────────────────────────────────────────────┐
│  TIMELINE                                                        │
│  経歴                                                            │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  ┌──────────────────┐  │  ●                                     │
│  │ 2021.04          │  │  │  明石高専 入学                       │
│  └──────────────────┘  │  │                                     │
│                         │  ●  ┌──────────────────────────────┐  │
│                         │  │  │ 2022.04〜10  NHK高専ロボコン  │  │
│                         │  │  │             チームリーダー     │  │
│                         │  │  └──────────────────────────────┘  │
│  ┌──────────────────┐  │  ●                                     │
│  │ 2024.06          │  │  │  Growth Verse インターン             │
│  └──────────────────┘  │  │                                     │
│                         │  ●  ┌──────────────────────────────┐  │
│                         │     │ 2026.04  長岡技科大 入学       │  │
│                         │     └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
縦線色: #D8D3CB  ●ドット: #FF301D
dateEnd があるエントリは「YYYY.MM〜MM」形式で表示
スクロールで translateY(20px)→0 + opacity:0→1

Mobile: 1カラム・縦線左寄せ
```

---

### Articles セクション

```
┌─────────────────────────────────────────────────────────────────┐
│  ARTICLES                                                        │
│  Articles                                                        │
│  ───────────────────────────────────────────────────────────    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  記事タイトル ○○○○○○○○○○                    Zenn  →  │   │
│  │  2024.11.01                                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  記事タイトル ○○○○○○○○○○                   Qiita  →  │   │
│  │  2024.09.15                                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│                      Zenn でもっと見る →                         │
└─────────────────────────────────────────────────────────────────┘
データ: Zenn API（username: tayu99_make）ビルド時 fetch
外部リンクのみ / 記事詳細ページは持たない
```

---

## 5. Three.js カメラフロー（Phase 2）

### カメラオブジェクトのモード遷移

```
[ページ読み込み]
      │
      ▼
┌─────────────────────┐        gsap + ScrollTrigger 登録
│  Mode A: 浮遊モード  │        canvas: position:fixed, z-index:10
│                      │ ←──── size: ~60px / 右上固定
│  Hero / About /      │        rotation.y += 0.003/frame
│  Timeline / Articles │        position.y = scrollY × 0.02
└──────────┬───────────┘
           │ #works が近づく
           ▼
┌─────────────────────┐        scrub: 1.5（スクロール連動）
│  Mode B: フォーカス  │        gsap.to(mesh.position, { x:0, y:0 })
│                      │ ←──── gsap.to(mesh.scale,    { x:4, y:4, z:4 })
│  中央移動・拡大       │        gsap.to(mesh.rotation, { y: Math.PI })
│  Y軸 0 → 180° 回転  │
└──────────┬───────────┘
           │ 背面パネルが画面端を覆う
           ▼
┌─────────────────────┐        canvas opacity → 0
│  Mode C: 暗転        │        works-html opacity: 0 → 1
│                      │ ←──── 暗転色: #0D0C0B
│  極限ズームイン       │
│  canvas フェードアウト│
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐        Three.js canvas は非表示
│  Works 一覧表示      │        Works は純 HTML + CSS
│  (HTML コンテンツ)   │ ←──── filter: grayscale(1)→0
│                      │        stagger: 100ms
└──────────┬───────────┘
           │ Works 末尾
           ▼
┌─────────────────────┐        Mode B の逆再生
│  Mode D: 復帰        │        canvas opacity → 1
│                      │        カメラ縮小・右上へ
│  浮遊モードへ戻る    │ ──────→ Mode A
└─────────────────────┘
```

### 実装スニペット（Phase 2 参考）

```ts
// src/components/three/CameraScene.tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#works',
    start:   'top 80%',
    end:     'top 20%',
    scrub:   1.5,
  }
});

tl.to(cameraObj.position, { x: 0, y: 0, z: 2 })
  .to(cameraObj.scale,    { x: 4, y: 4, z: 4 }, '<')
  .to(cameraObj.rotation, { y: Math.PI },        '<')
  .to(canvas,             { opacity: 0 })
  .to(worksEl,            { opacity: 1 },        '<');
```

> **スマホ対応:** `matchMedia('(max-width: 768px)')` で回転を省略し、スケール＋フェードにフォールバック。  
> `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` 必須。

---

## 6. 技術スタック

### Phase 1

| レイヤー | ライブラリ / ツール | 用途 |
|---|---|---|
| フレームワーク | `Astro 6.x` | 静的サイト生成・ルーティング |
| UIコンポーネント | `React 18` | インタラクティブ箇所（Islands） |
| コンテンツ管理 | Astro Content Collections | Works 記事管理（Markdown + Zod スキーマ） |
| スクロールアニメ | `GSAP` (without ScrollTrigger) | フェードイン・スライドイン |
| スタイリング | `CSS Modules` | スコープ付きスタイル |
| スキルデータ | GitHub API（ビルド時 fetch） | 言語割合の自動取得 |
| データ取得 | Zenn API（ビルド時 fetch） | Articles |
| デプロイ | GitHub Pages | `miruomo.com` カスタムドメイン |
| CI/CD | GitHub Actions | push to main + 週次 cron でビルド |

### Phase 2 追加

| レイヤー | ライブラリ / ツール | 用途 |
|---|---|---|
| 3Dレンダリング | `Three.js r165` | カメラオブジェクト |
| スクロール制御 | `GSAP + ScrollTrigger` | 3Dスクロール連動 |
| 3Dモデリング | `MagicaVoxel / Blender` | Leica カメラ → glTF |

---

## 7. ディレクトリ構成

```
miruomo-portfolio/
├── doc/
│   ├── design-spec.md
│   └── timeline.json         # Timeline コンテンツ（実装時に src/data/timeline.ts へ転記）
├── src/
│   ├── pages/
│   │   ├── index.astro           # 日本語SPA (Phase 1)
│   │   └── en/
│   │       └── index.astro       # 英語版 (Phase 2 有効化)
│   ├── content/
│   │   ├── config.ts             # Content Collections スキーマ（Zod）
│   │   └── works/
│   │       ├── tercet/
│   │       │   ├── index.md      # frontmatter + 詳細記事本文
│   │       │   └── figures/      # モーダル内で使う画像
│   │       └── {id}/
│   │           ├── index.md
│   │           └── figures/
│   ├── components/
│   │   ├── three/
│   │   │   ├── CameraScene.tsx   # Phase 2: Three.js + ScrollTrigger
│   │   │   └── camera.glb        # Phase 2: Leica モデル
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Works.tsx         # React Island（カード一覧 + モーダル）
│   │   │   ├── Timeline.astro
│   │   │   └── Articles.astro
│   │   └── ui/
│   │       ├── NavBar.astro
│   │       └── LanguageSwitch.astro
│   ├── data/
│   │   ├── skills.ts             # 手動スキル（Figma, AtCoder 等）
│   │   └── timeline.ts           # Timeline データ（doc/timeline.json から転記）
│   ├── i18n/
│   │   ├── ui.ts                 # Phase 1: 骨格のみ (ja のみ有効)
│   │   ├── ja.ts                 # Phase 1: 日本語テキスト
│   │   └── en.ts                 # Phase 2: 英語テキスト
│   └── styles/
│       └── global.css            # CSS変数・リセット・共通スタイル
├── src/assets/
│   └── about/
│       └── avatar.jpg            # アバター（正方形・500px以上）
└── public/
    ├── icons/                    # SNS アイコン（最適化不要）
    ├── profile.jpg               # ← src/assets/ へ移動予定
    ├── favicon.svg
    └── CNAME
```

---

## 8. i18n 方針

### Phase 1: 骨格を仕込む（有効化はしない）

Astro の i18n 設定をコメントアウト状態で用意し、文言を外部ファイルに切り出しておく。  
コンポーネント内にテキストをハードコードしない。

```ts
// src/i18n/ui.ts
export const languages = {
  ja: '日本語',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

const ui = {
  ja: {
    'nav.hero':     'Hero',
    'nav.about':    'About',
    'nav.works':    'Works',
    'nav.timeline': 'Timeline',
    'nav.articles': 'Articles',
    'hero.name':    'miruomo.com',
    'hero.role':    'SOFTWARE ENGINEER',
    'hero.cta':     'Works を見る',
    'about.title':  'About me',
    'works.title':  'Works',
    // ...
  },
  en: {
    // Phase 2 で追記
  },
} as const;

export function t(lang: Lang, key: keyof typeof ui['ja']): string {
  return ui[lang]?.[key] ?? ui['ja'][key];
}
```

```astro
---
// Phase 1: lang を 'ja' で固定
import { t } from '../i18n/ui';
const lang = 'ja';
---
<h2>{t(lang, 'works.title')}</h2>
```

### Phase 2: 有効化

```js
// astro.config.mjs のコメントを外すだけ
export default defineConfig({
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: { prefixDefaultLocale: false }
  }
});
```

---

## 9. レスポンシブ方針

| ブレークポイント | 対応内容 |
|---|---|
| `≥ 1024px`（PC） | フル機能 · Works 2列 |
| `768–1023px`（タブレット） | Works 2列維持 |
| `≤ 767px`（スマホ） | Works 1列 · Phase 2: 3D回転省略 |

```css
/* global.css */
:root { --cols-works: 2; }
@media (max-width: 767px) { :root { --cols-works: 1; } }
```

---

## 10. 画像最適化方針

### フォルダ別ルール

| 場所 | 用途 | Astro 最適化 |
|---|---|---|
| `src/assets/` | アバターなどコンテンツ非依存の画像 | あり（WebP変換・lazy） |
| `src/content/works/{id}/figures/` | Works モーダル内の画像 | あり（WebP変換・lazy） |
| `public/` | SNSアイコン・favicon（最適化不要） | なし |

### 使い方

通常の `<img>` は使わず、**必ず Astro の `<Image />` コンポーネントを使う**。

```astro
---
import { Image } from 'astro:assets';
import avatar from '../assets/about/avatar.jpg';
---
<Image src={avatar} alt="プロフィール写真" width={500} height={500} />
```

Content Collections 内の画像は frontmatter で `cover: "./figures/hero.png"` のように参照し、スキーマで `image()` 型として定義する。

- **カードサムネイル（cover）は横 600px** に揃えて書き出す
- フォーマットは PNG / JPG どちらでも OK（Astro がビルド時に WebP に変換）

---

## 11. 実装手順

### Phase 1

#### Step 1: 依存パッケージ確認（完了）

```bash
npx astro add react   # @astrojs/react + react + react-dom + astro.config.mjs 更新
npm install gsap
```

#### Step 2: CSS 変数・グローバルスタイル

`src/styles/global.css` にデザイントークン（Section 2 参照）をすべて定義する。  
`src/layouts/layout.astro` の `<head>` でインポート。Google Fonts もここに追加。

#### Step 3: Content Collections スキーマ

`src/content/config.ts` を作成し、Works コレクションのスキーマを Zod で定義する。

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title:       z.string(),
    description: z.string(),
    tags:        z.array(z.string()),
    github:      z.string().url().nullable(),
    demo:        z.string().url().nullable(),
    year:        z.number(),
    featured:    z.boolean().default(false),
    cover:       image().optional(),
  }),
});

export const collections = { works };
```

#### Step 4: i18n 骨格

`src/i18n/ui.ts` を作成（Section 8 のコード参照）。  
この時点では `lang = 'ja'` でハードコードして使う。

#### Step 5: NavBar

実装のポイント:
- `position: sticky; top: 0; z-index: 100`
- scroll イベントで `background` を `transparent → #141210` に切り替え
- Intersection Observer で現在セクションを検出して active クラス付与
- モバイル: ハンバーガーメニュー

#### Step 6: 各セクション実装（順番通り）

1. **Hero** — `#camera-mount` プレースホルダーを置く（CSSで枠線アニメ）
2. **About** — 2カラムレイアウト + GitHub API スキルバー + 手動スキル
3. **Works** — Content Collections からカード表示・クリックでモーダル開閉 · Phase 2 差し替えポイントをコメントで明記
4. **Timeline** — `src/data/timeline.ts` から読んで縦線 + 左右交互カード
5. **Articles** — Zenn API を fetch

#### Step 7: GitHub API スキルバー

```astro
---
// src/components/sections/About.astro
const token = import.meta.env.GITHUB_LANG_TOKEN;
const headers = token ? { Authorization: `Bearer ${token}` } : {};

const repos = await fetch(
  'https://api.github.com/users/QwerTayu/repos?per_page=100&type=owner',
  { headers }
).then(r => r.json());

const langBytes: Record<string, number> = {};
await Promise.all(
  repos.filter((r: any) => !r.fork).map(async (repo: any) => {
    const langs = await fetch(repo.languages_url, { headers }).then(r => r.json());
    for (const [lang, bytes] of Object.entries(langs)) {
      langBytes[lang] = (langBytes[lang] ?? 0) + (bytes as number);
    }
  })
);

const total = Object.values(langBytes).reduce((a, b) => a + b, 0);
const githubSkills = Object.entries(langBytes)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5)
  .map(([name, bytes]) => ({ name, pct: Math.round(bytes / total * 100) }));
---
```

#### Step 8: Zenn API 連携

```astro
---
// src/components/sections/Articles.astro
const res  = await fetch('https://zenn.dev/api/articles?username=tayu99_make&order=latest');
const data = await res.json();
const articles = data.articles.slice(0, 6);
---
```

#### Step 9: スクロールアニメーション

```ts
// src/scripts/scroll-animation.ts
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
  { threshold: 0.15 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

```css
.fade-in          { opacity: 0; transform: translateY(20px); transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth); }
.fade-in.visible  { opacity: 1; transform: translateY(0); }
```

---

### Phase 2

#### Step 1: Three.js + GSAP ScrollTrigger 導入

```bash
npm install three @types/three
# gsap はすでにインストール済み
```

#### Step 2: MagicaVoxel で Leica カメラモデル作成

1. MagicaVoxel でローポリ Leica M3 を作成
2. `.vox` → Blender でインポート → 調整 → `.glb` エクスポート
3. `src/components/three/camera.glb` に配置

#### Step 3: CameraScene コンポーネント実装

`src/components/three/CameraScene.tsx` を新規作成。Section 5 のスニペット参照。

#### Step 4: プレースホルダーを差し替え

```astro
<!-- Hero.astro の #camera-mount を差し替え -->
<!-- Before (Phase 1): -->
<div id="camera-mount" class="camera-placeholder" aria-hidden="true"></div>

<!-- After (Phase 2): -->
<CameraScene client:only="react" />
```

#### Step 5: GSAP ScrollTrigger 有効化

Phase 1 で書いた `scroll-animation.ts` の Intersection Observer を  
GSAP ScrollTrigger に段階的に移行する（混在可）。

#### Step 6: i18n テキスト追記 + `/en/` ルート有効化

`src/i18n/en.ts` に英語テキストを追記し、`astro.config.mjs` の i18n 設定コメントを外す。

---

*以上 — Phase 1 完了後、Phase 2 は差し替え・追記のみで完結する設計です。*
