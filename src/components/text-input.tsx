import { Text, View, TextInput as Input, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  label: string;
}

export function TextInput({ label, ...props }: Props) {
  return (
    <View>
      <Text className="mb-2 text-gray-700">{label}</Text>
      <Input
        {...props}
        className="w-full p-3 border border-neutral-300 rounded-lg"
      />
    </View>
  );
}
