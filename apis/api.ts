import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.29:18001/api",
  withCredentials: true,
});
