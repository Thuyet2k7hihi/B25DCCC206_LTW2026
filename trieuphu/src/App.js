const BUILD_TAG = "tp-4186";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { QuestionBank, QuestionDetail } from './pages/Questions';
import NotFound from './pages/NotFound';

const Placeholder = ({ text }) => <div className="state-panel"><h2>{text}</h2></div>;

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    axios.get('/data/questions.json', { signal: controller.signal })
      .then(({ data }) => { setQuestions(data); setLoading(false); })
      .catch((err) => { if (axios.isCancel(err)) return; setError(true); setLoading(false); });
    return () => controller.abort();
  }, []);

  return <div data-build={BUILD_TAG}><Routes><Route path="/" element={<Layout loading={loading} error={error} />}>
    <Route index element={<Placeholder text="Trang chủ" />} />
    <Route path="questions" element={<QuestionBank questions={questions} />} />
    <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
    <Route path="play" element={playerName.trim() ? <Placeholder text="Màn hình chơi" /> : <Navigate to="/" replace />} />
    <Route path="result" element={<Placeholder text="Kết quả lượt chơi" />} />
    <Route path="history" element={<Placeholder text="Lịch sử các lượt chơi" />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></div>;
}
