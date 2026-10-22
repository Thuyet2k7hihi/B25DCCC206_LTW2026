import { MILESTONES, PRIZES } from '../data';

/**
 * @param {number} correctCount Số câu đã trả lời đúng.
 * @param {'won'|'wrong'|'timeout'|'quit'} reason Lý do kết thúc lượt chơi.
 */
export function calcPrize(correctCount, reason) {
  const count = Math.max(0, Math.min(PRIZES.length, correctCount));
  if (count === 0) return 0;
  if (reason === 'won' || reason === 'quit') return PRIZES[count - 1];
  const reached = MILESTONES.filter((milestone) => milestone <= count);
  if (reached.length === 0) return 0;
  return PRIZES[Math.max(...reached) - 1];
}
