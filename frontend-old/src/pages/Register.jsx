import React, {useState} from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form,setForm]=useState({Name:'',Username:'',Password:'',Role:'Student',DepartmentId:1});
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.ok) nav('/login');
    else alert(res.error || 'Failed');
  };
  return (
    <div style={{maxWidth:620, margin:'40px auto'}}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.Name} onChange={e=>setForm({...form,Name:e.target.value})} required/>
        <input placeholder="Username" value={form.Username} onChange={e=>setForm({...form,Username:e.target.value})} required/>
        <input placeholder="Password" type="password" value={form.Password} onChange={e=>setForm({...form,Password:e.target.value})} required/>
        <select value={form.Role} onChange={e=>setForm({...form,Role:e.target.value})}>
          <option>Student</option><option>Admin</option>
        </select>
        <input placeholder="DepartmentId (1..)" value={form.DepartmentId} onChange={e=>setForm({...form,DepartmentId:parseInt(e.target.value||1)})} />
        <button>Register</button>
      </form>
    </div>
  );
}
