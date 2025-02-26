import axios from "axios";

const API_URL = "http://localhost:8080/video";

export const getVideos = async () => {
    return await axios.get(`${API_URL}`);
};