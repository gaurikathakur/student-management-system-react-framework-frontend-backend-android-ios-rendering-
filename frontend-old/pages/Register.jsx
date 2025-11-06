import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    Name: "",
    Username: "",
    Password: "",
    Role: "Student",
    Course: "",
    DepartmentId: "",
    Semester: "",
    CGPA: "",
    MobileNo: "",
    DOB: "",
    Hometown: "",
  });

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await register(form);
    setLoading(false);
    if (res.ok) {
      alert("Registration successful! You can now login.");
      nav("/login");
    } else {
      alert(res.error || "Registration failed.");
    }
  };

  return (
    <div className="container">
      <h2>Student / Admin Registration</h2>
      <form onSubmit={submit}>
        <input
          name="Name"
          placeholder="Full Name"
          value={form.Name}
          onChange={handleChange}
          required
        />
        <input
          name="Username"
          placeholder="Username"
          value={form.Username}
          onChange={handleChange}
          required
        />
        <input
          name="Password"
          type="password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
          required
        />

        <select name="Role" value={form.Role} onChange={handleChange} required>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>

        <input
          name="Course"
          placeholder="Course (e.g. B.Tech, BBA, BCA)"
          value={form.Course}
          onChange={handleChange}
        />

        <select
          name="DepartmentId"
          value={form.DepartmentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="1">Computer Science</option>
          <option value="2">Business Administration</option>
          <option value="3">Computer Applications</option>
        </select>

        <input
          name="Semester"
          type="number"
          placeholder="Semester (e.g. 5)"
          value={form.Semester}
          onChange={handleChange}
        />
        <input
          name="CGPA"
          type="number"
          step="0.01"
          placeholder="CGPA (e.g. 8.5)"
          value={form.CGPA}
          onChange={handleChange}
        />
        <input
          name="MobileNo"
          type="tel"
          placeholder="Mobile Number"
          value={form.MobileNo}
          onChange={handleChange}
        />
        <input
          name="DOB"
          type="date"
          placeholder="Date of Birth"
          value={form.DOB}
          onChange={handleChange}
        />
        <input
          name="Hometown"
          placeholder="Hometown"
          value={form.Hometown}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
