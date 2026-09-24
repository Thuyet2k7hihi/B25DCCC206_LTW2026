import StudentItem from './StudentItem';

const StudentList = ({ students, onDelete }) => {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Điểm</th>
            <th>Lớp</th>
            <th>Xếp loại</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <StudentItem key={student.id} student={student} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty">Không có sinh viên phù hợp.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
