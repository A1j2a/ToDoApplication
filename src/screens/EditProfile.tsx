import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Account, Client } from "appwrite";
import { images } from "../assets/images";
import { colors, fontFamily } from "../global/GConstant";
import { showError, toggleLoader } from "../global/GFunction";
import { Email } from "../global/Validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = (props: any) => {
  useEffect(() => {
    AsyncStorage.getItem("userData").then((value: any) => {
      let data = JSON.parse(value);
      console.log(data.$id);
      setEmail(data.providerUid);
      setName(data.userId);
    });
    // getDetails();
  }, []);

  const [currentEmail, setCurrentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isShow, setIsShow] = useState(false);

  const validation = () => {
    if (name == "") {
      showError("Please enter full name");
    } else if (email == "") {
      showError("Please enter email");
    } else if (!Email.test(email)) {
      showError("Please enter valid email");
    } else if (password == "") {
      showError("Please enter password");
    } else if (password.length < 8) {
      showError("Password should contain at least 8 characters");
    } else {
      console.log("Email is ", email);
      console.log("name is ", name);

      handleUpdate();
    }
  };

  const handleUpdate = async () => {
    toggleLoader(true);

    const client = new Client();
    const account = new Account(client);

    client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("65f69e4c399f9d7e2938"); // Your project ID

    try {
      const response = await account.updateEmail(email, password);
      const responseName = await account.updateName(name);
      toggleLoader(false);

      console.log("Email", response); // Success
      console.log("Name", responseName);
      Alert.alert("Success", "Updated successfully");
    } catch (error) {
      toggleLoader(false);

      console.error("Error logging in:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.borderColor}
        barStyle={"dark-content"}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={styles.inputContainer}>
          <Text
            style={[
              styles.lblEmail,
              {
                marginTop: 0,
              },
            ]}
          >
            {"user name"}
          </Text>
          <View style={styles.vwTextInpute}>
            <Image source={images.Person} />

            <TextInput
              placeholder="userID"
              value={name}
              onChangeText={(text: any) => {
                setName(text.trim());
              }}
              style={styles.input}
            />
          </View>
          {/* <Text style={styles.lblEmail}>{"Current email"}</Text> */}
          {/* <View style={styles.vwTextInpute}>
            <Image source={images.Email} />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              value={currentEmail}
              editable={false}
              style={styles.input}
            />
          </View> */}
          <Text style={styles.lblEmail}>{"New email"}</Text>

          <View style={styles.vwTextInpute}>
            <Image source={images.Email} />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              value={email}
              onChangeText={(text: any) => {
                setEmail(text.trimStart());
              }}
              style={styles.input}
            />
          </View>
          <Text style={[styles.lblEmail]}>{"Current password"}</Text>

          <View style={styles.vwTextInpute}>
            <Image source={images.Lock} />

            <TextInput
              placeholder="Password"
              value={password}
              maxLength={10}
              onChangeText={(text: any) => {
                setPassword(text.trimStart());
              }}
              style={styles.input}
              secureTextEntry={isShow}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setIsShow(!isShow);
              }}
            >
              <Image
                style={{ height: 18, aspectRatio: 1 }}
                source={isShow ? images.CloseEye : images.eyeOpen}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={validation}
      >
        <Text style={styles.lblBtn}>{"Update"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.borderColor,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
    shadowColor: colors.blue,
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 4,
    marginTop: 100,
  },
  input: {
    width: "100%",
    flex: 1,
    marginLeft: 10,
  },
  vwTextInpute: {
    height: 40,
    backgroundColor: colors.borderColor,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  lblEmail: {
    fontFamily: fontFamily.Medium,
    textAlign: "left",
    color: colors.black,
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    bottom: 30,
    height: 45,
    backgroundColor: colors.blue,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    marginTop: 20,
    color: "#007bff",
    fontFamily: fontFamily.Medium,
    textAlign: "center",
    fontSize: 16,
  },
  vwBttomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lblBtn: {
    color: colors.white,
    fontFamily: fontFamily.Bold,
    textAlign: "center",
    fontSize: 16,
  },
});

export default EditProfile;
