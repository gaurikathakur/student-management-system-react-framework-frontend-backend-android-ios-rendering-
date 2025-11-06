import React, { useState } from 'react';
import { login, saveToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [u,setU]=useState(''); const [p,setP]=useState('');
  const [err,setErr]=useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login({ username: u, password: p });
    if (res?.token) {
      saveToken(res.token);
      if (res.user.role === 'Admin') nav('/admin');
      else nav('/student/' + res.user.Id);
    } else setErr(res.error || 'Login failed');
  };

  return (
    <div style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" value={u} onChange={e=>setU(e.target.value)} required />
        <input placeholder="Password" type="password" value={p} onChange={e=>setP(e.target.value)} required />
        <button>Login</button>
      </form>
      {err && <div style={{color:'red'}}>{err}</div>}
    </div>
  );
}
