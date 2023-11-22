import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TailwindProvider } from "tailwindcss-react-native";
import FooterTabScreen from "./src/screens/FooterTabScreen";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>
            <Stack.Screen name="FooterTab" component={FooterTabScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default Route;
