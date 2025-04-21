"use client";

import { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrashIcon, ArrowRightIcon } from "@radix-ui/react-icons"; // Import the trash and arrow icons
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigUpIcon } from "lucide-react";
import axios from "axios";

export default function Component() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].size > 2 * 1024 * 1024 * 1024) {
                console.error("File is too large. Max file size is 2GB.");
                return;
            }
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.size > 2 * 1024 * 1024 * 1024) {
                console.error("File is too large. Max file size is 2GB.");
                return;
            }
            setFile(droppedFile);
            e.dataTransfer.clearData();
        }
    };

    const handleRemove = () => {
        setFile(null); // Remove the file
    };

    const handleReplace = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].size > 2 * 1024 * 1024 * 1024) {
                console.error("File is too large. Max file size is 2GB.");
                return;
            }
            setFile(e.target.files[0]);
        }
    };

    const API_URL = "http://localhost:8080/resources"

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log("start upload file");
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;

        formData.append("video", file);
        formData.append("title", title);

        fetch("http://localhost:8080/resources/upload", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(data => console.log("Success", data))
            .catch(err => console.error("Error", err));
        setFile(null);
        console.log("uploaded successfully");
    };

    return (
        <div className="mx-auto w-2/3">
            <Card>
                <CardHeader>
                    <CardTitle>Upload your video</CardTitle>
                    <CardDescription>
                        Select a file to upload and click the submit button.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input type="text" id="title" name="title" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                placeholder="Some words to describe your video or add it later with AI."
                                maxLength={500}
                                id="description"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="file">File</Label>
                            {!file ? (
                                <div className="flex items-center justify-center w-full">
                                    <Label
                                        htmlFor="dropzone-file"
                                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${isDragging
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-300 bg-gray-50"
                                            } hover:bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadIcon className="w-10 h-10 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or
                                                drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                MP4, MOV, AVI (Max 2GB)
                                            </p>
                                        </div>
                                        <Input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </Label>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{file?.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(file?.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    document.getElementById("replace-file")?.click()
                                                }
                                            >
                                                Replace
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={handleRemove}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Input
                                        id="replace-file"
                                        type="file"
                                        className="hidden"
                                        onChange={handleReplace}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="gap-2">
                                Upload <ArrowBigUpIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

function UploadIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    );
}