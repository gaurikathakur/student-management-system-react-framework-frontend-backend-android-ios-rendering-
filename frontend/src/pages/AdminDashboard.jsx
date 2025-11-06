import React, { useEffect, useState } from "react";
import { getJSON, del, putJSON } from "../api.js";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([
    {
      name: "Aarav Sharma",
      date: "2025-11-02",
      teacher: "Dr. Neha Bansal",
      reason: "Family Event",
      status: "Pending",
    },
    {
      name: "Kavya Iyer",
      date: "2025-11-01",
      teacher: "Prof. Raj Mehta",
      reason: "Festival",
      status: "Pending",
    },
  ]);
  const [noticeText, setNoticeText] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const res = await getJSON("/admin/students");
    if (res.error) alert(res.error);
    else setStudents(res);
  }

  async function promote(id) {
    if (!window.confirm("Promote this student to Admin?")) return;
    const res = await putJSON(`/admin/promote/${id}`, {});
    alert(res.message || res.error);
    loadStudents();
  }

  async function delStudent(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    const res = await del(`/admin/delete/${id}`);
    alert(res.message || res.error);
    loadStudents();
  }

  function viewStudent(id) {
    nav(`/student/${id}`);
  }

  function logout() {
    localStorage.clear();
    nav("/login");
  }

  function handleApprove(index) {
    if (!window.confirm("✅ Are you sure you want to approve this leave?")) return;
    const updated = [...leaveRequests];
    updated[index].status = "Approved";
    setLeaveRequests(updated);
  }

  function handleReject(index) {
    if (!window.confirm("❌ Are you sure you want to reject this leave?")) return;
    const updated = [...leaveRequests];
    updated[index].status = "Rejected";
    setLeaveRequests(updated);
  }

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const avgCGPA =
    students.length > 0
      ? (students.reduce((a, b) => a + (b.cgpa || 0), 0) / students.length).toFixed(2)
      : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#222",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 40px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h2 style={{ color: "#4b2ae6", fontWeight: 700 }}>Admin Portal</h2>
        <input
          type="text"
          placeholder="🔍 Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            width: "280px",
          }}
        />
        <button
          onClick={logout}
          style={{
            background: "#dc3545",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Section */}
      <div
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "40px 50px",
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          width: "95%",
          maxWidth: "1100px",
          margin: "40px auto",
        }}
      >
        <h1 style={{ color: "#5c2ae6", fontWeight: 700 }}>🎓 Admin Dashboard</h1>
        <p style={{ color: "#555", marginBottom: 20 }}>
          Manage students, approve leaves, and publish announcements.
        </p>

        {/* Stats Summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 30,
          }}
        >
          {[
            { label: "Total Students", value: students.length, color: "#6c5ce7" },
            {
              label: "Avg CGPA",
              value: avgCGPA,
              color: "#00b894",
            },
            { label: "Pending Leaves", value: leaveRequests.filter(l => l.status === "Pending").length, color: "#fdcb6e" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 12,
                padding: 20,
                flex: "1 1 200px",
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                borderTop: `4px solid ${stat.color}`,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  color: "#444",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </h3>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: stat.color,
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Department-wise CGPA Chart */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            marginBottom: 40,
          }}
        >
          <h3
            style={{
              color: "#5c2ae6",
              marginBottom: 12,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            📊 Department-wise CGPA Overview
          </h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart
                data={[
                  { dept: "CSE", avg: 8.2 },
                  { dept: "IT", avg: 7.9 },
                  { dept: "ECE", avg: 7.5 },
                ]}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="dept" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="avg"
                  fill="#6c5ce7"
                  radius={[5, 5, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Table */}
        <div style={{ overflowX: "auto", marginBottom: 40 }}>
          <h3 style={{ color: "#5c2ae6" }}>👩‍🎓 Student List</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <thead style={{ background: "#ece8ff" }}>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Department</th>
                <th style={th}>Semester</th>
                <th style={th}>CGPA</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} style={{ background: "#fff" }}>
                    <td style={td}>{s.id}</td>
                    <td style={td}>{s.name}</td>
                    <td style={td}>{s.department}</td>
                    <td style={td}>{s.semester}</td>
                    <td style={td}>{s.cgpa || "N/A"}</td>
                    <td style={{ ...td, textAlign: "center" }}>
                      <button style={btn("#5c2ae6")} onClick={() => viewStudent(s.id)}>
                        View
                      </button>
                      <button style={btn("#28a745")} onClick={() => promote(s.id)}>
                        Promote
                      </button>
                      <button style={btn("#dc3545")} onClick={() => delStudent(s.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Leave Requests */}
        <div style={{ marginTop: 50 }}>
          <h3 style={{ color: "#5c2ae6" }}>📝 Pending Leave Requests</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f3f3" }}>
                <th style={th}>Student</th>
                <th style={th}>Date Issued</th>
                <th style={th}>Teacher</th>
                <th style={th}>Reason</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req, i) => (
                <tr key={i}>
                  <td style={td}>{req.name}</td>
                  <td style={td}>{req.date}</td>
                  <td style={td}>{req.teacher}</td>
                  <td style={td}>{req.reason}</td>
                  <td
                    style={{
                      ...td,
                      color:
                        req.status === "Approved"
                          ? "green"
                          : req.status === "Rejected"
                          ? "red"
                          : "orange",
                      fontWeight: 600,
                    }}
                  >
                    {req.status}
                  </td>
                  <td style={td}>
                    {req.status === "Pending" && (
                      <>
                        <button
                          style={btn("#28a745")}
                          onClick={() => handleApprove(i)}
                        >
                          Approve
                        </button>
                        <button
                          style={btn("#dc3545")}
                          onClick={() => handleReject(i)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Publish Notice */}
        <div style={{ marginTop: 40 }}>
          <h3>📢 Publish Notice</h3>
          <textarea
            placeholder="Type a new announcement..."
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            style={{
              width: "100%",
              height: 80,
              borderRadius: 8,
              padding: 10,
              border: "1px solid #ccc",
              marginBottom: 10,
            }}
          />
          <button
            style={btn("#5c2ae6")}
            onClick={() => {
              if (!noticeText.trim())
                return alert("⚠️ Please enter a notice first!");
              if (window.confirm("📢 Are you sure you want to publish this notice?")) {
                alert("✅ Notice published successfully!");
                setNoticeText("");
              }
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

const th = {
  padding: "12px 10px",
  textAlign: "left",
  fontWeight: "600",
  color: "#333",
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  fontSize: "0.95rem",
  color: "#333",
};

const btn = (bg) => ({
  background: bg,
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "6px 12px",
  margin: "0 4px",
  cursor: "pointer",
  transition: "0.3s",
  fontWeight: 600,
});
