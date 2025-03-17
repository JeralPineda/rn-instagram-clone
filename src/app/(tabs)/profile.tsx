import { Button } from "@/src/components/button";
import { TextInput } from "@/src/components/text-input";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/auth-provider";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    getProile();
  }, []);

  const getProile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    console.log("🚀 profile.tsx -> #43 ~ data:", JSON.stringify(data, null, 2));

    if (error) {
      Alert.alert("Failed to fetch profile");
    }

    setUsername(data?.username);
    setBio(data?.bio);
  };

  const updateProfile = async () => {
    if (!user) return;

    setIsLoading(true);

    const updatedProfile = {
      id: user.id,
      username,
      bio,
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(updatedProfile);

    setIsLoading(false);

    if (error) {
      console.log("🚀 profile.tsx -> #54 ~ error:", error);
      Alert.alert("Failed to update profile");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-3 gap-4">
      {/* Avatar image picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-square self-center rounded-full bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-square self-center rounded-full bg-slate-300" />
      )}

      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center"
      >
        Change
      </Text>

      <TextInput
        label="Username"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="w-full p-3 border border-neutral-300 rounded-lg"
      />

      <TextInput
        label="Bio"
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        className="w-full p-3 border border-neutral-300 rounded-lg"
        multiline
        numberOfLines={3}
      />

      {/* Button */}
      <Button onPress={updateProfile} title="Update" isLoading={isLoading} />
      <Button onPress={() => supabase.auth.signOut()} title="Sign Out" />
    </View>
  );
}
