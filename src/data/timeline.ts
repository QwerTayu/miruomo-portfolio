export type TimelineEntry = {
  period: string;
  title: { ja: string; en: string };
  detail: { ja: string; en: string } | null;
  type: 'education' | 'work' | 'activity' | 'project' | 'experience';
  side: 'left' | 'right';
};

export const timeline: TimelineEntry[] = [
  {
    period: '2021/04',
    title: {
      ja: '明石高専 電気情報工学科 入学',
      en: 'Entered Akashi College, Department of Electrical and Information Engineering',
    },
    detail: null,
    type: 'education',
    side: 'left',
  },
  {
    period: '2022/01~2025/01',
    title: {
      ja: '全国ロボコン交流会 渉外担当代表',
      en: 'Leader for External Relations, National Robot Contest Meetup',
    },
    detail: {
      ja: '協賛企業を2社から8社に拡大',
      en: 'Increased sponsor companies from 2 to 8',
    },
    type: 'activity',
    side: 'right',
  },
  {
    period: '2022/04~2022/10',
    title: {
      ja: 'NHK高専ロボコン2022 Bチームリーダー',
      en: 'Team B Leader, NHK Kosen Robocon 2022',
    },
    detail: {
      ja: '近畿地区大会 特別賞',
      en: 'Special Award at the Kinki Regional Contest',
    },
    type: 'activity',
    side: 'left',
  },
  {
    period: '2022/10',
    title: {
      ja: 'Web製作研究部 入部',
      en: 'Joined the Web Design Club',
    },
    detail: null,
    type: 'activity',
    side: 'right',
  },
  {
    period: '2023/04~2024/03',
    title: {
      ja: '明石高専 学生会執行部 文化局長',
      en: 'Head of Culture, Student Council, Akashi College',
    },
    detail: {
      ja: '学内イベント「明葉祭」などを企画・運営',
      en: 'Planned and ran school events like the Meiyoh Festival',
    },
    type: 'activity',
    side: 'left',
  },
  {
    period: '2023/08',
    title: {
      ja: 'ため池GOプロジェクト 立ち上げ',
      en: 'Started the Tameike GO Project',
    },
    detail: {
      ja: '構想ゼロ状態から本運用までを経験',
      en: 'Built it from zero to a real, working service',
    },
    type: 'project',
    side: 'right',
  },
  {
    period: '2023/12',
    title: {
      ja: '日タイ高校生サイエンスフェア2023 (TJ-SSF2023) 参加',
      en: 'Joined the Japan-Thailand Student Science Fair 2023 (TJ-SSF2023)',
    },
    detail: {
      ja: '初海外・初留学',
      en: 'My first trip abroad and my first time studying overseas',
    },
    type: 'experience',
    side: 'left',
  },
  {
    period: '2024/04',
    title: {
      ja: 'DCON2024 出場',
      en: 'Took part in DCON2024',
    },
    detail: {
      ja: 'チーム「PiP Tech」として１次審査通過・本会場でポスター発表',
      en: 'Passed the first round as team "PiP Tech" and gave a poster talk at the final event',
    },
    type: 'activity',
    side: 'right',
  },
  {
    period: '2024/06~',
    title: {
      ja: '株式会社Growth Verse 長期インターンシップ開始',
      en: 'Started a long internship at Growth Verse Inc.',
    },
    detail: null,
    type: 'work',
    side: 'left',
  },
  {
    period: '2025/05〜2025/06',
    title: {
      ja: '大阪・関西万博2025 出展参加',
      en: 'Joined Expo 2025 Osaka, Kansai',
    },
    detail: {
      ja: 'ため池GO!プロジェクトの活動が評価され、開催期間中に2度の出展参加を経験',
      en: 'Our Tameike GO! project was chosen, so we joined the expo twice during the event',
    },
    type: 'experience',
    side: 'right',
  },
  {
    period: '2025/12',
    title: {
      ja: 'HACK U KOSEN 2025 OSAKA 優秀賞（審査員賞）受賞',
      en: "Won the Judges' Award at HACK U KOSEN 2025 OSAKA",
    },
    detail: {
      ja: 'Catch-Talk（会話のキャッチボール可視化アプリ）でチーム開発',
      en: 'Made Catch-Talk, an app that shows how a conversation flows, with a team',
    },
    type: 'activity',
    side: 'left',
  },
  {
    period: '2026/03',
    title: {
      ja: 'DEIM2026 学生プレゼンテーション賞 受賞',
      en: 'Won the Student Presentation Award at DEIM2026',
    },
    detail: {
      ja: 'ため池GO!の研究発表。480発表中100表彰',
      en: 'Presented research about Tameike GO!. One of 100 winners out of 480 talks',
    },
    type: 'activity',
    side: 'right',
  },
  {
    period: '2026/04',
    title: {
      ja: '長岡技術科学大学 工学部 情報・経営システム工学分野 入学',
      en: 'Entered Nagaoka University of Technology, Faculty of Engineering, Information and Management Systems Engineering',
    },
    detail: null,
    type: 'education',
    side: 'left',
  },
  {
    period: '2026/04',
    title: {
      ja: '技大祭実行委員会情報局「NUTMEG」 入局',
      en: 'Joined NUTMEG, the IT team of the Gidai Festival Committee',
    },
    detail: null,
    type: 'activity',
    side: 'right',
  },
];
