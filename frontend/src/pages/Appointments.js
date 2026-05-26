import { useState } from "react";
import API, { NEST_API } from "../api"; 
import "../styles.css";

export default function Appointments() {
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    problem: "" 
  });

  const doctors = [
    {
      name: "Dr. Arthur - ENT Specialist",
      image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Ahmed - Cardiologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Aisha - Psychiatrist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Sarah - Neurologist",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Dr. Ali - Dentist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Hina - Pediatrician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. James - Orthopedic",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Dr. Elena - Dermatologist",
      image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Ryan - Ophthalmologist",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Priya - Oncologist",
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const selectDoctor = (doctorName) => {
    setForm({
      ...form,
      doctor: doctorName
    });
  };

  const bookAppointment = async () => {
    if (!form.doctor || !form.date || !form.problem) {
      alert("Please fill out all fields before confirming.");
      return;
    }

    try {
      // Maps component state values to match NestJS entity keys
      const appointmentPayload = {
        doctorName: form.doctor,
        date: form.date,
        patientName: form.problem, // Storing symptom profile string into the patient name column context
        time: "12:00 PM" 
      };

      // Sends target payload request over NEST_API (NestJS running on port 3001)
      const res = await NEST_API.post("/appointments", appointmentPayload);
      
      alert("Appointment recorded successfully in PostgreSQL and mirrored to MongoDB!");
      setForm({ doctor: "", date: "", problem: "" });
    } catch (err) {
      console.error(err);
      alert("Booking failed. Ensure NestJS is listening on port 3001 and Express is listening on port 5000.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title" id="home">Protecting and Taking Care Of Your Health</h1>
      
      <h2 className="section-subtitle" id="doctors">Meet Our Specialized Doctors</h2>
      
      <div className="doctor-grid">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="doctor-card"
            style={{
              borderColor: form.doctor === doc.name ? "#4a3aff" : "#eef2f6",
              background: form.doctor === doc.name ? "#f8f9ff" : "#ffffff",
              transform: form.doctor === doc.name ? "scale(1.03)" : "none"
            }}
            onClick={() => selectDoctor(doc.name)}
          >
            <img src={doc.image} alt={doc.name} className="doctor-avatar" />
            <h3>{doc.name.split(" - ")[0]}</h3>
            <p className="specialty-badge">{doc.name.split(" - ")[1]}</p>
            <span className="select-action-label">
              {form.doctor === doc.name ? "✓ Selected" : "Click to Choose"}
            </span>
          </div>
        ))}
      </div>

      <div className="appointment-box">
        <h2>Book Appointment</h2>

        <input
          type="text"
          name="doctor"
          placeholder="Selected Doctor Profile"
          value={form.doctor}
          readOnly
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <textarea
          name="problem"
          placeholder="Describe your symptoms or reason for visit..."
          value={form.problem}
          onChange={handleChange}
        ></textarea>

        <button onClick={bookAppointment}>
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}