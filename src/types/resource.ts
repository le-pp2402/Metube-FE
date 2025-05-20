export interface ResourceResponse {
    id: number;
    title: string;
    video: string;
    thumbnail: string;
    status: 'UPLOADING' | 'WAITING' | 'PROCESSING' | 'READY' | string;
    username: string;
    createdAt: string;
    viewCount: number;
    likeCount: number;
    dateTime: string;
    isPrivate: boolean;
}

export interface ResourceEditRequest {
    id: number;
    title: string;
    description: string;
    viewCount: number;
    likeCount: number;
    isPrivate: boolean;
}