import { useState } from "react";
import API from "../api";
import "../styles.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}