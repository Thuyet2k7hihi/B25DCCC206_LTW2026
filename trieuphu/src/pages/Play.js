import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatMoney, LETTERS, PRIZES, TIME_PER_QUESTION } from '../data';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import Lifelines from '../components/Lifelines';
import { calcPrize } from '../utils/prizes';

export default function Play({ questions, playerName, onSaveResult = () => {} }) {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [seconds, setSeconds] = useState(TIME_PER_QUESTION);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('answering');
  const [used, setUsed] = useState({ fifty: false, phone: false, audience: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [hint, setHint] = useState(null);
  const finished = useRef(false);
  const question = questions[questionIndex];

  const finishGame = useCallback((reason, totalCorrect) => {
    if (finished.current) return;
    finished.current = true;
    const prize = calcPrize(totalCorrect, reason);
    const result = { name: playerName.trim(), correctCount: totalCorrect, prize, reason, date: new Date().toISOString() };
    onSaveResult(result);
    navigate('/result', { replace: true, state: result });
  }, [navigate, onSaveResult, playerName]);

  const handleChoose = useCallback((index) => {
    if (status !== 'answering' || seconds <= 0 || finished.current) return;
    if (hiddenOptions.includes(index)) return;
    setSelected(index);
    setStatus('locked');
    setHint(null);
  }, [status, seconds, hiddenOptions]);

  // Timer chỉ chạy khi đang trả lời; cleanup khi đổi trạng thái hoặc rời trang.
  useEffect(() => {
    if (status !== 'answering') return undefined;
    const timerId = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timerId);
  }, [status, questionIndex]);

  useEffect(() => {
    if (status === 'answering' && seconds === 0) finishGame('timeout', correctCount);
  }, [seconds, status, correctCount, finishGame]);

  // Quy trình: answering -> locked (1 giây) -> revealed (2 giây) -> câu mới / kết quả.
  useEffect(() => {
    if (!question) return undefined;
    if (status === 'locked') {
      const timeoutId = setTimeout(() => setStatus('revealed'), 1000);
      return () => clearTimeout(timeoutId);
    }
    if (status === 'revealed') {
      const timeoutId = setTimeout(() => {
        if (selected !== question.answer) {
          finishGame('wrong', correctCount);
        } else if (questionIndex === questions.length - 1) {
          finishGame('won', correctCount + 1);
        } else {
          setCorrectCount((value) => value + 1);
          setQuestionIndex((value) => value + 1);
          setSeconds(TIME_PER_QUESTION);
          setSelected(null);
          setHiddenOptions([]);
          setHint(null);
          setStatus('answering');
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [status, selected, question, questionIndex, questions.length, correctCount, finishGame]);

  // Mỗi trợ giúp chỉ dùng được một lần trong một lượt chơi.
  const handleLifeline = (id) => {
    if (status !== 'answering' || used[id] || finished.current) return;
    setUsed((value) => ({ ...value, [id]: true }));
    if (id === 'fifty') {
      const oneWrong = (question.answer + 1) % 4;
      setHiddenOptions([0, 1, 2, 3].filter((i) => i !== question.answer && i !== oneWrong));
      setHint({ type: 'text', title: '50 : 50', message: 'Đã loại bỏ 2 đáp án không chính xác.' });
    } else if (id === 'phone') {
      setHint({ type: 'text', title: '☎ Gọi điện cho người thân', message: `Mình nghĩ đáp án ${LETTERS[question.answer]} là lựa chọn đúng. Bạn cứ cân nhắc nhé!` });
    } else if (id === 'audience') {
      // 64% cho đáp án đúng, chia 36% cho ba đáp án còn lại.
      const otherVotes = [11, 13, 12];
      let n = 0;
      const votes = question.options.map((_, i) => i === question.answer ? 64 : otherVotes[n++]);
      setHint({ type: 'audience', title: '♙ Khảo sát ý kiến khán giả', votes });
    }
  };

  const handleQuit = () => {
    if (status !== 'answering') return;
    finishGame('quit', correctCount);
  };

  // Phím tắt A-D / 1-4, chỉ hoạt động khi có thể chọn đáp án.
  useEffect(() => {
    if (status !== 'answering') return undefined;
    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      const key = event.key.toUpperCase();
      const index = ['A', 'B', 'C', 'D'].indexOf(key);
      const numberIndex = ['1', '2', '3', '4'].indexOf(key);
      const choice = index === -1 ? numberIndex : index;
      if (choice !== -1) handleChoose(choice);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [status, handleChoose]);

  if (!question) return <div className="state-panel"><h2>Không tìm thấy câu hỏi</h2></div>;
  return <div className="play-page fade-in"><div className="play-header"><div><span className="eyebrow">AI LÀ TRIỆU PHÚ · WEB EDITION</span><h1>Chinh phục <em>triệu phú</em></h1></div><div className="player-pill"><span className="player-avatar">♟</span><div><small>NGƯỜI CHƠI</small><strong>{playerName}</strong></div></div></div><div className="play-grid"><div className="play-primary"><div className="game-metrics"><Timer seconds={seconds} status={status} /><div className="earned surface"><span>ĐÃ CHINH PHỤC</span><strong>{formatMoney(correctCount ? PRIZES[correctCount - 1] : 0)}</strong><small>{correctCount}/15 câu đúng</small></div></div><QuestionCard question={question} number={questionIndex + 1} total={questions.length} selected={selected} status={status} onChoose={handleChoose} hiddenOptions={hiddenOptions} /></div><aside className="play-aside"><MoneyLadder currentNumber={questionIndex + 1} correctCount={correctCount} /><Lifelines used={used} onUse={handleLifeline} disabled={status !== 'answering'} hint={hint} /><button className="quit-game" type="button" disabled={status !== 'answering'} onClick={handleQuit}>↳ Dừng cuộc chơi · Nhận {formatMoney(correctCount ? PRIZES[correctCount - 1] : 0)}</button></aside></div></div>;
}
