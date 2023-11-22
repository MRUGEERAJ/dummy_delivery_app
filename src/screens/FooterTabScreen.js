import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home/HomeScreen";
import FavouriteScreen from "./favourite/FavouriteScreen";
import CategoryScreen from "./category/CategoryScreen";
import MoreScreen from "./more/MoreScreen";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        backgroundColor: "#F8F7FB",
        height: SCREEN_HEIGHT / 11,
        alignItems: "flex-start",
        borderRadius: 30,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        let source;
        if (route.name === "Home") {
          source = isFocused
            ? require("../assets/images/homeSelected.png")
            : require("../assets/images/home.png");
        } else if (route.name === "Category") {
          source = isFocused
            ? require("../assets/images/categorySelected.png")
            : require("../assets/images/category.png");
        } else if (route.name === "Favourites") {
          source = isFocused
          ? require("../assets/images/heartSelected.png")
          : require("../assets/images/heart.png");
        } else if (route.name === "More") {
          source = isFocused
          ? require("../assets/images/moreSelected.png")
          : require("../assets/images/more.png");
        }

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={[
              {
                height: "80%",
                width: "20%",
                alignItems: "center",
                justifyContent: "center",
              },
              isFocused && {
                backgroundColor: "#050505",
                borderRadius: 50,
                height: SCREEN_HEIGHT / 13,
                bottom: 25,
                width: SCREEN_WIDTH / 6,
              },
            ]}
          >
            <Image style={{ height: 25, width: 25 }} source={source} />
            {!isFocused && (
              <Text style={{ color: "#8891A5", marginTop: 3, fontSize: 12 }}>
                {label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const FooterTabScreen = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={() => ({
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default FooterTabScreen;
