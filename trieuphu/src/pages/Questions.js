import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

export function QuestionBank({ questions }) {
  const [level, setLevel] = useState('all');
  const [query, setQuery] = useState('');
  // Tên hàm xử lý ô tìm kiếm là yêu cầu kỹ thuật bắt buộc của đề.
  const handleQueryShift = (event) => setQuery(event.target.value);

  const visibleQuestions = questions.filter((item) =>
    (level === 'all' || item.level === Number(level)) &&
    item.question.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi'))
  );

  return (
    <div className="content-page fade-in">
      <div className="page-heading"><div><span className="eyebrow">KHÁM PHÁ KIẾN THỨC</span><h1>Ngân hàng <em>câu hỏi</em></h1><p>15 câu hỏi từ HTML, CSS, ES6 đến React. Ôn tập trước khi vào cuộc chơi.</p></div><span className="heading-glyph" aria-hidden="true">?</span></div>
      <section className="surface bank-surface">
        <div className="bank-toolbar">
          <label className="control-group"><span>Mức độ</span><select value={level} onChange={(e) => setLevel(e.target.value)}><option value="all">Tất cả</option>{Object.entries(LEVELS).map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label>
          <label className="control-group search-control"><span>Tìm kiếm câu hỏi</span><input type="search" value={query} onChange={handleQueryShift} placeholder="Ví dụ: hook, CSS, React..." /></label>
          <div className="filter-counter">Có <strong>{visibleQuestions.length}</strong> câu hỏi</div>
        </div>
        <div className="table-scroll"><table className="data-table"><thead><tr><th>STT</th><th>Mức độ</th><th>Câu hỏi</th><th aria-label="Xem chi tiết"></th></tr></thead><tbody>{visibleQuestions.map((item) => <tr key={item.id}><td className="table-id">{String(item.id).padStart(2, '0')}</td><td><span className={`level-badge level-${item.level}`}>{LEVELS[item.level]}</span></td><td><Link className="question-link" to={`/questions/${item.id}`}>{item.question}</Link></td><td><Link className="table-arrow" to={`/questions/${item.id}`} aria-label={`Xem câu ${item.id}`}>↗</Link></td></tr>)}</tbody></table>{visibleQuestions.length === 0 && <p className="empty-table">Không có câu hỏi phù hợp.</p>}</div>
      </section>
    </div>
  );
}

export function QuestionDetail({ questions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((item) => item.id === Number(id));
  if (!question) return <div className="state-panel"><h2>Không tìm thấy câu hỏi</h2><button className="btn btn-outline" type="button" onClick={() => navigate(-1)}>← Quay lại</button></div>;
  return <div className="detail-page fade-in"><button className="back-button" type="button" onClick={() => navigate(-1)}>← Quay lại</button><div className="surface detail-surface"><span className="eyebrow">NGÂN HÀNG CÂU HỎI</span><h1>Câu hỏi số {question.id} (<span className={`level-badge level-${question.level}`}>{LEVELS[question.level]}</span>)</h1><p className="detail-question">{question.question}</p><div className="detail-options">{question.options.map((option, index) => <div className={`detail-answer ${index === question.answer ? 'is-correct' : ''}`} key={index}><span className="answer-letter">{LETTERS[index]}</span><span>{option}</span>{index === question.answer && <strong className="correct-label">✓ (Đáp án đúng)</strong>}</div>)}</div></div></div>;
}
