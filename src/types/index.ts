export type POST = {
  id: string;
  image: string;
  image_url: string;
  caption: string;
  media_type: "image" | "video";
  user: {
    id: string;
    avatar_url: string;
    image_url: string;
    username: string;
  };
};

export interface LIKE {
  created_at: string;
  id: number;
  post_id: number;
  user_id: string;
}
