'use client';

import { useEffect, useState } from "react";

export default function UploadPopup() {
    const [status, setStatus] = useState("Waiting for file...");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Notify parent that popup is ready
        if (window.opener) {
            window.opener.postMessage('popup-ready', window.location.origin);
        }

        function handleMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin) return;
            const { uploadUrl, file } = event.data;
            if (!uploadUrl || !file) return;

            setStatus("Uploading...");
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", uploadUrl);
            xhr.setRequestHeader("Content-Type", file.type);
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    setProgress(Math.round((e.loaded / e.total) * 100));
                }
            };
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    setStatus("Upload complete!");
                    setProgress(100);
                    window.opener?.postMessage('upload-complete', window.location.origin);
                    setTimeout(() => window.close(), 1000);
                } else {
                    setStatus("Upload failed");
                    console.error("Upload failed:", xhr.statusText);
                }
            };
            xhr.onerror = () => {
                setStatus("Upload failed");
                console.error("Upload failed");
            };
            xhr.send(file);
        }

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Video Upload</h2>
            <div className="w-[300px]">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{status}</p>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                        className="h-2 bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
