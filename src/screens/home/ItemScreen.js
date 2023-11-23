import { View, Text, SafeAreaView, Image, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { BackView } from './Components'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-native-reanimated-carousel'
import _ from 'lodash';
import { setCartItems } from './homeSlice'
import { useNavigation } from '@react-navigation/native'

const ItemScreen = () => {

  const cartItems = useSelector((state)=>state.homeReducer.cartItems)
  const item = useSelector((state)=>state.homeReducer.item)
  const width = Dimensions.get('window').width;
  const dispatch=useDispatch()
  const navigation=useNavigation()

  const addToCart = async () => {
    let selectedIndex = cartItems?.findIndex((cartItem) => cartItem.id == item?.id);
    if (selectedIndex > -1) {
      let cartItemsCopy = _.cloneDeep(cartItems);
      cartItemsCopy[selectedIndex].quantity=cartItemsCopy[selectedIndex].quantity+1;
      dispatch(setCartItems(cartItemsCopy));
    } else {
      let cartItemsCopy = _.cloneDeep(cartItems);
      cartItemsCopy?.push({
        ...item,
        quantity:1
      });
      dispatch(setCartItems(cartItemsCopy));
    }
    navigation.navigate("cart")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackView icon={require("../../assets/images/bag.png")}/>
      <ScrollView className="mt-10">

        <Text className="text-[#1E222B] font-normal text-6xl mx-5">{item?.title}</Text>
        <View className="flex-row mt-3 mx-7 items-center ">
            {Array(5).fill(0).map((item,index)=>{
                return <Image
                    key={index}
                    style={{ height: 16, width: 16}}
                    source={require("../../assets/images/Star.png")}
                />
            })}
            <Text className="text-[#A1A1AB] font-normal text-md ml-2 mt-1">{item?.rating} Rating</Text>
        </View>

        <View className="flex-1 mt-5">
            <Carousel
                loop
                width={width}
                height={width / 2}
                data={item?.images}
                scrollAnimationDuration={1500}
                renderItem={({item, index }) => (
                  <Image
                    key={index}
                    style={{height:width/2 }}
                    source={{
                      uri: item
                    }}
                  />
                )}
            />
        </View>

        <View className="flex-row mx-5 mt-5">
            <Text className="text-[#2A4BA0] font-bold text-lg">${item?.price}</Text>
            {item?.discountPercentage && <View className="bg-[#2A4BA0] ml-3 rounded-full items-center justify-center px-3">
                <Text className="text-white font-normal text-sm">{item?.discountPercentage}% OFF</Text>
            </View>}
        </View>

        <View className="flex-row mx-5 mt-9 justify-around">
            <Pressable onPress={addToCart} className="items-center py-5 rounded-2xl w-5/12 border border-[#2A4BA0]">
                <Text className="text-[#2A4BA0] font-normal text-sm">Add To Cart</Text>
            </Pressable>
            <Pressable className="items-center py-5 rounded-2xl bg-[#2A4BA0] w-5/12">
                <Text className="text-white font-normal text-sm">Buy Now</Text>
            </Pressable>
        </View>

        <View className=" mx-5 mt-9 justify-around">
           <Text className="text-[#1E222B] font-light text-lg">Details</Text>
           <Text className="text-[#8891A5] font-light text-base">{item?.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ItemScreen