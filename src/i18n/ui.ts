export const languages = {
  ja: "日本語",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

const ja = {
  "nav.hero": "Hero",
  "nav.about": "About",
  "nav.works": "Works",
  "nav.timeline": "Timeline",
  "nav.articles": "Articles",
  "nav.ariaLabel": "メインナビゲーション",
  "nav.menuToggle": "メニューを開く",

  "hero.name": "miruomo.com",
  "hero.role": "STUDENT SOFTWARE ENGINEER",
  "hero.sub": "Akashi KOSEN → Nagaoka University of Technology",
  "hero.cta": "Works を見る",
  "hero.cta2": "About me",

  "about.label": "ABOUT",
  "about.title": "About me",
  "about.skills": "SKILLS",
  "about.interests": "INTERESTS",
  "about.affil": "明石高専 → 長岡技科大",
  "about.avatarAlt": "プロフィール写真",
  "about.avatarAltNotion": "プロフィール写真（Notion風）",
  "about.avatarToggleLabel": "プロフィール写真（クリックで切り替え）",

  "works.label": "WORKS",
  "works.title": "Works",
  "works.detail": "詳細を見る",
  "works.github": "GitHub",
  "works.demo": "Live",
  "works.close": "閉じる",
  "works.modalAria": "作品詳細",

  "timeline.label": "TIMELINE",
  "timeline.title": "経歴",

  "articles.label": "ARTICLES",
  "articles.title": "Articles",
  "articles.zenn": "Zenn",
  "articles.qiita": "Qiita",
  "articles.empty": "記事を取得できませんでした。",
} as const;

export type UiKey = keyof typeof ja;

const en = {
  "nav.hero": "Hero",
  "nav.about": "About",
  "nav.works": "Works",
  "nav.timeline": "Timeline",
  "nav.articles": "Articles",
  "nav.ariaLabel": "Main navigation",
  "nav.menuToggle": "Open menu",

  "hero.name": "miruomo.com",
  "hero.role": "STUDENT SOFTWARE ENGINEER",
  "hero.sub": "Akashi KOSEN → Nagaoka University of Technology",
  "hero.cta": "See Works",
  "hero.cta2": "About me",

  "about.label": "ABOUT",
  "about.title": "About me",
  "about.skills": "SKILLS",
  "about.interests": "INTERESTS",
  "about.affil": "Akashi College → Nagaoka University of Technology",
  "about.avatarAlt": "Profile photo",
  "about.avatarAltNotion": "Profile photo (Notion style)",
  "about.avatarToggleLabel": "Profile photo (click to flip)",

  "works.label": "WORKS",
  "works.title": "Works",
  "works.detail": "View details",
  "works.github": "GitHub",
  "works.demo": "Live",
  "works.close": "Close",
  "works.modalAria": "Work details",

  "timeline.label": "TIMELINE",
  "timeline.title": "Timeline",

  "articles.label": "ARTICLES",
  "articles.title": "Articles",
  "articles.zenn": "Zenn",
  "articles.qiita": "Qiita",
  "articles.empty": "Could not load articles.",
} satisfies Record<UiKey, string>;

const ui = { ja, en };

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}
