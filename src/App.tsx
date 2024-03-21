import { LogBox, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import FlashMessage from "react-native-flash-message";
import { colors } from "./global/GConstant";
import CreateAccount from "./screens/CreateAccount";
import BottomTabNavigator from "./BottomTabNavigator/BottomTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfile from "./screens/EditProfile";
import Loader from "./config/Loader";
import { setLoaderRef } from "./global/GFunction";
import ViewDetails from "./screens/ViewDetails";
LogBox.ignoreAllLogs();
const App = () => {
  const [initialRouteName, setinitialRouteName] = useState("");

  const MainNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              headerTitleAlign: "center",
              title: "Create account",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerTitleAlign: "center",
              title: "Edit profile",
            }}
          />
          <Stack.Screen
            name="ViewDetails"
            component={ViewDetails}
            options={{
              headerTitleAlign: "center",
              title: "Details",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  useEffect(() => {
    // Check if the user is already logged in
    AsyncStorage.getItem("loggedIn").then((value: any) => {
      console.log(value);
      let data = JSON.parse(value);
      if (data) {
        console.log("User is already logged in");
        setinitialRouteName("BottomTabNavigator");
        // Redirect or do something else if needed
      } else {
        console.log("else");
        setinitialRouteName("LoginScreen");
      }
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
      <Loader ref={(ref) => setLoaderRef(ref)} />
      {initialRouteName !== "" ? <MainNavigation /> : null}
      <FlashMessage position={"top"} />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
