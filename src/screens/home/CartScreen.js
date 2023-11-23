import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { BackView, CartItem } from './Components'
import { useSelector } from 'react-redux'

const CartScreen = () => {

  const cartItems = useSelector((state)=>state.homeReducer.cartItems)
  const deliveryCharge = 2.00
  const totalQuantity = cartItems?.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0,
  );
  const subTotalPrice = cartItems?.reduce(
    (accumulator, item) => accumulator + (item.quantity * item.price),
    0,
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackView title="Shopping Cart" quantity={totalQuantity}/>
      <ScrollView className="mt-10">
        {cartItems.length===0
          ? <View>
              <Text className="text-[#1E222B] font-bold text-sm self-center">No Items in Cart</Text>
            </View>
          : <>
            {cartItems?.map((item,index)=>{
              return <CartItem key={index} item={item}/>
            })}
            <Text className="text-[#2A4BA0] font-normal text-sm mx-8 self-end mt-3">Edit</Text>
            </>
        }
      </ScrollView>
      <View className="bg-[#F8F9FB] absolute bottom-0 w-11/12 p-4 self-center rounded-3xl">
        <View className="flex-row justify-between mx-6">
            <Text className="text-[#616A7D] font-light text-base">Subtotal</Text>
            <Text className="text-[#1E222B] font-light text-sm">${subTotalPrice}</Text>
        </View>
        <View className="flex-row justify-between mx-6 mt-3">
            <Text className="text-[#616A7D] font-light text-base">Delivery</Text>
            <Text className="text-[#1E222B] font-light text-sm">$2.00</Text>
        </View>
        <View className="flex-row justify-between mx-6 mt-3">
            <Text className="text-[#616A7D] font-light text-base">Total</Text>
            <Text className="text-[#1E222B] font-light text-sm">${subTotalPrice+deliveryCharge}</Text>
        </View>
        <Pressable className="bg-[#2A4BA0] py-5 mt-7 items-center rounded-3xl">
            <Text className="text-white font-bold text-sm">Proceed To checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen