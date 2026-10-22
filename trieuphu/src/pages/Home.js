import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

export default function Home({ playerName, onPlayerNameChange, record }) {
  const navigate = useNavigate();
  const handleStart = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    onPlayerNameChange(playerName.trim());
    navigate('/play');
  };
  return <div className="home-page fade-in">
    <section className="hero"><div className="hero-copy"><span className="hero-chip">✦ TRÒ CHƠI KIẾN THỨC LẬP TRÌNH WEB</span><h1>BẠN CÓ DÁM<br /><em>TRỞ THÀNH</em><br /><span>TRIỆU PHÚ?</span></h1><p>15 câu hỏi. 30 giây mỗi câu. Từ HTML, CSS đến React – chứng minh bạn là một Web Developer thực thụ!</p><div className="hero-stats"><div><strong>15</strong><small>Câu hỏi</small></div><div><strong>30s</strong><small>Mỗi câu</small></div><div><strong>250M</strong><small>Giải cao nhất</small></div></div></div><div className="hero-visual" aria-hidden="true"><div className="hero-halo halo-1"/><div className="hero-halo halo-2"/><div className="hero-emblem"><span>✦</span><strong>250</strong><small>TRIỆU ĐỒNG</small></div><div className="hero-spark spark-a">✧</div><div className="hero-spark spark-b">✦</div><div className="hero-spark spark-c">✧</div></div></section>
    <div className="home-panels"><section className="surface enter-panel"><span className="eyebrow">SẴN SÀNG THỬ SỨC?</span><h2>Bắt đầu cuộc chơi</h2><p>Nhập tên của bạn để ghi danh vào bảng vàng triệu phú.</p><form onSubmit={handleStart}><label htmlFor="playerName">Tên người chơi</label><input id="playerName" className="name-input" maxLength={40} value={playerName} onChange={(e) => onPlayerNameChange(e.target.value)} placeholder="Nhập tên của bạn..." autoComplete="nickname" /><button className="btn btn-primary full-width" disabled={!playerName.trim()} type="submit">BẮT ĐẦU CHƠI <span>→</span></button></form></section>
      <section className="surface rule-panel"><div className="panel-header"><span className="eyebrow">HƯỚNG DẪN</span><span>◈</span></div><h2>Luật chơi đơn giản</h2><div className="rules-list"><div><span>01</span><p>Vượt qua <strong>15 câu hỏi</strong> từ dễ đến khó.</p></div><div><span>02</span><p>Mỗi câu có <strong>30 giây</strong> để trả lời.</p></div><div><span>03</span><p>Mốc an toàn ở <strong>câu 5, 10 và 15</strong>.</p></div><div><span>04</span><p>Sử dụng <strong>3 quyền trợ giúp</strong> và có thể dừng chơi.</p></div></div>{record != null && <div className="home-record">🏆 Kỷ lục hiện tại <strong>{formatMoney(record)}</strong></div>}</section></div>
  </div>;
}
