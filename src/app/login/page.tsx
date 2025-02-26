"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import { redirect } from "next/navigation";
import { loginUser } from "@/utils/authApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function Login() {

    const { login } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(
        () => {
            if (localStorage.getItem("token")) {
                redirect("/");
            }
        }, []);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const res = await loginUser({ username, password });
            login(res.data.data.token);
            router.push("/");
        } catch (err) {
            setErrorMsg("username or password isn't correct");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to login.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between mt-4">
                            <Button variant="outline" type="button">Cancel</Button>
                            <Button type="submit">Login</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>

            {errorMsg && (
                <div className="fixed bottom-0 left-0 m-4">
                    <Alert variant="destructive" className="max-w-sm">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {errorMsg}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}
