"use client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Upload, Video, UserPlus, BarChart3, LucideIcon } from "lucide-react";

import { SidebarProvider } from "@/components/ui/sidebar";

type SidebarItem = {
    label: string;
    icon: LucideIcon;
    href?: string;
    isCollapsible?: boolean;
    children?: { label: string; href: string }[];
};

const sidebarItems: SidebarItem[] = [
    { label: "Streaming Info", icon: LayoutDashboard, href: "/streaming-info" },
    { label: "Upload Video", icon: Upload, href: "/upload-video" },
    { label: "Manage Videos", icon: Video, href: "/manage-videos" },
    { label: "Upload Account", icon: UserPlus, href: "/upload-account" },
    { label: "Statistics", icon: BarChart3, href: "/statistics" },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarProvider>
            <SidebarMenu className={cn(isOpen ? "w-64" : "w-16", "transition-all duration-200")}>
                {sidebarItems.map((item, index) =>
                    item.isCollapsible ? (
                        <Collapsible key={index} defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-4">
                                    {item.children &&
                                        item.children.map((child, childIndex) => (
                                            <SidebarMenuItem key={childIndex}>
                                                <SidebarMenuButton asChild>
                                                    <a href={child.href} className="block w-full">
                                                        {child.label}
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild>
                                <a href={item.href} className="flex items-center w-full">
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarProvider>
    );
}