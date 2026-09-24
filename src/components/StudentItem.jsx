const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: studentClass } = student;
  const rank = score >= 8 ? 'Giỏi' : score < 5 ? 'Trượt' : 'Đạt';

  return (
    <tr>
      <td>#{id}</td>
      <td className="student-name">{name}</td>
      <td><strong>{score.toFixed(1)}</strong></td>
      <td>{studentClass}</td>
      <td><span className={`badge ${rank.toLowerCase()}`}>{rank}</span></td>
      <td>
        <button className="delete-button" onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default StudentItem;
