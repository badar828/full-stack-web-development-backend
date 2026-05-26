import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example APIs (we assume backend routes exist)
        const users = await API.get("/auth/users", {
          headers: { Authorization: token }
        });

        const doctors = await API.get("/doctors");
        const appointments = await API.get("/appointments", {
          headers: { Authorization: token }
        });

        setStats({
          users: users.data.length || 0,
          doctors: doctors.data.length || 0,
          appointments: appointments.data.length || 0
        });
      } catch (err) {
        console.log("Dashboard error:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏥 Hospital Dashboard</h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>👥 Users</h2>
          <p>{stats.users}</p>
        </div>

        <div style={styles.card}>
          <h2>🩺 Doctors</h2>
          <p>{stats.doctors}</p>
        </div>

        <div style={styles.card}>
          <h2>📅 Appointments</h2>
          <p>{stats.appointments}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial"
  },
  title: {
    marginBottom: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontSize: "18px"
  }
};