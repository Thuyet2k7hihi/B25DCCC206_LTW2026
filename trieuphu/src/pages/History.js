import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const reasonLabels = { won: 'Chiến thắng', wrong: 'Trả lời sai', timeout: 'Hết giờ', quit: 'Dừng chơi' };

export default function History({ records, onClear }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const stats = useMemo(() => records.reduce((acc, record) => ({
    totalPrize: acc.totalPrize + record.prize,
    maxPrize: Math.max(acc.maxPrize, record.prize),
    wins: acc.wins + (record.reason === 'won' ? 1 : 0),
  }), { totalPrize: 0, maxPrize: 0, wins: 0 }), [records]);
  const filtered = useMemo(() => [...records]
    .filter((record) => record.name.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')))
    .sort((a, b) => sortBy === 'prize' ? b.prize - a.prize : new Date(b.date) - new Date(a.date)), [records, search, sortBy]);

  function requestClear() {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử lượt chơi?')) onClear();
  }

  return <div className="history-page content-page fade-in"><div className="page-heading"><div><span className="eyebrow">HÀNH TRÌNH CHINH PHỤC</span><h1>Lịch sử <em>lượt chơi</em></h1><p>Tất cả lượt chơi của bạn được lưu ngay trên trình duyệt này.</p></div><span className="heading-glyph" aria-hidden="true">◷</span></div>
    <div className="history-stats"><div className="surface stat-panel"><small>TỔNG LƯỢT CHƠI</small><strong>{records.length}</strong><span>lượt đã tham gia</span></div><div className="surface stat-panel"><small>KỶ LỤC CAO NHẤT</small><strong className="gold-text">{formatMoney(stats.maxPrize)}</strong><span>giải thưởng lớn nhất</span></div><div className="surface stat-panel"><small>LẦN CHIẾN THẮNG</small><strong>{stats.wins}</strong><span>trả lời đúng 15 câu</span></div></div>
    <section className="surface history-surface"><div className="history-tools"><h2>Danh sách lượt chơi</h2><div className="history-filters"><input type="search" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm tên người chơi..." aria-label="Tìm tên người chơi"/><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sắp xếp lượt chơi"><option value="latest">Mới nhất</option><option value="prize">Tiền thưởng cao nhất</option></select>{records.length > 0 && <button type="button" className="clear-history" onClick={requestClear}>Xóa lịch sử</button>}</div></div>
    {records.length === 0 ? <div className="history-empty"><span>◇</span><h3>Chưa có lượt chơi nào</h3><p>Hãy bắt đầu một thử thách để ghi tên bạn vào lịch sử!</p><Link to="/" className="btn btn-primary">Chơi ngay →</Link></div> : <div className="table-scroll"><table className="data-table history-table"><thead><tr><th>Thời gian</th><th>Người chơi</th><th>Số câu đúng</th><th>Kết quả</th><th>Tiền thưởng</th></tr></thead><tbody>{filtered.map((record) => <tr key={record.id}><td className="date-cell">{new Date(record.date).toLocaleString('vi-VN')}</td><td><strong>{record.name}</strong></td><td>{record.correctCount}/15</td><td><span className={`reason-tag reason-${record.reason}`}>{reasonLabels[record.reason] || 'Hoàn thành'}</span></td><td className="prize-cell">{formatMoney(record.prize)}</td></tr>)}</tbody></table>{filtered.length === 0 && <p className="empty-table">Không tìm thấy lượt chơi phù hợp.</p>}</div>}
    </section></div>;
}
