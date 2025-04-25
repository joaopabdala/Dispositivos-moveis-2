import { Link, useRouter } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function _screen() {
  const router = useRouter();

  const handleLogin = () => {
    console.log("TODO: login user!");
    router.push("/(auth)/(home)/home");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <Link href="/register">
        <Text style={styles.register}>Create Account</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  register: {
    textAlign: "center",
    color: "#007AFF",
    fontWeight: "500",
  },
});
