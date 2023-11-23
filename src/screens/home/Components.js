import { useNavigation } from "@react-navigation/native";
import { memo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setItem } from "./homeSlice";
import _ from 'lodash';

export const OffersCard = memo(({color}) => {
  return (
    <View className={`bg-[${color}] mr-6 flex-row px-5 py-10 rounded-2xl items-center`}>
      <Image
        style={{ height: 80, width: 80 }}
        source={require("../../assets/images/imageIcon.png")}
      />
      <View className="ml-9 p-3">
        <Text className="text-white font-light text-2xl">Get</Text>
        <Text className="text-white font-bold text-3xl">50% OFF</Text>
        <Text className="text-white font-light text-xl">On first 03 order</Text>
      </View>
    </View>
  );
});

export const Item = memo(({item}) => {

    const cartItems = useSelector((state)=>state.homeReducer.cartItems)
    const [selected,setSelected]=useState(false)
    const navigation=useNavigation()
    const dispatch=useDispatch()

    const onItemClick = async () =>{
      await dispatch(setItem(item))
      navigation.navigate("item")
    }

    const addToCart= async () =>{
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
    }

    return (
        <Pressable onPress={onItemClick} className="bg-[#F8F9FB] w-5/12 p-4 rounded-2xl mb-7">
            <Pressable onPress={()=>setSelected(!selected)}>
                {selected
                ? <Image
                    style={{ height: 20, width: 22 }}
                    source={require("../../assets/images/wishlist.png")}
                    />
                : <Image
                    style={{ height: 20, width: 22 }}
                    source={require("../../assets/images/wishlistOutlined.png")}
                    />}
            </Pressable>
            <Image
                style={{ height: 100, width: 100, alignSelf:'center',marginTop:5,borderRadius:20 }}
                source={{
                  uri: item?.thumbnail
                }}
            />
            <View className="mt-10">
              <Text className="text-[#1E222B] font-medium text-lg">${item?.price}</Text>
              <Text className="text-[#616A7D] font-light text-base">{item?.title}</Text>
              <Pressable onPress={addToCart} className="absolute right-0">
                <Image
                  className=""
                  style={{ height: 30, width: 30}}
                  source={require("../../assets/images/addToCart.png")}
                />
              </Pressable>
            </View>
        </Pressable>
    );
  });

  export const CartItem = memo(({item}) => {

    const cartItems = useSelector((state)=>state.homeReducer.cartItems)
    const navigation=useNavigation()
    const dispatch=useDispatch()

    const addItem = async () =>{
      let selectedIndex = cartItems?.findIndex((cartItem) => cartItem.id == item?.id);
      if (selectedIndex > -1) {
        let cartItemsCopy = _.cloneDeep(cartItems);
        cartItemsCopy[selectedIndex].quantity=cartItemsCopy[selectedIndex].quantity+1;
        dispatch(setCartItems(cartItemsCopy));
      }
    }

    const removeItem = async () =>{
      let selectedIndex = cartItems?.findIndex((cartItem) => cartItem.id == item?.id);
      if (selectedIndex > -1) {
        let cartItemsCopy = _.cloneDeep(cartItems);
        cartItemsCopy[selectedIndex].quantity=cartItemsCopy[selectedIndex].quantity-1;
        if(cartItemsCopy[selectedIndex].quantity === 0)
          cartItemsCopy.splice(selectedIndex, 1);
        dispatch(setCartItems(cartItemsCopy));
      }
    }

    return (
        <View className="border-b-2 mx-8 border-[#EBEBFB] flex-row py-5">
            <Image
                style={{ height: 60, width: 60,alignSelf:'center',borderRadius:10 }}
                source={{
                  uri:item?.thumbnail
                }}
            />
            <View className="flex-1 ml-3">
              <Text className="text-[#1E222B] font-normal text-base">{item?.title}</Text>
              <Text className="text-[#1E222B] font-light text-sm">${item?.price}</Text>
            </View>

            <View className="flex-row items-center">
              <Pressable onPress={removeItem}>
                <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/images/minus.png")}
                />
              </Pressable>
              <Text className="text-[#1E222B] font-medium text-base mx-3">{item?.quantity}</Text>
              <Pressable onPress={addItem}>
                <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/images/plus.png")}
                />
              </Pressable>
            </View>

        </View>
    );
  });


  export const BackView = memo(({title, icon, quantity}) => {

    const cartItems = useSelector((state)=>state.homeReducer.cartItems)
    const totalQuantity = cartItems?.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0,
    );
    const navigation=useNavigation()

    return (
        <View className="mx-5 flex-row items-center">
          <Pressable onPress={()=>navigation.goBack()} className="flex-1 flex-row items-center">
           <Image
              style={{ height: 50, width: 50}}
              source={require("../../assets/images/backButton.png")}
            />
            { title && <Text className="text-[#1E222B] font-light text-xl ml-3">{title} ({quantity})</Text>}
          </Pressable>
          {icon && <Pressable onPress={()=>navigation.navigate("cart")} className="p-1">
            <Image
              style={{ height: 26, width: 23, tintColor:'#1E222B' }}
              source={icon}
            />
            {totalQuantity!==0 && <View className="absolute bg-[#F9B023] w-5 h-5 rounded-full items-center justify-center  -right-1">
              <Text className="text-xs font-black text-white">{totalQuantity}</Text>
            </View>}
          </Pressable>}
        </View>
    );
  });
