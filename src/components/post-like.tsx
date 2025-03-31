import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { LIKE, POST } from "../types";
import { useAuth } from "../providers/auth-provider";
import { supabase } from "../lib/supabase";

export function PostLike({ post }: { post: POST }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeRecord, setLikeRecord] = useState<LIKE | null>(null);

  const { user } = useAuth();

  // useEffect(() => {
  //   if (post.my_likes.length > 0) {
  //     setLikeRecord(post.my_likes[0]);
  //     setIsLiked(true);
  //   }
  // }, [post.my_likes]);

  useEffect(() => {
    fetchLike();
  }, []);

  const fetchLike = async () => {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user?.id)
      .eq("post_id", post.id)
      .select();

    if (data && data?.length > 0) {
      setLikeRecord(data[0]);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (isLiked) {
      saveLike();
    } else {
      deleteLike();
    }
  }, [isLiked]);

  const saveLike = async () => {
    try {
      if (likeRecord) return;

      const { data } = await supabase
        .from("likes")
        .insert([
          {
            user_id: user?.id,
            post_id: post.id,
          },
        ])
        .select();

      setLikeRecord(data?.[0] || null);
    } catch (error) {
      console.log("🚀 post-list-item.tsx -> #18 ~ error saveLike:", error);
    }
  };

  const deleteLike = async () => {
    try {
      if (!likeRecord) return;

      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeRecord.id);

      if (!error) {
        setLikeRecord(null);
      }
    } catch (error) {
      console.log("🚀 post-list-item.tsx -> #59 ~ error deleteLike:", error);
    }
  };

  return (
    <AntDesign
      onPress={() => setIsLiked(!isLiked)}
      name={isLiked ? "heart" : "hearto"}
      size={20}
      color={isLiked ? "crimson" : "black"}
    />
  );
}
