export type TimelineEntry = {
  period: string;
  title: string;
  detail: string | null;
  type: 'education' | 'work' | 'activity' | 'project' | 'experience';
  side: 'left' | 'right';
};

export const timeline: TimelineEntry[] = [
  {
    period: '2021/04',
    title: '明石高専 電気情報工学科 入学',
    detail: null,
    type: 'education',
    side: 'left',
  },
  {
    period: '2022/01~2025/01',
    title: '全国ロボコン交流会 渉外担当代表',
    detail: '協賛企業を2社から8社に拡大',
    type: 'activity',
    side: 'right',
  },
  {
    period: '2022/04~2022/10',
    title: 'NHK高専ロボコン2022 Bチームリーダー',
    detail: '近畿地区大会 特別賞',
    type: 'activity',
    side: 'left',
  },
  {
    period: '2022/10',
    title: 'Web製作研究部 入部',
    detail: null,
    type: 'activity',
    side: 'right',
  },
  {
    period: '2023/04~2024/03',
    title: '明石高専 学生会執行部 文化局長',
    detail: '学内イベント「明葉祭」などを企画・運営',
    type: 'activity',
    side: 'left',
  },
  {
    period: '2023/08',
    title: 'ため池GOプロジェクト 立ち上げ',
    detail: '構想ゼロ状態から本運用までを経験',
    type: 'project',
    side: 'right',
  },
  {
    period: '2023/12',
    title: '日タイ高校生サイエンスフェア2023 (TJ-SSF2023) 参加',
    detail: '初海外・初留学',
    type: 'experience',
    side: 'left',
  },
  {
    period: '2024/04',
    title: 'DCON2024 出場',
    detail: 'チーム「PiP Tech」として１次審査通過・本会場でポスター発表',
    type: 'activity',
    side: 'right',
  },
  {
    period: '2024/06~',
    title: '株式会社Growth Verse 長期インターンシップ開始',
    detail: null,
    type: 'work',
    side: 'left',
  },
  {
    period: '2025/05〜2025/06',
    title: '大阪・関西万博2025 出展参加',
    detail: 'ため池GO!プロジェクトの活動が評価され、開催期間中に2度の出展参加を経験',
    type: 'experience',
    side: 'right',
  },
  {
    period: '2025/12',
    title: 'HACK U KOSEN 2025 OSAKA 優秀賞（審査員賞）受賞',
    detail: 'Catch-Talk（会話のキャッチボール可視化アプリ）でチーム開発',
    type: 'activity',
    side: 'left',
  },
  {
    period: '2026/03',
    title: 'DEIM2026 学生プレゼンテーション賞 受賞',
    detail: 'ため池GO!の研究発表。480発表中100表彰',
    type: 'activity',
    side: 'right',
  },
  {
    period: '2026/04',
    title: '長岡技術科学大学 工学部 情報・経営システム工学分野 入学',
    detail: null,
    type: 'education',
    side: 'left',
  },
  {
    period: '2026/04',
    title: '技大祭実行委員会情報局「NUTMEG」 入局',
    detail: null,
    type: 'activity',
    side: 'right',
  },
];
