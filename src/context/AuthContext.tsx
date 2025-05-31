"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { serverLogout } from "@/features/auth/api/auth";

interface AuthContextType {
    user: User | null;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
    initialUser,
}:
    {
        children: React.ReactNode,
        initialUser: User | null
    }) {

    const [user, setUser] = useState<User | null>(initialUser);
    const router = useRouter();

    const refreshUser = useCallback(async () => {
        try {

            const response = await fetch('/api/auth/me', {
                credentials: 'include',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            console.log('FILE[/context/AuthContext.tsx] | refreshUser | response', response);

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                setUser(null);
            }

        } catch (error) {
            console.error("Error refreshing user:", error);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const logout = useCallback(async () => {
        try {
            await serverLogout();
            setUser(null);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Error during client logout:", error);
        }
    }, [router]);

    const value = {
        user,
        logout,
        setUser,
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    console.log('FILE[/context/AuthContext.tsx] | useAuth | context', context);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
