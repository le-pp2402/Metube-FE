'use client';

import { Input } from "../ui/input";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import getPresignedUrl from "@/app/api/storage/get-presigned-url/action";
import { Textarea } from "../ui/textarea";
import { X, Upload } from "lucide-react";

const formSchema = z.object({
    video: z.instanceof(File).refine(
        (file) => ['video/mp4', 'video/quicktime'].includes(file.type),
        "Only MP4 and MOV video files are supported"
    ),
    title: z.string().min(1, "Title is required"),
    description: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UploadVideoForm() {
    const [file, setFile] = useState<File | null>(null);
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { video: undefined, title: "", description: "" },
    });
    const videoFileRef = useRef<File | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            form.setValue("video", selected);
            videoFileRef.current = selected;
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files?.[0];
        if (dropped && ['video/mp4', 'video/quicktime'].includes(dropped.type)) {
            setFile(dropped);
            form.setValue("video", dropped);
            videoFileRef.current = dropped;
        }
    };

    async function onSubmit(values: FormValues) {
        try {
            const { url: uploadUrl } = await getPresignedUrl({ title: values.title });
            // Prepare listener BEFORE opening popup
            const handlePopupReady = (event: MessageEvent) => {
                if (event.origin !== window.location.origin) return;
                if (event.data === 'popup-ready' && videoFileRef.current) {
                    const fileToSend = videoFileRef.current;
                    popup?.postMessage({ uploadUrl, file: fileToSend }, window.location.origin);
                    window.removeEventListener('message', handlePopupReady);
                }
            };

            window.addEventListener('message', handlePopupReady);

            const popup = window.open(
                '/upload-popup',
                'UploadPopup',
                'width=500,height=400'
            );

            if (!popup) {
                console.error('Popup blocked. Please allow popups and try again.');
            }

            // Listen for upload-complete
            const handleUploadComplete = (event: MessageEvent) => {
                if (event.origin !== window.location.origin) return;
                if (event.data === 'upload-complete') {
                    form.reset();
                    setFile(null);
                    window.removeEventListener('message', handleUploadComplete);
                }
            };
            window.addEventListener('message', handleUploadComplete);
        } catch (err) {
            console.error('Upload error:', err);
        }
    }

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                    <div
                        className="border-2 border-dashed rounded-lg p-8 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {file ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{file.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setFile(null)}
                                        type="button"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="text-sm font-medium">Drag and drop your video here</p>
                                <p className="text-xs text-muted-foreground">or click to browse</p>
                                <Input
                                    type="file"
                                    accept="video/mp4,video/quicktime"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                    id="video-upload"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("video-upload")?.click()}
                                >
                                    Select Video
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...form.register('title')} placeholder="Enter video title" />
                            </FormControl>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...form.register('description')} placeholder="Enter video description" />
                            </FormControl>
                        </FormItem>
                        <Button type="submit" className="w-full" disabled={!file || !form.getValues('title')}>Upload Video</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

