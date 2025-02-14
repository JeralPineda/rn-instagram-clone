import { StyleSheet, Text, View } from "react-native";

export default function CreatePost() {
  return (
    <View style={styles.container}>
      <Text>New</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
