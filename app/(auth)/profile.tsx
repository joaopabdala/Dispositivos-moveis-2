import { View, Text } from 'react-native'
import React from 'react'
import Tag from '../../components/Tag'

export default function profile() {
  return (
    <View>
      <View className='p-2 flex-row gap-2'>
        <Tag name="unread"/>
        <Tag name="read"/>
        <Tag name="all"/>
      </View>
    </View>
  )
}