import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import setUserToken from '../../states/auth-service'

export default function logout() {
  const userAuth = setUserToken();
  const handleLogout = () => {

    userAuth.reset()
    router.replace('/')
  }
  return (
    <View>
      <Button title='logout' onPress={handleLogout}/>
    </View>
  )
}