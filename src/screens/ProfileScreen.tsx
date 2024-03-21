import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { Account, Client } from "appwrite";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { images } from "../assets/images";
import { colors, fontFamily, opacity } from "../global/GConstant";
import { toggleLoader } from "../global/GFunction";
import { client } from "../until";

const ProfileScreen = (props: any) => {
  useEffect(() => {
    AsyncStorage.getItem("userData").then((value: any) => {
      let data = JSON.parse(value);
      console.log(data.$id);
      setUserId(data.userId);
      setUserEmail(data.providerUid);
      setSessionID(data.$id);
      setCountryCode(data.countryCode);
      setCountryName(data.countryName);
      setDeviceModel(data.osName);
    });
    // getDetails();
  }, []);

  const getDetails = () => {
    const client = new Client();
    const account = new Account(client);
    client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("65f69e4c399f9d7e2938"); // Your project ID
    const promise = account.get();

    promise.then(
      function (response: any) {
        console.log("response", response); // Success
        // setUserId(response?.userId);
        // setUserEmail(response?.providerUid);
        // setSessionID(response?.$id);
        // setCountryCode(response?.countryCode);
        // setCountryName(response?.countryName);
        // setDeviceModel(response?.osName);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const account = new Account(client);
  const [userEmail, setUserEmail] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [deviceModel, setDeviceModel] = useState(" ");
  const [userId, setUserId] = useState("");
  const [sessionID, setSessionID] = useState("");

  const msgAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            handleLogout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = async () => {
    toggleLoader(true);
    try {
      await account.deleteSession(sessionID).then((response: any) => {
        console.log(response, "====response"); // Success
        toggleLoader(false);
        AsyncStorage.clear();
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          })
        );
      });
    } catch (error) {
      toggleLoader(false);
      console.log("error", error); // Failure
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />

      <View style={styles.vwHeader}>
        {/* <TouchableOpacity
          activeOpacity={opacity}
          style={styles.vwEdit}
          onPress={() => {
            props.navigation.navigate("EditProfile", {
              sessionID: sessionID,
            });
          }}
        >
          <Text style={styles.lblEdit}>{"Edit"}</Text>
          <Image
            style={{ tintColor: colors.white }}
            source={images.EditProfile}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.vwSecondMain}>
        <Image style={styles.vwProfileImage} source={images.ProfileIcon} />
        <View style={styles.profileInfo}>
          <Text style={styles.label}>User Id:</Text>
          <View style={styles.vwText}>
            <Image source={images.Person} />
            <Text style={styles.value}>{userId}</Text>
          </View>

          <Text style={styles.label}>Email:</Text>
          <View style={styles.vwText}>
            <Image source={images.Email} />
            <Text style={styles.value}>{userEmail}</Text>
          </View>

          <Text style={styles.label}>Country:</Text>
          <View style={styles.vwText}>
            <Image source={images.MapIcon} />
            <Text style={styles.value}>
              {countryName} ({countryCode})
            </Text>
          </View>

          <Text style={styles.label}>Device Model:</Text>
          <View style={styles.vwText}>
            <Image source={images.MobilePhone} />
            <Text style={styles.value}>{deviceModel}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={msgAlert}>
            <Image style={{ tintColor: colors.white }} source={images.Logout} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileInfo: {
    marginBottom: 50,
    paddingHorizontal: 20,
    top: -50,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.Bold,
    marginBottom: 5,
    color: colors.black,
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    color: colors.grey,
    fontFamily: fontFamily.Medium,
    marginBottom: 5,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: colors.blue,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
    width: "40%",
    marginTop: 20,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.Bold,
    marginLeft: 5,
  },
  vwHeader: {
    height: 150,
    backgroundColor: colors.blue,
    width: "100%",
  },
  vwProfileImage: {
    top: -60,
    height: 150,
    aspectRatio: 1,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: colors.blue,
  },
  vwText: {
    borderBottomWidth: 1,
    borderColor: `${colors.blue}80`,
    flexDirection: "row",
    alignItems: "center",
  },
  vwSecondMain: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: -20,
    flex: 1,
  },
  vwEdit: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 30,
  },
  lblEdit: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.Medium,
    marginRight: 5,
  },
});

export default ProfileScreen;
