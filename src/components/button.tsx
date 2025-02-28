import { ActivityIndicator, Pressable, Text } from "react-native";

export function Button({
  onPress,
  isLoading,
  disabled,
  title,
}: {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      className={`${isLoading || disabled ? "bg-blue-500/70" : "bg-blue-500"} w-full p-4 items-center rounded-lg`}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className="text-white font-semibold">{title}</Text>
      )}
    </Pressable>
  );
}
