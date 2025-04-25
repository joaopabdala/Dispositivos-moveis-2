import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack 
    screenOptions={{
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: 'lime', 
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
      <Stack.Screen name="index" />
      <Stack.Screen name="random" 
     
      />
      <Stack.Screen name="dontKnow" />
    </Stack>
  );
}
