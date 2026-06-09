export type TimelineEntry = {
  date: string;
  dateEnd?: string;
  title: string;
  detail: string | null;
  type: 'education' | 'work' | 'activity' | 'project' | 'experience';
  side: 'left' | 'right';
};

export const timeline: TimelineEntry[] = [
  {
    date: '2021-04',
    title: '明石高専 電気情報工学科 入学',
    detail: null,
    type: 'education',
    side: 'left',
  },
  {
    date: '2022-04',
    dateEnd: '2022-10',
    title: 'NHK高専ロボコン2022 Bチームリーダー',
    detail: '近畿地区大会 特別賞',
    type: 'activity',
    side: 'right',
  },
  {
    date: '2022-10',
    title: 'Web製作研究部 入部',
    detail: null,
    type: 'activity',
    side: 'left',
  },
  {
    date: '2023-08',
    title: 'ため池GOプロジェクト 立ち上げ',
    detail: '構想ゼロ状態から本運用までを経験',
    type: 'project',
    side: 'right',
  },
  {
    date: '2023-12',
    title: '日タイ高校生サイエンスフェア2023 (TJ-SSF2023) 参加',
    detail: '初海外・初留学',
    type: 'experience',
    side: 'left',
  },
  {
    date: '2024-04',
    title: 'DCON2024 出場',
    detail: 'チーム「PiP Tech」として１次審査通過・本会場でポスター発表',
    type: 'activity',
    side: 'right',
  },
  {
    date: '2024-06',
    title: '株式会社Growth Verse 長期インターンシップ開始',
    detail: null,
    type: 'work',
    side: 'left',
  },
  {
    date: '2025-05',
    dateEnd: '2025-06',
    title: '大阪・関西万博2025 出展参加',
    detail: "ため池GO!プロジェクトの活動が評価され、開催期間中に2度の出展参加を経験",
    type: 'experience',
    side: 'right',
  },
  {
    date: '2026-04',
    title: '長岡技術科学大学 工学部 情報・経営システム工学分野 入学',
    detail: null,
    type: 'education',
    side: 'left',
  },
  {
    date: '2026-04',
    title: '学生団体NUTMEG 入局',
    detail: null,
    type: 'activity',
    side: 'right',
  },
];
