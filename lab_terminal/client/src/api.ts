import axiosCreator from "axios";

const axios = axiosCreator.create({
  baseURL: "http://localhost:5000/api",
});

const api = {
  getVoltageReadings: async () => {
    const response = await axios.get("/voltage");
    return response.data as ModelTypes.VoltageReading[];
  },
};

export default api;
