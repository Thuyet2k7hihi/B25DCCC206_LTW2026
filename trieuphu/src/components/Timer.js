import React from 'react';
import { TIME_PER_QUESTION } from '../data';

export default function Timer({ seconds, status }) {
  return <section className={`timer-box surface ${seconds <= 10 ? 'timer-danger' : ''}`} aria-label={`Còn ${seconds} giây`}>
    <div className="timer-icon">◷</div>
    <div><div className="timer-label">THỜI GIAN CÒN LẠI</div><div className="timer-number">{seconds.toString().padStart(2, '0')}<small>giây</small></div></div>
    <div className="timer-progress" role="progressbar" aria-valuenow={seconds} aria-valuemin={0} aria-valuemax={TIME_PER_QUESTION}><span style={{ width: `${seconds / TIME_PER_QUESTION * 100}%` }} /></div>
    {status !== 'answering' && <span className="timer-paused">Đã dừng</span>}
  </section>;
}
