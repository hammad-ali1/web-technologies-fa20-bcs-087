import axiosCreator from "axios";

const axios = axiosCreator.create({
  baseURL: "http://localhost:5000/api",
});

const api = {
  getVoltageReadings: async () => {
    const response = await axios.get("/voltage");
    return response.data as ModelTypes.VoltageReading[];
  },
  deleteVoltageReading: async (id: string) => {
    const response = await axios.delete(`/voltage/${id}`);
  },
  addVoltageReading: async (voltage: ModelTypes.VoltageReading) => {
    const response = await axios.post("/voltage", voltage);
  },
};

export default api;
