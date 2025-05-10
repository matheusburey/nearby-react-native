import axios from "axios";

export const api = axios.create({
	baseURL: "http://192.168.1.60:3333",
	timeout: 5000, // 5 seconds
});
