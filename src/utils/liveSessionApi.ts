"use server";
import axios from "axios";

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:8888";

export const getLiveSessions = async () => {
    console.log("getLiveSessins: " + BACKEND_API_URL);
    return await axios.get(`${BACKEND_API_URL}/live-session`);
};

export const getLive = async (id: number) => {
    return await axios.get(`${BACKEND_API_URL}/live-session/${id}`);
};
