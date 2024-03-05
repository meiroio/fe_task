export type Label = {
  id: string;
  name: string;
};

export const labels: Label[] = [
  'PII',
  'Customer profile',
  'Transactional',
  'Email behavior',
  'Web behavior',
  'Web banners',
  'Preference',
  'Geographic',
  'Technographic',
  'Demographic',
  'Engagement',
  'QA',
].map((name, index) => ({
  id: (index + 1).toString(),
  name,
}));
