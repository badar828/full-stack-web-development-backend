import { useState } from "react";
import API from "../api";
import "../styles.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Login</h2>

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}