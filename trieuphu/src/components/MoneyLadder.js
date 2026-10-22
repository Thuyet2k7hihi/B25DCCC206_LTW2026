import React from 'react';
import { formatMoney, MILESTONES, PRIZES } from '../data';

export default function MoneyLadder({ currentNumber, correctCount }) {
  return <section className="ladder surface"><div className="ladder-title"><span>✦</span> THANG TIỀN THƯỞNG</div>
    <div className="ladder-steps">{[...PRIZES].map((prize, index) => ({ prize, number: index + 1 })).reverse().map(({ prize, number }) =>
      <div key={number} className={`ladder-step ${currentNumber === number ? 'current' : ''} ${number <= correctCount ? 'passed' : ''} ${MILESTONES.includes(number) ? 'milestone' : ''}`}>
        <span className="ladder-num">{String(number).padStart(2, '0')}</span><span className="ladder-money">{formatMoney(prize)}</span><span className="ladder-mark">{number <= correctCount ? '✓' : MILESTONES.includes(number) ? '◆' : ''}</span>
      </div>)}</div>
    <div className="ladder-legend"><span>◆ Mốc an toàn</span><span>● Câu hiện tại</span></div>
  </section>;
}
