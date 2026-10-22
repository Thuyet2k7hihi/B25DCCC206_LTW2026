import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const titles = {
  won: 'Chúc mừng! Bạn đã trở thành triệu phú',
  wrong: 'Rất tiếc, bạn đã trả lời sai',
  timeout: 'Hết giờ!',
  quit: 'Bạn đã dừng cuộc chơi',
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;
  if (!result || !titles[result.reason]) return <Navigate to="/" replace />;
  return <div className="result-page fade-in"><div className="result-glow" aria-hidden="true">✦</div><div className="result-card surface"><div className="result-symbol">{result.reason === 'won' ? '🏆' : result.reason === 'quit' ? '👏' : '✦'}</div><span className="eyebrow">KẾT QUẢ LƯỢT CHƠI</span><h1>{titles[result.reason]}</h1><p>Bạn đã hoàn thành cuộc hành trình của mình!</p><div className="result-prize"><small>TỔNG TIỀN THƯỞNG</small><strong>{formatMoney(result.prize)}</strong></div><div className="result-facts"><div><span>Người chơi</span><strong>{result.name}</strong></div><div><span>Số câu trả lời đúng</span><strong>{result.correctCount}/15</strong></div></div><div className="result-actions"><button className="btn btn-primary" type="button" onClick={() => navigate('/play', { replace: true })}>↻ Chơi lại</button><button className="btn btn-outline" type="button" onClick={() => navigate('/')}>⌂ Về trang chủ</button></div></div></div>;
}
