import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SubtitleFile } from "./subtitle-list";
import { BsChatSquareText } from "react-icons/bs";

export interface SubtitleViewerProps {
    subtitle: SubtitleFile | null;
    showGeminiForm: boolean;
    onToggleGeminiForm: () => void;
}

export function SubtitleViewer({ subtitle, showGeminiForm, onToggleGeminiForm }: SubtitleViewerProps) {
    const [apiKey, setApiKey] = useState("");
    const [genMessage, setGenMessage] = useState("");

    function handleGenerate() {
        setGenMessage("Description generated! (mock)");
    }

    function handleApiKeySubmit(e: React.FormEvent) {
        e.preventDefault();
        setGenMessage("API Key saved! (mock)");
    }

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <BsChatSquareText className="mr-2" />
                Subtitle Viewer
            </h2>
            

            <div className="bg-gray-50 rounded p-3 min-h-[120px] text-sm whitespace-pre-wrap border">
                {subtitle ? subtitle.content : <span className="text-gray-400">Select a subtitle file to view its content.</span>}
            </div>
            <div className="flex gap-2 mt-4">
                <Button type="button" onClick={handleGenerate} disabled={!subtitle}>
                    Generate Description
                </Button>
                <Button type="button" variant="outline" onClick={onToggleGeminiForm}>
                    {showGeminiForm ? "Hide Gemini API Key" : "Add Gemini API Key"}
                </Button>
            </div>
            {showGeminiForm && (
                <form onSubmit={handleApiKeySubmit} className="mt-4 space-y-2">
                    <label className="block font-medium">Google Gemini API Key (Your key will be saved on your browser, securely)</label>
                    <Input
                        type="password"
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key"
                        className="w-full"
                    />
                    <Button type="submit" className="w-full">Save API Key</Button>
                </form>
            )}
            {genMessage && <div className="text-green-600 mt-2">{genMessage}</div>}
        </div>
    );
} 