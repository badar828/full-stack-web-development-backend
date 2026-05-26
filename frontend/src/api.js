import axios from "axios";

// Express / MongoDB base instance
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// NestJS / PostgreSQL base instance
export const NEST_API = axios.create({
  baseURL: "http://localhost:3001" 
});

export default API;