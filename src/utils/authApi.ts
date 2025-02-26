import axios from "axios";

// Cấu hình API
const API_URL = "http://localhost:8080";

// Hàm đăng ký
export const registerUser = async (data: { username: string; email: string; password: string }) => {
    return await axios.post(`${API_URL}/register`, data);
};

// Hàm đăng nhập
export const loginUser = async (data: { username: string; password: string }) => {
    return await axios.post(`${API_URL}/login`, data);
};

// Hàm kiểm tra token
export const checkAuth = async (token: string) => {
    return await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
