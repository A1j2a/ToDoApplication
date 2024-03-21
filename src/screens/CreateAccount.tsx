// LoginScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { Account, Client } from "appwrite";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { images } from "../assets/images";
import { colors, fontFamily } from "../global/GConstant";
import { showError, showSuccess, toggleLoader } from "../global/GFunction";
import { Email, Password } from "../global/Validation";
import { client } from "../until";

const CreateAccount = (props: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ padding: 7 }}
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <Image source={images.arrowRight} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const account = new Account(client); // Init your Web SDK

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
      handleCreate();
    }
  };

  const handleCreate = () => {
    toggleLoader(true);
    account
      .create(name, email, password)
      .then(function (response) {
        verification();
        console.log("User Create successfully:", response);
        AsyncStorage.setItem("loggedIn", "true");
        AsyncStorage.setItem("userData", JSON.stringify(response));
        showSuccess("Success");
        toggleLoader(false);
        setTimeout(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            })
          );
        }, 1000);
      })
      .catch(function (error) {
        toggleLoader(false);
        const msg =
          "[AppwriteException: A user with the same id, email, or phone already exists in this project.]";
        if (error == msg) {
          showError("user already exists");
        }
        console.error("Error logging in:", error);
      });
  };

  const verification = () => {
    const clients = new Client();
    const account = new Account(client);

    clients
      .setEndpoint("https://cloud.appwrite.io/v1/account/verification") // Your API Endpoint
      .setProject("65f69e4c399f9d7e2938"); // Your project ID
    const promise = account.createVerification(
      "https://mail.google.com/mail/u/0/#inbox"
    );
    promise.then(
      function (response) {
        console.log("verification", response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
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
          <Text style={styles.lblEmail}>{"Email"}</Text>
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
          <Text style={[styles.lblEmail]}>{"Password"}</Text>

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
          <View style={styles.vwBttomBar}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                props.navigation.navigate("LoginScreen");
              }}
            >
              <Text style={styles.forgotPassword}>
                {"Already have an account login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={validation}
      >
        <Text style={styles.lblBtn}>{"Sign Up"}</Text>
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

export default CreateAccount;
