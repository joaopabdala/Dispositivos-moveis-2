import { Link, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function IndexScreen() {
    const router = useRouter();
  
    const handleLogin = () => {
      router.push('/(auth)/(home)');
    };

    const handleRegister = () => {
        console.log('registrado')
        router.push('/')
    }
  
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <View style={styles.button}>
          <Button title="Registar" onPress={handleRegister} />
        </View>
    
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
