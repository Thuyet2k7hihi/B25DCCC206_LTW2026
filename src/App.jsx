import { useMemo, useState } from 'react';
import StudentList from './components/StudentList';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, class: 'B25DCCN010' },
  { id: 2, name: 'Trần Thị Bình', score: 7.2, class: 'B25DCCN011' },
  { id: 3, name: 'Lê Minh Cường', score: 4.3, class: 'B25DCCN010' }
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState('all');
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [error, setError] = useState('');

  const filteredStudents = useMemo(() => {
    if (filter === 'good') return students.filter(({ score }) => score >= 8);
    if (filter === 'failed') return students.filter(({ score }) => score < 5);
    return students;
  }, [students, filter]);

  const averageScore = useMemo(() => {
    if (students.length === 0) return 0;
    return students.reduce((sum, student) => sum + student.score, 0) / students.length;
  }, [students]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedClass = studentClass.trim();
    const numericScore = Number(score);

    if (!trimmedName || !trimmedClass || score === '') {
      setError('Vui lòng nhập đầy đủ Họ tên, Điểm số và Lớp.');
      return;
    }

    if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setError('Điểm số phải nằm trong khoảng từ 0 đến 10.');
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: trimmedName,
      score: numericScore,
      class: trimmedClass
    };

    setStudents((currentStudents) => [...currentStudents, newStudent]);
    setName('');
    setScore('');
    setStudentClass('');
    setError('');
  };

  const handleDelete = (id) => {
    setStudents((currentStudents) => currentStudents.filter((student) => student.id !== id));
  };

  return (
    <main className="page">
      <section className="app-card">
        <header className="header">
          <div>
            <p className="eyebrow">Bài thực hành 01</p>
            <h1>Quản lý điểm sinh viên</h1>
            <p className="subtitle">Theo dõi danh sách, thêm, xóa và lọc sinh viên.</p>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span>Tổng sinh viên</span>
            <strong>{students.length}</strong>
          </div>
          <div className="stat-card">
            <span>Điểm trung bình</span>
            <strong>{averageScore.toFixed(2)}</strong>
          </div>
          <div className="stat-card">
            <span>Sinh viên Giỏi</span>
            <strong>{students.filter(({ score }) => score >= 8).length}</strong>
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">
            <h2>Thêm sinh viên mới</h2>
            <span>Điểm hợp lệ: 0 – 10</span>
          </div>

          <form className="student-form" onSubmit={handleSubmit}>
            <label>
              Họ tên
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nguyễn Văn A"
              />
            </label>
            <label>
              Điểm số
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={score}
                onChange={(event) => setScore(event.target.value)}
                placeholder="8.5"
              />
            </label>
            <label>
              Lớp
              <input
                value={studentClass}
                onChange={(event) => setStudentClass(event.target.value)}
                placeholder="B25DCCN010"
              />
            </label>
            <button className="add-button" type="submit">+ Thêm sinh viên</button>
          </form>

          {error && <p className="error">{error}</p>}
        </section>

        <section className="panel">
          <div className="toolbar">
            <div>
              <h2>Danh sách sinh viên</h2>
              <p>{filteredStudents.length} sinh viên đang hiển thị</p>
            </div>
            <div className="filters" aria-label="Bộ lọc sinh viên">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tất cả</button>
              <button className={filter === 'good' ? 'active' : ''} onClick={() => setFilter('good')}>Giỏi ≥ 8</button>
              <button className={filter === 'failed' ? 'active' : ''} onClick={() => setFilter('failed')}>Trượt &lt; 5</button>
            </div>
          </div>

          <StudentList students={filteredStudents} onDelete={handleDelete} />
        </section>
      </section>
    </main>
  );
};

export default App;
