import React, { useState, useEffect } from "react";

export default function Admin() {
  // Logged-in teacher (you can later make this dynamic)
  const [teacher, setTeacher] = useState({
    Name: "Tanish Sharma",
    Department: "Computer Science",
    Designation: "Assistant Professor",
  });

  // Classes assigned to the teacher
  const [classes, setClasses] = useState([
    { Section: "A1", Course: "B.Tech - CS", Students: 25 },
    { Section: "B1", Course: "B.Tech - CS", Students: 22 },
    { Section: "C1", Course: "BCA - IT", Students: 18 },
  ]);

  // Weekly schedule
  const [schedule, setSchedule] = useState([
    { day: "Monday",  classes: ["A1 - Data Structures", "B1 - DBMS", "Break", "C1 - Web Development"] },
    { day: "Tuesday", classes: ["A1 - Operating Systems", "C1 - Python", "Break", "B1 - AI Lab"] },
    { day: "Wednesday", classes: ["B1 - Software Engg", "A1 - Project Lab", "Break", "Faculty Meeting"] },
    { day: "Thursday", classes: ["A1 - ML", "B1 - Networking", "Break", "C1 - Cloud Computing"] },
    { day: "Friday", classes: ["C1 - AI", "A1 - DBMS", "Break", "B1 - Data Structures"] },
  ]);

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <h2>Teacher Dashboard</h2>

      {/* Teacher Info */}
      <div className="teacher-info" style={{ background: "#f3f4f6", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
        <p><strong>Name:</strong> {teacher.Name}</p>
        <p><strong>Department:</strong> {teacher.Department}</p>
        <p><strong>Designation:</strong> {teacher.Designation}</p>
      </div>

      {/* Class Info */}
      <h3 style={{ color: "#2563eb" }}>📚 Your Classes</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
            <th>Section</th>
            <th>Course</th>
            <th>Total Students</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, i) => (
            <tr key={i} style={{ textAlign: "center", background: i % 2 === 0 ? "#f9fafb" : "#e5e7eb" }}>
              <td>{cls.Section}</td>
              <td>{cls.Course}</td>
              <td>{cls.Students}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Schedule */}
      <h3 style={{ color: "#2563eb" }}>🗓 Weekly Schedule</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
            <th>Day</th>
            <th>9:00 - 10:00</th>
            <th>10:15 - 11:15</th>
            <th>11:30 - 12:30</th>
            <th>12:45 - 1:45</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((s, i) => (
            <tr key={i} style={{ textAlign: "center", background: i % 2 === 0 ? "#f9fafb" : "#e5e7eb" }}>
              <td>{s.day}</td>
              {s.classes.map((cls, j) => <td key={j}>{cls}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div style={{ marginTop: "30px", textAlign: "center", color: "gray" }}>
        <p>Last updated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
