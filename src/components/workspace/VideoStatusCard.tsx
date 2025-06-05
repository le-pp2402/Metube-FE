"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getStatistics } from "@/features/workspace/api/workspace";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function VideoStatusCard() {

    const [uploading, setUploading] = useState(0);
    const [waiting, setWaiting] = useState(0);
    const [processing, setProcessing] = useState(0);
    const [ready, setReady] = useState(0);

    useEffect(() => {
        const fetchVideoStatus = async () => {
            try {
                const { data, error } = await getStatistics();

                if (error) {
                    toast.error("Failed to fetch video status: " + error);
                    return;
                }

                console.log("Video status data:", data);
                setUploading(data[0]);
                setWaiting(data[1]);
                setProcessing(data[2]);
                setReady(data[3]);
            } catch (error) {
                console.error("Error fetching video status:", error);
            }
        };
        fetchVideoStatus();
    }, []);

    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Video Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 ml-4">
                        <span className="text-2xl font-bold text-blue-600">{uploading}</span>
                        <span className="text-sm text-black-600">UPLOADING</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 ml-4">
                        <span className="text-2xl font-bold text-yellow-600">{waiting}</span>
                        <span className="text-sm text-black-600">WAITING</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 ml-4">
                        <span className="text-2xl font-bold text-red-600">{processing}</span>
                        <span className="text-sm text-black-600">PROCESSING</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 ml-4">
                        <span className="text-2xl font-bold text-green-600">{ready}</span>
                        <span className="text-sm text-black-600">READY TO WATCH</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}