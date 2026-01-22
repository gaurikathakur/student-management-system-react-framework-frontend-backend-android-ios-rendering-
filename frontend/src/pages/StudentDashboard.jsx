import AIChatHelp from "../components/AIChatHelp.jsx";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJSON } from "../api.js";
import Swal from "sweetalert2";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
export default function StudentDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [students, setStudents] = useState([]);

  // ✅ Move these functions above useEffect
  const handleSemesterClick = (sem) => {
  const marksData = {
    "Sem 1": [
      { subject: "Maths 🧮", marks: 82 },
      { subject: "Programming 💻", marks: 88 },
      { subject: "DBMS 🗃️", marks: 76 },
      { subject: "OS ⚙️", marks: 81 },
    ],
    "Sem 2": [
      { subject: "AI 🤖", marks: 84 },
      { subject: "ML 🧠", marks: 87 },
      { subject: "Networks 🌐", marks: 80 },
      { subject: "DSA 📊", marks: 83 },
    ],
    "Sem 3": [
      { subject: "Cloud ☁️", marks: 86 },
      { subject: "Big Data 📈", marks: 82 },
      { subject: "Cybersecurity 🔐", marks: 78 },
      { subject: "IoT 🌍", marks: 85 },
    ],
    "Sem 4": [
      { subject: "Deep Learning 🧩", marks: 89 },
      { subject: "NLP 💬", marks: 84 },
      { subject: "Data Visualization 📊", marks: 88 },
      { subject: "Capstone Project 🎓", marks: 91 },
    ],
  };

  if (!marksData[sem]) {
    Swal.fire({
      title: "Data not available",
      text: `No detailed marks found for ${sem}.`,
      icon: "warning",
      confirmButtonColor: "#f39c12",
    });
    return;
  }

  const details = marksData[sem]
    .map(
      (m) =>
        `<div style="padding:6px 0;border-bottom:1px solid #ddd;"><b>${m.subject}</b> – ${m.marks}%</div>`
    )
    .join("");

  Swal.fire({
    title: `${sem} Performance`,
    html: `
      <div style="
        text-align:left;
        font-size:15px;
        background:linear-gradient(135deg,#e3f2fd,#ffffff);
        padding:15px;
        border-radius:12px;
        box-shadow:inset 0 0 10px rgba(0,0,0,0.1);
      ">
        ${details}
      </div>
      <p style="font-size:13px;color:#555;margin-top:10px;">
        🧠 This breakdown helps you analyze your strongest and weakest subjects.
      </p>
    `,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    background: "#fdfdfd",
    iconHtml: "📊",
    confirmButtonColor: "#4b6cb7",
    confirmButtonText: "Got it!",
  });
};


  const handleAttendanceHover = () => {
  const attendance = [
    { date: "Oct 1", present: true },
    { date: "Oct 2", present: false },
    { date: "Oct 3", present: true },
    { date: "Oct 4", present: true },
    { date: "Oct 5", present: false },
    { date: "Oct 6", present: true },
    { date: "Oct 7", present: true },
  ];

  const present = attendance.filter((a) => a.present).length;
  const total = attendance.length;
  const percentage = Math.round((present / total) * 100);

  const details = attendance
    .map(
      (a) => `
        <div style="
          display:flex;
          justify-content:space-between;
          padding:6px 0;
          border-bottom:1px solid #ddd;
        ">
          <span style="font-weight:500;">${a.date}</span>
          <span style="color:${a.present ? '#2ecc71' : '#e74c3c'};">
            ${a.present ? '✅ Present' : '❌ Absent'}
          </span>
        </div>
      `
    )
    .join("");

  Swal.fire({
    title: `📅 Attendance Breakdown`,
    html: `
      <div style="
        background: linear-gradient(135deg, #f0f7ff, #ffffff);
        border-radius: 12px;
        padding: 15px;
        text-align: left;
        font-size: 15px;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
      ">
        ${details}
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid #ccc;">
          <b>Total Present:</b> ${present}/${total}<br/>
          <b>Attendance Percentage:</b> ${percentage}%
        </div>
      </div>
      <p style="font-size:13px;color:#555;margin-top:10px;">
        🧭 Keep maintaining 85%+ attendance to stay exam eligible!
      </p>
    `,
    background: "#fdfdfd",
    confirmButtonText: "Close",
    confirmButtonColor: "#4b6cb7",
    showClass: {
      popup: "animate__animated animate__fadeInUp",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutDown",
    },
  });
};
const handleLibraryHover = () => {
  const books = [
    { title: "Deep Learning with Python", issue: "Sep 2", return: "Sep 25", fine: "₹0" },
    { title: "Data Structures in C", issue: "Oct 1", return: "Oct 15", fine: "₹20" },
  ];

  const details = books
    .map(
      (b) => `
        <div style="padding:6px 0;border-bottom:1px solid #eee;">
          <b>📖 ${b.title}</b><br/>
          <span style="color:#555;">Issue: ${b.issue} • Return: ${b.return}</span><br/>
          <span style="color:${b.fine !== "₹0" ? "#e74c3c" : "#27ae60"};">Fine: ${b.fine}</span>
        </div>`
    )
    .join("");

  Swal.fire({
    title: "📚 Library Record Details",
    html: `<div style="text-align:left;padding:10px;">${details}</div>`,
    confirmButtonColor: "#4b6cb7",
    background: "#fff",
    showClass: { popup: "animate__animated animate__fadeInUp" },
    hideClass: { popup: "animate__animated animate__fadeOutDown" },
  });
};

// 🧾 ASSIGNMENT HOVER
const handleAssignmentHover = () => {
  const tasks = [
    { subject: "ML", task: "Project Report", due: "10 Nov", status: "✅ Submitted" },
    { subject: "DBMS", task: "ER Diagram", due: "14 Nov", status: "⚠️ Pending" },
    { subject: "Cloud", task: "Lab Manual", due: "18 Nov", status: "🕒 In Progress" },
  ];

  const details = tasks
    .map(
      (t) => `
      <div style="padding:6px 0;border-bottom:1px solid #eee;">
        <b>${t.subject}:</b> ${t.task}<br/>
        <span style="color:#555;">Due: ${t.due}</span><br/>
        <span style="font-weight:600;color:
          ${t.status.includes("✅") ? "#27ae60" :
            t.status.includes("⚠️") ? "#e67e22" : "#2980b9"};">
          ${t.status}
        </span>
      </div>`
    )
    .join("");

  Swal.fire({
    title: "🧾 Assignment Tracker Details",
    html: `<div style="text-align:left;padding:10px;">${details}</div>`,
    confirmButtonColor: "#4b6cb7",
    background: "#fff",
    showClass: { popup: "animate__animated animate__fadeInUp" },
    hideClass: { popup: "animate__animated animate__fadeOutDown" },
  });
};
  // ✅ Only one useEffect needed
  useEffect(() => {
    if (!id) return;
    getJSON(`/student/dashboard/${id}`)
      .then(async (res) => {
        setData(res);

        if (res.student?.role === "admin") {
          try {
            const all = await getJSON("/admin/students");
            setStudents(all);
          } catch (err) {
            console.error("Failed to load all students:", err);
          }
        }
      })
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, [id]);


  if (!data) return <div style={{ padding: 40 }}>Loading dashboard...</div>;

  const { student = {} } = data || {};

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#f4f6ff", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          color: "white",
          textAlign: "center",
          padding: "70px 20px",
          position: "relative",
        }}
      >
        <button
  onClick={() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }}
  style={{
    position: "absolute",
    right: 30,
    top: 25,
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    border: "none",
    color: "white",
    borderRadius: 8,
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "0.3s",
  }}
  onMouseEnter={(e) =>
    (e.target.style.boxShadow = "0 6px 14px rgba(0,0,0,0.4)")
  }
  onMouseLeave={(e) =>
    (e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)")
  }
>
  Logout
</button>


        <h1 style={{ fontSize: "2.8em", fontWeight: 800, margin: 0, textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>
          Welcome, {student.name}
        </h1>
        <p style={{ fontSize: "1.2em", marginTop: 10 }}>
          {student.department || "Department"} • Semester {student.semester || "N/A"}
        </p>
      </div>

      {/* Content Grid */}
      <div style={{ padding: "30px 40px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        
        {/* LEFT SIDE */}
        <div>
          {/* Profile */}
          <div style={cardStyle}>
  <h2>🎓 Profile Overview</h2>

  {/* 🖼 Student Image (add this here) */}
  {/* 🖼 Student Image */}
  <img
  src={`/images/${(student.name || "default").toLowerCase()}.jpg`}
  alt={student.name}
  style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    margin: "15px auto",
    border: "4px solid #4b6cb7",
    boxShadow: "0 0 12px rgba(75,108,183,0.3)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.08)";
    e.target.style.boxShadow = "0 0 25px rgba(75,108,183,0.6)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 0 12px rgba(75,108,183,0.3)";
  }}
  onError={(e) => {
    // Fallback logic for missing images
    const name = (student.name || "").toLowerCase();
    if (name === "rahul") e.target.src = "/images/rahul.jpg";
    else if (name === "aarav") e.target.src = "/images/aarav.jpg";
    else e.target.src = "/images/kavya.jpg";
  }}
/>



  {/* existing details below */}
  <p><b>Student ID:</b> {student.id}</p>
  <p><b>CGPA:</b> {student.cgpa}</p>
  <p><b>Hometown:</b> {student.hometown}</p>
  <p><b>Address:</b> {student.current_address}</p>
  <p><b>Languages Known:</b> {(student.languages_known || []).join(", ")}</p>
</div>


          {/* Timetable */}
          <div style={cardStyle}>
            <h2>🗓 Weekly Timetable</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#eef2ff" }}>
                  <th>Day</th><th>Time</th><th>Subject</th><th>Professor</th><th>Room</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: "Monday", time: "9–11", subject: "AI & ML", prof: "Dr. Neha Bansal", room: "A-201" },
                  { day: "Tuesday", time: "10–12", subject: "Data Science", prof: "Prof. Raj Mehta", room: "B-104" },
                  { day: "Wednesday", time: "12–2", subject: "Operating Systems", prof: "Dr. Kavita Rao", room: "C-303" },
                  { day: "Friday", time: "9–11", subject: "Cloud Computing", prof: "Dr. Arjun Patel", room: "Lab-1" },
                ].map((t, i) => (
                  <tr key={i}>
                    <td>{t.day}</td><td>{t.time}</td><td>{t.subject}</td><td>{t.prof}</td><td>{t.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Library */}
          <div style={cardStyle}>
            <h2>
  📚 Library Records{" "}
  <span
    onClick={handleLibraryHover}
    style={{ fontSize: 14, color: "#4b6cb7", cursor: "pointer", marginLeft: 8 }}
  >
    (view details)
  </span>
</h2>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#eef2ff" }}>
                  <th>Book</th><th>Issue</th><th>Return</th><th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { book: "Deep Learning with Python", issue: "2025-09-02", return: "2025-09-25", fine: 0 },
                  { book: "Data Structures in C", issue: "2025-10-01", return: "2025-10-15", fine: 20 },
                ].map((b, i) => (
                  <tr key={i}>
                    <td>{b.book}</td><td>{b.issue}</td><td>{b.return}</td><td>{b.fine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Faculty */}
          <div style={cardStyle}>
            <h2>👨‍🏫 Faculty Mentors</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { name: "Dr. Kavita Rao", subject: "Operating Systems", edu: "Ph.D. IIT Bombay", exp: "10 yrs" },
                { name: "Prof. Raj Mehta", subject: "Data Science", edu: "M.Tech IIIT Hyderabad", exp: "7 yrs" },
              ].map((p, i) => (
                <div key={i} style={{ background: "#f8f9ff", padding: 12, borderRadius: 10 }}>
                  <p><b>{p.name}</b></p>
                  <p>{p.subject}</p>
                  <p>{p.edu}</p>
                  <p>{p.exp} experience</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🌟 Daily Motivation */}
          <div style={cardStyle}>
            <h2>🌟 Daily Motivation</h2>
            <p style={{ fontStyle: "italic", color: "#555" }}>
              "Success is the sum of small efforts, repeated day in and day out."
            </p>
            <p style={{ textAlign: "right", color: "#888" }}>– Robert Collier</p>
          </div>

          {/* 🔥 Study Streak Tracker */}
          <div style={cardStyle}>
            <h2>🔥 Study Streak</h2>
            <p>You’ve studied <b>6 consecutive days</b> this week!</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: i < 6 ? "#4facfe" : "#ccc",
                  }}
                ></div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
              Keep your streak alive for rewards!
            </p>
          </div>

          {/* Attendance Overview */}
          <div style={cardStyle}>
            <h2>
  📅 Attendance Overview{" "}
  <span
    onClick={handleAttendanceHover}
    style={{
      fontSize: 14,
      color: "#4b6cb7",
      cursor: "pointer",
      marginLeft: 8,
    }}
  >
    (hover for details)
  </span>
</h2>

            <p>Total Attendance: <b>88%</b></p>
            <div style={{ background: "#eee", borderRadius: 10, height: 15 }}>
              <div
                style={{
                  width: "88%",
                  height: "100%",
                  background: "linear-gradient(90deg,#4facfe,#00f2fe)",
                  borderRadius: 10,
                }}
              ></div>
            </div>
            <p style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
              Keep attendance above 85% for exam eligibility.
            </p>
          </div>

          {/* 🧾 Assignment Tracker */}
          <div style={cardStyle}>
            <h2>
  🧾 Assignment Tracker{" "}
  <span
    onClick={handleAssignmentHover}
    style={{ fontSize: 14, color: "#4b6cb7", cursor: "pointer", marginLeft: 8 }}
  >
    (view details)
  </span>
</h2>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#eef2ff" }}>
                  <th>Subject</th>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { subject: "ML", task: "Project Report", due: "10 Nov", status: "✅ Submitted" },
                  { subject: "DBMS", task: "ER Diagram", due: "14 Nov", status: "⚠️ Pending" },
                  { subject: "Cloud", task: "Lab Manual", due: "18 Nov", status: "🕒 In Progress" },
                ].map((a, i) => (
                  <tr key={i}>
                    <td>{a.subject}</td>
                    <td>{a.task}</td>
                    <td>{a.due}</td>
                    <td style={{
                      color:
                        a.status.includes("✅") ? "green" :
                        a.status.includes("⚠️") ? "#e67e22" : "#3498db",
                      fontWeight: 600
                    }}>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🎯 Career & Placement Tracker */}
          <div style={cardStyle}>
            <h2>🎯 Career & Placement Tracker</h2>
            <p><b>Internship Status:</b> Applied for “AI Research Intern” at Google</p>
            <p><b>Resume Score:</b> 82 / 100</p>
            <p><b>Mock Interview:</b> Scheduled on 10 Nov 2025</p>
            <div style={{ background: "#eee", borderRadius: 10, height: 15 }}>
              <div
                style={{
                  width: "82%",
                  height: "100%",
                  background: "linear-gradient(90deg,#00b09b,#96c93d)",
                  borderRadius: 10,
                }}
              ></div>
            </div>
            <p style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
              Great progress! Keep applying to more roles to reach 100%.
            </p>
          </div>

          {/* 🤖 AI Learning Recommendations */}
          <div style={cardStyle}>
            <h2>🤖 Smart AI Recommendations</h2>
            <ul>
              <li>Enroll in “Advanced Data Structures” to boost algorithmic skills.</li>
              <li>Practice 2 LeetCode problems daily for placement prep.</li>
              <li>Join the “AI Ethics” seminar next week.</li>
            </ul>
          </div>

          {/* 👥 All Students Overview — visible only to admins */}
          {student.role === "admin" && (
            <div style={cardStyle}>
              <h2>👥 All Students Overview</h2>
              {students.length === 0 ? (
                <p>No student records found.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#eef2ff" }}>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th>CGPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.department}</td>
                        <td>{s.semester}</td>
                        <td>{s.cgpa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 🎤 Upcoming Events */}
          <div style={cardStyle}>
            <h2>🎤 Upcoming Events</h2>
            <ul>
              <li>AI Symposium – 8 Nov 2025</li>
              <li>Hackathon 2025 – 15 Nov 2025</li>
              <li>Cloud Computing Workshop – 22 Nov 2025</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE (unchanged) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* 🕐 Weekly Learning Hours */}
          <div style={cardStyle}>
            <h2>🕐 Weekly Learning Hours</h2>
            <p>Target: <b>25 hrs</b></p>
            <div style={{ background: "#ddd", borderRadius: 10, height: 18, marginTop: 10 }}>
              <div
                style={{
                  width: "68%",
                  height: "100%",
                  background: "linear-gradient(90deg,#667eea,#764ba2)",
                  borderRadius: 10,
                }}
              ></div>
            </div>
            <p style={{ marginTop: 6, fontSize: 13 }}>17/25 hrs completed</p>
          </div>

          {/* 💳 Fee Installments */}
          <div style={cardStyle}>
            <h2>💳 Fee Installments</h2>
            <ul>
              <li>Installment 1 – ₹25,000 – ✅ Paid</li>
              <li>Installment 2 – ₹25,000 – ⚠️ Due 15 Nov 2025</li>
            </ul>
          </div>

          {/* 📢 Notice Board */}
          <div style={cardStyle}>
            <h2>📢 Notice Board</h2>
            <ul>
              <li>AI Seminar rescheduled to 10 Nov</li>
              <li>Library closed on 5 Nov</li>
              <li>Midterm results on 20 Nov</li>
            </ul>
          </div>

          {/* 📈 Performance Trend */}
          <div style={cardStyle}>
            <h2>📈 Performance Trend</h2>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <LineChart
                  data={[
                    { month: "July", score: 75 },
                    { month: "Aug", score: 82 },
                    { month: "Sep", score: 78 },
                    { month: "Oct", score: 85 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#6246ea" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 🎯 Semester Performance */}
          <div style={cardStyle}>
  <h2>🎯 Semester-wise Performance</h2>
  <div style={{ width: "100%", height: 250 }}>
    <ResponsiveContainer>
      <BarChart
        data={[
          { semester: "Sem 1", cgpa: 8.2 },
          { semester: "Sem 2", cgpa: 8.4 },
          { semester: "Sem 3", cgpa: 8.0 },
          { semester: "Sem 4", cgpa: 8.6 },
        ]}
        onClick={(e) =>
          e?.activeLabel && handleSemesterClick(e.activeLabel)
        }
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="semester" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cgpa" fill="#7b61ff" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
  <p style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
    💡 Click on any semester bar to view detailed marks.
  </p>
</div>


          {/* 🧠 Skill Proficiency */}
          <div style={cardStyle}>
            <h2>🧠 Skill Proficiency</h2>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <BarChart
                  data={[
                    { skill: "Python", level: 90 },
                    { skill: "DSA", level: 80 },
                    { skill: "ML", level: 85 },
                    { skill: "SQL", level: 75 },
                    { skill: "AI", level: 88 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="level" fill="#00b894" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 📅 Deadlines */}
          <div style={cardStyle}>
            <h2>📅 Upcoming Deadlines</h2>
            <ul>
              <li>ML Project – 12 Nov 2025</li>
              <li>Cloud Report – 16 Nov 2025</li>
              <li>DSA Midterm – 21 Nov 2025</li>
            </ul>
          </div>

          {/* 🏥 Health */}
          <div style={cardStyle}>
            <h2>🏥 Health & Hospital Credentials</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#eef2ff" }}>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { param: "Blood Pressure", value: "118/76 mmHg", status: "Normal" },
                  { param: "Heart Rate", value: "74 bpm", status: "Normal" },
                  { param: "BMI", value: "22.1", status: "Healthy" },
                  { param: "Last Checkup", value: "2025-10-20", status: "Fit" },
                ].map((h, i) => (
                  <tr key={i}>
                    <td>{h.param}</td>
                    <td>{h.value}</td>
                    <td
                      style={{
                        color:
                          h.status === "Normal" || h.status === "Healthy" || h.status === "Fit"
                            ? "green"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {h.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AIChatHelp />
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
};
