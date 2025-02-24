export type POST = {
  id: string;
  image: string;
  image_url: string;
  caption: string;
  user: {
    id: string;
    avatar_url: string;
    image_url: string;
    username: string;
  };
};
