export type Skill = {
  name: string;
  source: 'github' | 'manual';
};

export const manualSkills: Skill[] = [
  { name: 'Go',   source: 'manual' },
  { name: 'SQL',      source: 'manual' },
  { name: 'SQL',      source: 'manual' },
  { name: 'Firebase', source: 'manual' },
  { name: 'Figma',    source: 'manual' },
  { name: 'AtCoder',  source: 'manual' },
];
