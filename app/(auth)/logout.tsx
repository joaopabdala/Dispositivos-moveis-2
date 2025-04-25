import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function logout() {
  const handleLogout = () => {
    router.replace('/')
  }
  return (
    <View>
      <Button title='logout' onPress={handleLogout}/>
    </View>
  )
}