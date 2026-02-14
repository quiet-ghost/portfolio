import type { EducationData } from "@/types/portfolio";

const STATUS_PRIORITY: Record<EducationData["status"], number> = {
  "in-progress": 0,
  completed: 1,
  upcoming: 2,
};

const SEASON_WEIGHTS: Array<[string, number]> = [
  ["winter", 1],
  ["spring", 2],
  ["summer", 3],
  ["fall", 4],
  ["autumn", 4],
];

const getCompletionScore = (entry: EducationData): number => {
  const rawDate = entry.certificate?.date || entry.term || "";
  const normalized = rawDate.toLowerCase();

  const yearMatches = normalized.match(/\b(?:19|20)\d{2}\b/g);
  const year = yearMatches ? Number(yearMatches[yearMatches.length - 1]) : 0;

  let seasonWeight = 0;
  SEASON_WEIGHTS.forEach(([token, weight]) => {
    if (normalized.includes(token)) {
      seasonWeight = Math.max(seasonWeight, weight);
    }
  });

  return year * 10 + seasonWeight;
};

export const sortEducationEntries = (entries: EducationData[]): EducationData[] =>
  [...entries].sort((left, right) => {
    const statusOrder = STATUS_PRIORITY[left.status] - STATUS_PRIORITY[right.status];
    if (statusOrder !== 0) return statusOrder;

    const completionOrder = getCompletionScore(right) - getCompletionScore(left);
    if (completionOrder !== 0) return completionOrder;

    return right.order - left.order;
  });
