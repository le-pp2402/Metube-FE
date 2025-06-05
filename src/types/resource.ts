export interface ResourceResponse {
    id: number;
    title: string;
    video: string;
    thumbnail: string;
    status: "UPLOADING" | "WAITING" | "PROCESSING" | "READY" | string;
    username: string;
    createdAt: string;
    viewCount: number;
    likeCount: number;
    dateTime: string;
    isPrivate: boolean;
}

export interface ResourceUpdateRequest {
    title: string;
    description: string;
    isPrivate: boolean;
}

export interface ResourceUpdateInfo {
    id: number;
    title: string;
    description: string;
    isPrivate: boolean;
    viewCount: number;
    likeCount: number;
}
