"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Tv, Radio } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {
    const { user, logout, refreshUser } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        refreshUser();
    }, [refreshUser]);

    if (!mounted) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
            <div className="flex items-center gap-x-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-md" />
                    <span className="text-xl font-bold text-primary">Metube</span>
                </Link>
                <div className="flex items-center gap-5">
                    <Link href="/workspace" className="flex items-center gap-2 text-gray-700 hover:text-primary transition">
                        <Tv className="h-5 w-5" /> Workspace
                    </Link>
                    <Link href="/lives" className="flex items-center gap-2 text-gray-700 hover:text-primary transition">
                        <Radio className="h-5 w-5" /> Live Channels
                    </Link>
                </div>
            </div>

            {/* <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input placeholder="Search videos..." className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-primary focus:border-primary" />
            </div> */}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <User className="h-5 w-5" /> {user ? user.username : "Account"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    {user ? (
                        <>
                            <DropdownMenuItem className="cursor-default">
                                <span className="w-full">Hello, {user.username}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                <span className="w-full">Logout</span>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href="/login" className="w-full">Login</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/register" className="w-full">Register</Link>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}