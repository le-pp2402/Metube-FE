export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  createdAt: string;
  uploader: string;
}

export interface VideoInfo extends Video {
  username: string;
  video: string;
  description: string;
  tags: string[];
}