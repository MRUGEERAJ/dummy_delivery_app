import { View, Text, SafeAreaView, Image, TextInput, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Item, OffersCard } from "./Components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setCartItems } from "./homeSlice";

const HomeScreen = () => {

  const cartItems = useSelector((state)=>state.homeReducer.cartItems)
  const totalQuantity = cartItems?.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0,
  );
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    (async()=>{
      setLoading(true)
      const data = await getItems()
      dispatch(setCartItems([]));
      setItems(data.products)
      setLoading(true)
    })()
  },[])

  return (
    <SafeAreaView className="bg-[#2A4BA0] flex-1">
        <View className="p-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-[#F8F9FB]">Hey, Raj</Text>
            <Pressable onPress={()=>navigation.navigate("cart")} className="p-1">
              <Image
                style={{ height: 26, width: 23 }}
                source={require("../../assets/images/bag.png")}
              />
              {totalQuantity!==0 && <View className="absolute bg-[#F9B023] w-5 h-5 rounded-full items-center justify-center  -right-1">
                <Text className="text-xs font-black text-white">{totalQuantity}</Text>
              </View>}
            </Pressable>
          </View>

          <View className="bg-[#153075] my-8 rounded-full flex-row py-4 px-7">
            <Image
              style={{ height: 23, width: 23 }}
              source={require("../../assets/images/search.png")}
            />
            <TextInput
              placeholder="Search Products or store"
              placeholderTextColor="#8891A5"
              className="ml-4 text-white"
            />
          </View>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-[#F8F9FB] opacity-50 font-bold">DELIVERY TO</Text>
              <View className="flex-row mt-1 items-center">
                <Text className="text-white font-normal text-base mr-2">Green Way 3000, Sylhet</Text>
                <Image
                  style={{ height: 6, width: 11 }}
                  source={require("../../assets/images/downArrow.png")}
                />
              </View>
            </View>
            <View className="items-end">
              <Text className="text-[#F8F9FB] opacity-50 font-bold">WITHIN</Text>
              <View className="flex-row mt-1 items-center">
                <Text className="text-white font-normal text-base mr-2">1 Hour</Text>
                <Image
                  style={{ height: 6, width: 11 }}
                  source={require("../../assets/images/downArrow.png")}
                />
              </View>
            </View>
          </View>
        </View>

        <View className=" bg-white flex-1">

          {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} className="py-10 px-5">
            <OffersCard color="#F9B023"/>
            <OffersCard color="#f9b22336"/>
            <OffersCard color="#153075"/>
          </ScrollView> */}

          <Text className="ml-5 text-[#1E222B] font-normal text-3xl mt-5">Recommended</Text>
          <FlatList
            className="mt-6"
            data={items}
            columnWrapperStyle={{ justifyContent: 'space-around',flexGrow:1 }}
            renderItem={({ item,index }) => (
              <Item key={index} item={item}/>
            )}
            numColumns={2}
          />
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
