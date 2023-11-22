import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#2A4BA0] flex-1">
      <View className="p-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-[#F8F9FB]">Hey, Raj</Text>
          <Image style={{ height: 26, width: 23 }} source={require("../../assets/images/bag.png")} />
        </View>

        <View className="bg-[#153075] my-10 rounded-full flex-row py-4 px-7">
          <Image style={{ height: 23, width: 23 }} source={require("../../assets/images/search.png")} />
          <TextInput
            placeholder='Search Products or store'
            placeholderTextColor="#8891A5"
            className="ml-4 text-white"
          />
        </View>

        <View className="flex-row justify-between">
          <View>
            <Text className="text-[#F8F9FB] opacity-50 font-bold">DELIVERY TO</Text>
          </View>
          <View>
            <Text className="text-[#F8F9FB] opacity-50 font-bold">WITHIN</Text>
          </View>
        </View>
      </View>
      <View className="flex-1 ">
        <Text>hi</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen