"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/authApi";

interface User {
    id: number;
    username: string;
    email: string;
    elo: number;
    is_admin: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            checkAuth(token)
                .then((res) => {
                    res = res.data;

                    setUser({
                        id: res.data.id,
                        username: res.data.username,
                        email: res.data.email,
                        elo: res.data.elo,
                        is_admin: res.data.is_admin,
                    });
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    router.push("/login");
                });
        }
    }, []);

    // Hàm xử lý đăng nhập
    const login = (token: string) => {
        localStorage.setItem("token", token);
        checkAuth(token)
            .then((res) => {
                res = res.data;
                setUser({
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                    elo: res.data.elo,
                    is_admin: res.data.is_admin,
                });
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            });
    };

    // Hàm xử lý đăng xuất
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook để sử dụng AuthContext
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
