export type StaticArticle = {
  title: string;
  url: string;
  platform: string;
  publishedAt: string; // YYYY-MM-DD
  emoji?: string;
};

export const staticArticles: StaticArticle[] = [
  // 例:
  // {
  //   title: '記事タイトル',
  //   url: 'https://note.com/tayu99_/n/xxxxx',
  //   platform: 'note',
  //   publishedAt: '2026-01-01',
  //   emoji: '📝',
  // },
];
