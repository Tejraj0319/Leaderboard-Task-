import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://leaderboard-task-boo1.onrender.com/api/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
