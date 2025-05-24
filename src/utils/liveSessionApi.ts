import axios from "axios";

const API_URL = "http://localhost:8080/live-session";


export const getLiveSessions = async () => {
    return await axios.get(`${API_URL}`)
}


export const getLive = async (id: number) => {
    return await axios.get(`${API_URL}/${id}`)
}