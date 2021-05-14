import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const homeData = async () => {
  return await api.get("/home");
};
