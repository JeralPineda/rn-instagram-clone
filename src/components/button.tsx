import { Pressable, Text } from "react-native";

export function Button({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      className="bg-blue-500 w-full p-4 items-center rounded-lg"
      onPress={onPress}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}
