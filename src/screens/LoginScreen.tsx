// LoginScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { Account } from "appwrite";
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
  Alert,
} from "react-native";
import { images } from "../assets/images";
import { colors, fontFamily } from "../global/GConstant";
import { showError, showSuccess } from "../global/GFunction";
import { Email, Password } from "../global/Validation";
import { client } from "../until";
import { setLoaderRef, toggleLoader } from "../global/GFunction";
const LoginScreen = (props: any) => {
  useEffect(() => {
    // AsyncStorage.getItem("userData").then((value) => {
    //   console.log(value);
    // });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const account = new Account(client); // Init your Web SDK

  const validation = () => {
    if (email == "") {
      showError("Please enter email");
    } else if (!Email.test(email)) {
      showError("Please enter valid email");
    } else if (password == "") {
      showError("Please enter password");
    } else if (password.length < 8) {
      showError("Password should contain at least 8 characters");
    } else {
      toggleLoader(true);
      handleLogin();
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  const handleLogin = () => {
    account
      .createEmailPasswordSession(email, password)
      .then((response) => {
        console.log("User logged in successfully:", response);
        AsyncStorage.setItem("loggedIn", "true");
        AsyncStorage.setItem("userData", JSON.stringify(response));
        showSuccess("Success");
        toggleLoader(false);
        setTimeout(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabNavigator" }],
            })
          );
        }, 1000);
      })
      .catch(function (error) {
        toggleLoader(false);
        console.error("An error occurred:", error);
        showError("Invalid credentials. Please check the email and password.");
      });
  };

  const handleForgotPassword = async () => {
    try {
      const mail = "email@example.com";
      const response = await account.createRecovery(
        mail,
        "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
      );
      console.log(response); // Success
    } catch (error) {
      console.log(error); // Failure
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
          <Text style={[styles.lblEmail, { marginTop: 20 }]}>{"Password"}</Text>

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
            {/* <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleForgotPassword}
            >
              <Text
                style={[
                  styles.forgotPassword,
                  {
                    fontSize: 14,
                  },
                ]}
              >
                Forgot password?
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={{}}
              onPress={(text: any) => {
                props.navigation.navigate("CreateAccount");
              }}
            >
              <Text style={styles.forgotPassword}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={validation}
      >
        <Text style={styles.lblBtn}>{"Login"}</Text>
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
    marginTop: 150,
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

export default LoginScreen;
