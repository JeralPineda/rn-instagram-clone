import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@/src/components/button";
import { upload } from "cloudinary-react-native";
import { cld, uploadImage } from "@/src/lib/cloudinary";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) return;

    setIsLoading(true);
    const response = await uploadImage(image);
    setIsLoading(false);

    // Save the post in database
    console.log(
      "🚀 ~ #40 new.tsx ~ createPost ~ image id:",
      response?.public_id,
    );
  };

  return (
    <View className="p-3 items-center flex-1">
      {/* Image picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-[3/4] rounded-lg bg-slate-300" />
      )}

      <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">
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
