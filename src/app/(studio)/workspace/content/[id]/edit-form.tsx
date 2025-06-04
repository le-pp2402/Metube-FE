import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EyeIcon, ThumbsUpIcon } from "lucide-react";
import {
    fetchResourcesServerById,
    updateResources,
} from "@/app/api/resources/fetch-server";
import { Label } from "@/components/ui/label";
import { RiFileVideoLine } from "react-icons/ri";
import { ResourceUpdateInfo, ResourceUpdateRequest } from "@/types/resource";

export interface EditFormProps {
    id: number;
}

export function EditForm({ id }: EditFormProps) {
    const [resourceUpdateInfo, setResourceUpdateInfo] = useState<ResourceUpdateInfo | null>(
        null
    );

    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVideoInfo() {
            const videoInfo = await fetchResourcesServerById(id);
            if (videoInfo) {
                setResourceUpdateInfo(videoInfo);


                console.log("FILE[EditForm] | videoInfo", videoInfo);
            }
        }
        fetchVideoInfo();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!resourceUpdateInfo) {
            setMessage("No video information to update");
            return;
        }


        try {
            const result = await updateResources(id, {
                title: resourceUpdateInfo.title,
                description: resourceUpdateInfo.description,
                isPrivate: resourceUpdateInfo.isPrivate
            });

            if (result.success) {
                setMessage(result.message || "Changes saved successfully!");
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage(result.error || "Failed to save changes");
            }

        } catch (error) {
            console.error("Error in handleSubmit:", error);
            setMessage("An unexpected error occurred");
        }
    }

    return (
        <>
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <RiFileVideoLine className="mr-2" />
                Edit
            </h2>

            <div className="flex flex-nowrap gap-8 mb-8">
                {/* Views Card */}
                <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
                    <EyeIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">
                        Views:
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                        {(resourceUpdateInfo?.viewCount ?? 0).toLocaleString()}
                    </span>
                </div>

                {/* Likes Card */}
                <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
                    <ThumbsUpIcon className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-600">
                        Likes:
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                        {(resourceUpdateInfo?.likeCount ?? 0).toLocaleString()}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label className="block font-medium mb-1">Title</Label>
                    <Input
                        value={resourceUpdateInfo?.title ?? ""}
                        placeholder="Enter video title..."
                        className=" w-full 
                                    text-base 
                                    font-semibold 
                                    disabled:opacity-100 
                                    disabled:font-semibold 
                                    disabled:text-gray-900"
                        disabled
                    />
                </div>
                <div>
                    <Label className="block font-medium mb-1">
                        Description
                    </Label>
                    <Textarea
                        value={resourceUpdateInfo?.description ?? ""}
                        onChange={(e) =>
                            setResourceUpdateInfo((v) =>
                                v ? { ...v, description: e.target.value } : null
                            )
                        }
                        placeholder="Enter description... "
                        className="w-full"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Label className="font-medium">Visible</Label>
                    <Switch
                        checked={!resourceUpdateInfo?.isPrivate}
                        onCheckedChange={(checked) =>
                            setResourceUpdateInfo((prev) =>
                                prev ? { ...prev, isPrivate: !checked } : null
                            )
                        }
                    />
                    <span
                        className={`text-sm ${resourceUpdateInfo?.isPrivate
                            ? "text-red-600"
                            : "text-blue-600"
                            }`}
                    >
                        {resourceUpdateInfo?.isPrivate ? (
                            <span className="inline-block px-2 py-0.5 rounded bg-red-100">
                                Private
                            </span>
                        ) : (
                            <span className="inline-block px-2 py-0.5 rounded bg-blue-100">
                                Public
                            </span>
                        )}
                    </span>
                </div>
                <Button type="submit" className="w-full">
                    Save Changes
                </Button>
                {message && (
                    <div className="text-green-600 mt-2">{message}</div>
                )}
            </form>
        </>
    );
}
