export type Skill = {
  name: string;
  pct: number;
  source: 'github' | 'manual';
};

export const manualSkills: Skill[] = [
  { name: 'Figma',   pct: 65, source: 'manual' },
  { name: 'AtCoder', pct: 40, source: 'manual' },
];
