"use client";

import { useState } from "react";
import { EditForm } from "./edit-form";
import { SubtitleList, SubtitleFile } from "./subtitle-list";
import { SubtitleViewer } from "./subtitle-viewer";
import { useParams } from "next/navigation";
import UploadSubtitleForm from "./upload-subtitle-form";


export default function EditContentPage() {

    const params = useParams();
    const id = Number(params.id);


    // Mock subtitle files
    const [subtitles, setSubtitles] = useState<SubtitleFile[]>([
        {
            name: "sample1.srt",
            content: "1\n00:00:01,000 --> 00:00:02,000\nHello world!",
            createdAt: "2024-06-01",
            uploadedBy: "Alice"
        },
        {
            name: "sample2.vtt",
            content: "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nHi there!",
            createdAt: "2024-06-02",
            uploadedBy: "Bob"
        }
    ]);

    const [selectedSubtitle, setSelectedSubtitle] = useState<SubtitleFile | null>(subtitles[0]);
    const [showGeminiForm, setShowGeminiForm] = useState(false);
    return (
        <>
        <div className="flex flex-col md:flex-row gap-8 py-12 max-w-[1400px] mx-auto px-6">
            <div className="w-1/3 min-w-[320px] space-y-4">
                <div className="border rounded-lg p-8 shadow-sm">
                    <EditForm id={id} />
                </div>
                <div className="border rounded-lg p-8 shadow-sm">
                    <UploadSubtitleForm />
                </div>
            </div>
            
            <div className="w-2/3 min-w-[480px] border rounded-lg p-8 shadow-sm h-fit">
                <div className="flex flex-col">
                    <SubtitleList
                        subtitles={subtitles}
                        selected={selectedSubtitle}
                        onSelect={setSelectedSubtitle}
                        onDelete={() => { }}
                    />
                    <SubtitleViewer
                        subtitle={selectedSubtitle}
                        showGeminiForm={showGeminiForm}
                        onToggleGeminiForm={() => setShowGeminiForm(v => !v)}
                        />
                </div>
            </div>
        </div>
        </>
    );
}
