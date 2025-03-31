import { POST } from "@/src/types";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { PostAvatar } from "./post-avatar";
import PostContent from "./post-content";

export function PostListItem({ post }: { post: POST }) {
  return (
    <View className="bg-white">
      {/* Header */}
      <View className="p-3 flex-row items-center gap-2">
        <PostAvatar post={post} />

        <Text className="font-semibold">
          {post.user.username || "New user"}
        </Text>
      </View>

      {/* Content */}
      <PostContent post={post} />

      {/* Footer */}
      <View className="flex-row gap-3 p-3">
        <AntDesign name="hearto" size={20} />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />

        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>
    </View>
  );
}
