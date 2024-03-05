import { expect, test } from 'vitest';
import { formatDate } from './formatters';

test('formatDate returns correctly formatted date', () => {
  const date = '2024-01-25';
  const expectedFormat = 'January 25, 2024';
  const actualFormat = formatDate(date);
  expect(actualFormat).toBe(expectedFormat);
});
