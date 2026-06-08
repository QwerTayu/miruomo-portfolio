export const languages = {
  ja: '日本語',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

const ui = {
  ja: {
    'nav.hero':      'Hero',
    'nav.about':     'About',
    'nav.works':     'Works',
    'nav.timeline':  'Timeline',
    'nav.articles':  'Articles',

    'hero.name':     'miruomo.com',
    'hero.role':     'SOFTWARE ENGINEER',
    'hero.sub':      'Akashi KOSEN → Nagaoka University of Technology',
    'hero.cta':      'Works を見る',
    'hero.cta2':     'About me',

    'about.label':   'ABOUT',
    'about.title':   'About me',
    'about.skills':  'SKILLS',
    'about.interests': 'INTERESTS',

    'works.label':   'WORKS',
    'works.title':   'Works',
    'works.detail':  '詳細を見る',
    'works.github':  'GitHub',
    'works.demo':    'Demo',
    'works.close':   '閉じる',

    'timeline.label': 'TIMELINE',
    'timeline.title': '経歴',

    'articles.label':    'ARTICLES',
    'articles.title':    'Articles',
    'articles.more':     'Zenn でもっと見る →',
    'articles.zenn':     'Zenn',
    'articles.qiita':    'Qiita',
  },
  en: {
    // Phase 2 で追記
  },
} as const;

export type UiKey = keyof typeof ui['ja'];

export function t(lang: Lang, key: UiKey): string {
  return (ui[lang] as Record<string, string>)?.[key] ?? ui['ja'][key];
}
