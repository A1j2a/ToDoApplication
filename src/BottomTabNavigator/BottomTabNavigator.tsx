import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../screens/HomeScreen";
import { colors, fontFamily } from "../global/GConstant";
import { images } from "../assets/images";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import TeamScreen from "../screens/TeamScreen";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          justifyContent: "center",
          borderTopWidth: 0,
          paddingTop: Platform.OS == "ios" ? null : 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: `${colors.blue}50`,
          position: "absolute",
          elevation: 0,
          bottom: 0,
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,

        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.lblTitle,
                {
                  color: focused ? colors.blue : colors.grayColor,
                  fontFamily: focused ? fontFamily.Medium : fontFamily.Regular,
                },
              ]}
            >
              {"Home"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              style={{ tintColor: focused ? colors.blue : colors.grayColor }}
              source={focused ? images.HomeFTiz : images.UnHome}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TeamScreen"
        component={TeamScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.lblTitle,
                {
                  color: focused ? colors.blue : colors.grayColor,
                  fontFamily: focused ? fontFamily.Medium : fontFamily.Regular,
                },
              ]}
            >
              {"Teams"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              style={{
                tintColor: focused ? colors.blue : colors.grayColor,
                height: 25,
                aspectRatio: 1,
              }}
              source={focused ? images.Peoples : images.Peoples}
            />
          ),
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.lblTitle,
                {
                  color: focused ? colors.blue : colors.grayColor,
                  fontFamily: focused ? fontFamily.Medium : fontFamily.Regular,
                },
              ]}
            >
              {"Profile"}
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              style={{ tintColor: focused ? colors.blue : colors.grayColor }}
              source={focused ? images.ProfileHTz : images.UnProfile}
            />
          ),
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  lblTitle: {
    fontSize: 14,
    paddingBottom: Platform.OS == "ios" ? null : 20,
    textAlign: "center",
  },
  headerTitleStyle: {
    color: colors.darkBlack,
    fontFamily: fontFamily.SemiBold,
    fontSize: 18,
  },
});
