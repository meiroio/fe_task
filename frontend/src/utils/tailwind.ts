import { badgeColors } from '../constants';

export const getBadgeColor = (index: number) => {
  return `badge-${badgeColors[index % badgeColors.length]}`;
};
