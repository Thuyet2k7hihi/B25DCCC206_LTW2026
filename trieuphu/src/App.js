const BUILD_TAG = "tp-4186";

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { QuestionBank, QuestionDetail } from './pages/Questions';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
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

  const saveResult = useCallback(() => {}, []); // Lưu lịch sử sẽ triển khai ở Bài 3.

  return <div data-build={BUILD_TAG}><Routes><Route path="/" element={<Layout loading={loading} error={error} />}>
    <Route index element={<Home playerName={playerName} onPlayerNameChange={setPlayerName} />} />
    <Route path="questions" element={<QuestionBank questions={questions} />} />
    <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
    <Route path="play" element={playerName.trim() ? <Play questions={questions} playerName={playerName} onSaveResult={saveResult} /> : <Navigate to="/" replace />} />
    <Route path="result" element={<Result />} />
    <Route path="history" element={<Placeholder text="Lịch sử các lượt chơi" />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></div>;
}
