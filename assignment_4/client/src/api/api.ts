import axiosCreator from "axios";

const axios = axiosCreator.create({
  baseURL: "http://localhost:5000/api/",
});

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers!["Authorization"] = `Bearer ${token}`;
  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Axios Error: ", error.message);
  }
);

const api = {
  login: async (username: string, password: string) => {
    const response = await axios.post("users/login", { username, password });
    localStorage.setItem("token", response.data.token);
  },
  getAllUsers: async () => {
    try {
      const response = await axios.get("users");
      return response.data;
    } catch (error) {
      return [];
    }
  },
  deleteUser: async (id: string) => {
    await axios.delete(`users/${id}`);
  },
};

export default api;
