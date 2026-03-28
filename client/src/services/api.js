import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const getDashboardData = () => {
  return api.get("/dashboard");
};

// Task APIs
export const createTask = (taskData) => api.post("/tasks", taskData);
export const getTasks = () => api.get("/tasks");
export const getTask = (id) => api.get(`/tasks/${id}`);
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// Lead APIs (can be implement on UI as well But Not Yet Implemented)
export const createLead = (leadData) => api.post("/leads", leadData);
export const getLeads = () => api.get("/leads");
export const getLead = (id) => api.get(`/leads/${id}`);
export const updateLead = (id, leadData) => api.put(`/leads/${id}`, leadData);
export const deleteLead = (id) => api.delete(`/leads/${id}`);

export default api;
