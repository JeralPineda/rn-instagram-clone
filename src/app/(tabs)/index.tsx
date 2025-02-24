import posts from "@/assets/data/posts.json";
import { PostListItem } from "@/src/components/post-list-item";
import { FlatList } from "react-native";

export default function Feed() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
