import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RiFileVideoLine } from "react-icons/ri";


export default function UploadSubtitleForm() {

    const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
    
    function handleSubtitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) setSubtitleFile(e.target.files[0]);
    }

    return <>
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <RiFileVideoLine className="mr-2" />
                Upload subtitle
            </h2>
            <div>
                <form>
                    <Label className="block font-medium mb-1">Upload Subtitle File (.srt, .vtt)</Label>
                    <Input
                        type="file"
                        accept=".srt,.vtt"
                        onChange={handleSubtitleChange}
                        className="w-full"
                    />
                    {subtitleFile && (
                        <div className="mt-2 text-sm">Selected: {subtitleFile.name}</div>
                    )}
                </form>
            </div>
    </>
}