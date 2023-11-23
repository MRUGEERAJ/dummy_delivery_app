import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TailwindProvider } from "tailwindcss-react-native";
import FooterTabScreen from "./src/screens/FooterTabScreen";
import ItemScreen from "./src/screens/home/ItemScreen";
import CartScreen from "./src/screens/home/CartScreen";
import { store } from './configureStore';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
              <Stack.Screen name="footerTab" component={FooterTabScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="item" component={ItemScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="cart" component={CartScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default Route;
