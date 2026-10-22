const BUILD_TAG = "tp-4186";
/* eslint-disable import/first */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { QuestionBank, QuestionDetail } from './pages/Questions';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import NotFound from './pages/NotFound';

const HISTORY_KEY = 'trieuphu-history-v1';

function loadHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [history, setHistory] = useState(loadHistory);

  // Gọi API giả lập bằng axios, hủy request khi App unmount (cleanup).
  useEffect(() => {
    const controller = new AbortController();
    axios.get('/data/questions.json', { signal: controller.signal })
      .then(({ data }) => { setQuestions(data); setLoading(false); })
      .catch((err) => { if (axios.isCancel(err)) return; setError(true); setLoading(false); });
    return () => controller.abort();
  }, []);

  // Ghi lịch sử vào localStorage mỗi khi có thay đổi.
  useEffect(() => {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); }
    catch (err) { console.warn('Không thể lưu lịch sử lượt chơi.', err); }
  }, [history]);

  const saveResult = useCallback((result) => {
    setHistory((previous) => [{ ...result, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }, ...previous]);
  }, []);
  const clearHistory = useCallback(() => setHistory([]), []);
  const record = useMemo(() => history.length ? history.reduce((maximum, item) => Math.max(maximum, item.prize), 0) : null, [history]);

  return <div data-build={BUILD_TAG}><Routes><Route path="/" element={<Layout loading={loading} error={error} />}>
    <Route index element={<Home playerName={playerName} onPlayerNameChange={setPlayerName} record={record} />} />
    <Route path="questions" element={<QuestionBank questions={questions} />} />
    <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
    <Route path="play" element={playerName.trim() ? <Play questions={questions} playerName={playerName} onSaveResult={saveResult} /> : <Navigate to="/" replace />} />
    <Route path="result" element={<Result />} />
    <Route path="history" element={<History records={history} onClear={clearHistory} />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></div>;
}
