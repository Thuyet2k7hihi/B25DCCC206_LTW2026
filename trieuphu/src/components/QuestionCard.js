import React from 'react';
import { LETTERS, LEVELS } from '../data';

export function AnswerButton({ index, text, selected, answer, status, onChoose, hidden }) {
  const isLocked = status !== 'answering';
  let answerClass = '';
  if (status === 'locked' && selected === index) answerClass = 'is-locked';
  if (status === 'revealed') {
    if (index === answer) answerClass = 'is-correct';
    else if (index === selected) answerClass = 'is-wrong';
  }
  return <button className={`answer-button ${answerClass} ${hidden ? 'is-hidden' : ''}`} type="button"
    disabled={isLocked || hidden} onClick={() => onChoose(index)} aria-label={`Đáp án ${LETTERS[index]}: ${text}`}>
    <span className="answer-key">{LETTERS[index]}</span>
    <span className="answer-text">{hidden ? 'Đáp án đã bị loại' : text}</span>
    {status === 'revealed' && index === answer && <span className="answer-indicator">✓</span>}
    {status === 'revealed' && index === selected && index !== answer && <span className="answer-indicator">×</span>}
  </button>;
}

export default function QuestionCard({ question, number, total, status, selected, onChoose, hiddenOptions = [] }) {
  return <section className="question-card surface">
    <div className="question-topline"><span className="eyebrow">THỬ THÁCH LẬP TRÌNH WEB</span><span className={`level-badge level-${question.level}`}>{LEVELS[question.level]}</span></div>
    <div className="question-meta"><span className="question-number">Câu {number}<small>/{total}</small></span><div className="progress-segments" aria-label={`Tiến độ ${number}/${total}`}>{Array.from({ length: total }).map((_, i) => <span key={i} className={i < number ? 'filled' : ''} />)}</div></div>
    <h2 className="question-heading">{question.question}</h2>
    <div className="answer-grid">{question.options.map((option, index) => <AnswerButton key={index} index={index} text={option} answer={question.answer} selected={selected} status={status} onChoose={onChoose} hidden={hiddenOptions.includes(index)} />)}</div>
    <div className="answer-instructions">{status === 'answering' ? 'CHỌN 1 ĐÁP ÁN • PHÍM A–D HOẶC 1–4' : status === 'locked' ? 'ĐANG CHỐT CÂU TRẢ LỜI...' : 'ĐÁP ÁN ĐÃ ĐƯỢC CÔNG BỐ'}</div>
  </section>;
}
