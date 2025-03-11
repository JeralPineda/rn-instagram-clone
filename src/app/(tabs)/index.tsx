import { PostListItem } from "@/src/components/post-list-item";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/auth-provider";
import { POST } from "@/src/types";
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

export default function Feed() {
  const [posts, setPosts] = useState<POST[] | null>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*)")
      // .eq('id', 49) // show only my posts
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Something went wrong");
    }
    // console.log(JSON.stringify(data, null, 2));
    setPosts(data);
    setLoading(false);
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        gap: 10,
        maxWidth: 512,
        width: "100%",
        alignItems: "center",
      }}
      showsVerticalScrollIndicator={false}
      onRefresh={fetchPosts}
      refreshing={loading}
    />
  );
}
