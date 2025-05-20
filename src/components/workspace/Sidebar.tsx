"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Video,
    Upload,
    Key,
    BarChart,
    ListVideo,
    Users,
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        href: "/workspace",
        icon: BarChart,
    },
    {
        name: "Upload Video",
        href: "/workspace/upload",
        icon: Upload,
    },
    {
        name: "My Videos",
        href: "/workspace/videos",
        icon: ListVideo,
    },
    {
        name: "Live Stream",
        href: "/workspace/live",
        icon: Video,
    },
    {
        name: "Stream Key",
        href: "/workspace/stream-key",
        icon: Key,
    },
    {
        name: "My Channel",
        href: "/workspace/channel",
        icon: Users,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r border-gray-200">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900">Workspace</h1>
            </div>
            <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
} 