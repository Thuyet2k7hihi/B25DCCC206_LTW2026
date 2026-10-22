import React from 'react';
import { LETTERS } from '../data';

const SUPPORTS = [
  { id: 'fifty', symbol: '½', name: '50 : 50', sub: 'Loại 2 đáp án sai' },
  { id: 'phone', symbol: '☎', name: 'Gọi điện', sub: 'Hỏi ý kiến người thân' },
  { id: 'audience', symbol: '♙', name: 'Khán giả', sub: 'Thăm dò ý kiến' },
];

export default function Lifelines({ used, onUse, disabled, hint }) {
  return <section className="lifelines surface"><div className="lifelines-heading"><div><span className="eyebrow">CẦN MỘT CHÚT TRỢ GIÚP?</span><h3>Quyền trợ giúp</h3></div><span className="lifelines-amount">{3 - Object.values(used).filter(Boolean).length}/3</span></div>
    <div className="lifelines-buttons">{SUPPORTS.map((item) => <button type="button" key={item.id} className={`lifeline-button ${used[item.id] ? 'is-used' : ''}`} disabled={disabled || used[item.id]} onClick={() => onUse(item.id)}><span className="lifeline-icon">{item.symbol}</span><span><strong>{item.name}</strong><small>{used[item.id] ? 'Đã sử dụng' : item.sub}</small></span></button>)}</div>
    {hint && <div className="lifeline-hint"><strong>{hint.title}</strong>{hint.type === 'audience' ? <div className="audience-results">{hint.votes.map((vote, index) => <div key={LETTERS[index]} className="audience-vote"><span>{LETTERS[index]}</span><div className="vote-track"><span style={{ width: `${vote}%` }} /></div><strong>{vote}%</strong></div>)}</div> : <p>{hint.message}</p>}</div>}
  </section>;
}
