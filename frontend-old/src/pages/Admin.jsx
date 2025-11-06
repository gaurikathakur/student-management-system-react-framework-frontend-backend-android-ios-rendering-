import React, {useState, useEffect} from 'react';
import { getStudents, getToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const nav = useNavigate();
  useEffect(()=>{ if(!getToken()) nav('/login'); }, []);
  const load = async () => {
    const res = await getStudents(q || undefined);
    setStudents(res.students || []);
  };
  useEffect(()=>{ load(); }, []);
  return (
    <div style={{padding:20}}>
      <h2>Admin Dashboard (Gaurika)</h2>
      <div>
        <input placeholder="Department name" value={q} onChange={e=>setQ(e.target.value)}/>
        <button onClick={load}>Search</button>
      </div>
      <table border="1" cellPadding="6" style={{marginTop:10}}>
        <thead><tr><th>Name</th><th>Username</th><th>Dept</th><th>CGPA</th></tr></thead>
        <tbody>
          {students.map(s=>(
            <tr key={s.Id}><td>{s.Name}</td><td>{s.Username}</td><td>{s.DepartmentName}</td><td>{s.CGPA}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
