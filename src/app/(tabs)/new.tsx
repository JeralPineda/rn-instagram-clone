import { Button } from "@/src/components/button";
import { uploadImage } from "@/src/lib/cloudinary";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/auth-provider";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"video" | "image" | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    if (!media) {
      pickMedia();
    }
  }, [media]);

  const pickMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type as "video" | "image");
    }
  };

  const createPost = async () => {
    if (!media) return;

    setIsLoading(true);
    const response = await uploadImage(media);
    setIsLoading(false);

    // Save the post in database
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          caption,
          image: response?.public_id,
          user_id: session?.user.id,
          media_type: mediaType,
        },
      ])
      .select();

    router.push("/(tabs)");
  };

  return (
    <View className="p-3 items-center flex-1">
      {/* Image picker */}
      {!media ? (
        <View className="w-52 aspect-[3/4] rounded-lg bg-slate-300" />
      ) : mediaType === "image" ? (
        <Image
          source={{ uri: media }}
          className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
        />
      ) : (
        <Video
          className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
          style={{ width: "100%", aspectRatio: 16 / 9 }}
          source={{
            uri: media,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      )}

      <Text onPress={pickMedia} className="text-blue-500 font-semibold m-5">
        Change
      </Text>

      <TextInput
        placeholder="What is on your mind"
        className="w-full p-3 border border-neutral-300 rounded-lg"
        value={caption}
        onChangeText={(newValue) => setCaption(newValue)}
      />

      {/* Button */}
      <View className="mt-auto w-full">
        <Button onPress={createPost} title="Share" isLoading={isLoading} />
      </View>
    </View>
  );
}
