import axios from "axios";

const API_URL = "http://localhost:8080/chat";

type ChatRequest = {
    message: string
};

export const sendChat = async (id: number, data: ChatRequest) => {
    var token = localStorage.getItem('token');

    return await axios.post(
        `${API_URL}/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}