import { View, Text, Button } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function Home() {

  const back = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <Text>Hddome</Text>
      <Button title='Voltar' onPress={back}/>
    </View>
  );
}
