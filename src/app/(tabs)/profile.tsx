import { Button } from "@/src/components/button";
import { supabase } from "@/src/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

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

      {/* Form */}
      <View>
        <Text className="mb-2 text-gray-700">Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full p-3 border border-neutral-300 rounded-lg"
        />
      </View>

      <View>
        <Text className="mb-2 text-gray-700">Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="w-full p-3 border border-neutral-300 rounded-lg"
        />
      </View>

      <View>
        <Text className="mb-2 text-gray-700">Website</Text>
        <TextInput
          placeholder="Website"
          value={website}
          onChangeText={setWebsite}
          className="w-full p-3 border border-neutral-300 rounded-lg"
        />
      </View>

      {/* Button */}
      <Button
        onPress={() => console.log("UpdatSign Out")}
        title="UpdatSign Out"
      />
      <Button onPress={() => supabase.auth.signOut()} title="Sign Out" />
    </View>
  );
}
