"use client";

import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendChat } from "@/utils/liveChatApi";

type Message = {
    username: string;
    message: string;
};

type Props = {
    channelId: number;
};

export default function LiveChat({ channelId }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("[DEBUG] websocket connected to channel ", channelId);
                client.subscribe(`/channel/${channelId}`, (messageOutput: IMessage) => {
                    const msg: Message = JSON.parse(messageOutput.body);
                    setMessages((prev) => [...prev, msg]);
                    if (messages.length > 100) {
                        setMessages(messages.slice(50));
                    }
                });
            },
        });

        client.activate();
        stompClientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [channelId]);

    const handleSend = () => {
        if (input.trim() && input.length <= 100) {
            sendChat(channelId, { message: input.trim() });
            setInput("");
        }
    };

    return (
        <div className="flex flex-col h-[790px] w-full border border-gray-300 rounded-2xl shadow-xl bg-white p-4 text-sm">
            <ScrollArea className="flex-1 pr-2">
                <div className="space-y-3">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-100 hover:bg-gray-200 transition-colors duration-150 text-gray-900 px-4 py-3 rounded-xl shadow-sm break-words"
                        >
                            <div className="font-semibold text-blue-600">{msg.username}</div>
                            <div className="mt-1">{msg.message}</div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="flex gap-2 mt-4">
                <Input
                    type="text"
                    value={input}
                    maxLength={100}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 rounded-xl px-4 py-2 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                />
                <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-xl font-medium shadow-md transition-all duration-200"
                >
                    Send
                </Button>
            </div>
        </div>
    );
}
