import React, {useEffect, useState} from 'react';
import { getStudentById, getToken } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function Student() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const nav = useNavigate();
  useEffect(()=>{ if(!getToken()) nav('/login'); }, []);
  useEffect(()=>{
    if (!id) return;
    (async ()=>{
      const res = await getStudentById(id);
      setStudent(res.student);
    })();
  }, [id]);
  if (!student) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h2>Student: {student.Name}</h2>
      <p>Username: {student.Username}</p>
      <p>Department: {student.DepartmentName}</p>
      <p>CGPA: {student.CGPA}, Semester: {student.Semester}</p>
      <p>Attendance: 90% (example)</p>
    </div>
  );
}
