"use server"
import axios from "axios";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_API_URL;
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

type ChatRequest = {
    message: string
};

export const sendChat = async (id: number, data: ChatRequest) => {
     const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
    
    return await axios.post(
        `${BACKEND_URL}/chat/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}