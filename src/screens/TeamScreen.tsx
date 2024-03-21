// App.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, Databases, ID, Permission } from "appwrite";
import { colors, fontFamily } from "../global/GConstant";
import { images } from "../assets/images";
import { showError, showSuccess, toggleLoader } from "../global/GFunction";
import * as appwrite from "appwrite";
import { client } from "../until";
import axios from "axios";

const databases = new Databases(client);

export default function TeamScreen(props: any) {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [teanList, setTeamList] = useState([]);
  const [teams] = useState(new appwrite.Teams(client));
  const [total, setTotal] = useState("");
  const [updateID, setupdateID] = useState("");

  useEffect(() => {
    // fetchTasks();
    fatch();
  }, []);

  const fatch = async () => {
    toggleLoader(true);
    try {
      const response = await teams.list();
      setTeamList(response.teams);
      setTotal(response.total);
      toggleLoader(false);
      console.log(JSON.stringify(response)); // Success
    } catch (error) {
      toggleLoader(false);
      console.error(error); // Failure
      Alert.alert("Failed to create team");
    }
  };

  const msgAlert = (id: any, Title: any) => {
    Alert.alert(
      Title,
      "Are you sure? You want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Delete",
          onPress: () => {
            deleteTeam(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const createTeam = async () => {
    console.log(teamName, teamName, teamMembers.split(","));
    toggleLoader(true);
    try {
      const response = await teams.create(
        ID.unique(),
        teamName.trim()
        // teamMembers.split(",")
      );
      toggleLoader(false);
      console.log(response); // Success
      setTeamMembers(""), setTeamName("");
      fatch();
      showSuccess("Team created successfully");
    } catch (error) {
      toggleLoader(false);
      console.error(error); // Failure
      showError("Failed to create team");
    }
  };

  const deleteTeam = async (id: any) => {
    toggleLoader(true);
    const promise = teams.delete(id);
    promise.then(
      function (response) {
        toggleLoader(false);
        fatch();
        console.log(response); // Success
      },
      function (error) {
        toggleLoader(false);
        console.log(error); // Failure
      }
    );
  };

  // const updateTeamName = async () => {
  //   toggleLoader(true);
  //   const promise = teams.getMembership(updateID, teamName);

  //   promise.then(
  //     function (response) {
  //       toggleLoader(false);
  //       setTeamName("");
  //       setupdateID("");
  //       setTeamMembers(""), fatch();
  //       console.log(response); // Success
  //     },
  //     function (error) {
  //       toggleLoader(false);
  //       console.log(error); // Failure
  //     }
  //   );
  // };

  const renderItem = ({ item, index }: any) => (
    <View
      style={[
        styles.task,
        {
          marginBottom: index == teanList.length - 1 ? 70 : 10,
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <Text numberOfLines={2} style={[styles.taskText]}>
          {item.name}
        </Text>
        <Text style={styles.lblMember}>{"Members " + item.total}</Text>
      </View>
      <Text style={styles.time}>
        {"Create at: " + moment(item.$createdAt).format("YYYY/MMM/DD hh:mm A")}
      </Text>

      <View style={styles.vwBottom}>
        <TouchableOpacity style={styles.vwInvite}>
          <Image source={images.Add} />
          <Text style={styles.lblInvite}>{"Invite"}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            setupdateID(item.$id);
            setTeamName(item.name);
          }}
        >
          <Image source={images.EditList} />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            msgAlert(item.$id, item.name);
          }}
        >
          <Image source={images.DeleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />

      <View style={styles.vwHeader}>
        <Text style={styles.title}>Team List</Text>

        <View style={styles.input}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Team name"
            onChangeText={(text) => setTeamName(text.trimStart())}
            placeholderTextColor={`${colors.white}99`}
            cursorColor={colors.white}
            value={teamName}
          />
        </View>

        <TouchableOpacity
          style={styles.vwAddBtn}
          onPress={() => {
            createTeam();
          }}
        >
          <Image source={images.Add} />
          <Text style={styles.lblAdd}>
            {updateID == "" ? "Create team" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.vwSecondMain}>
        <Text style={styles.lblTotal}>{"Total : " + total}</Text>
        <FlatList
          data={teanList}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={renderItem}
          bounces
          showsVerticalScrollIndicator={false}
          // keyExtractor={(item) => item.$id}
          style={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.Bold,
    marginBottom: 10,
    color: `${colors.white}99`,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    borderColor: `${colors.white}99`,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
    marginTop: 10,
    justifyContent: "center",
  },
  task: {
    marginBottom: 10,
    marginHorizontal: 20,
    paddingTop: 10,
    // height: 100,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 8,
  },
  taskText: {
    flex: 1,
    marginHorizontal: 20,
    fontFamily: fontFamily.Medium,
    color: colors.black,
    fontSize: 16,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  vwHeader: {
    height: 260,
    backgroundColor: colors.blue,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  vwAddBtn: {
    height: 44,
    backgroundColor: colors.aqurim,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
  },
  vwSecondMain: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: -20,
    flex: 1,
  },
  lblAdd: {
    fontSize: 20,
    fontFamily: fontFamily.Medium,
    color: colors.white,
    marginLeft: 10,
  },
  lblTotal: {
    marginTop: 20,
    fontFamily: fontFamily.Medium,
    color: colors.black,
    marginLeft: 20,
  },
  vwBottom: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: `${colors.grey}40`,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  time: {
    fontFamily: fontFamily.Light,
    color: colors.grey,
    marginLeft: 20,
    marginVertical: 5,
    fontSize: 12,
  },
  inputStyle: {
    flex: 1,

    paddingVertical: 5,
    fontSize: 14,
    fontFamily: fontFamily.Medium,
    color: colors.white,
  },
  lblMember: {
    fontFamily: fontFamily.Light,
    color: colors.grey,
    marginRight: 10,
  },
  vwInvite: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  lblInvite: {
    fontFamily: fontFamily.SemiBold,
    color: colors.black,
    marginRight: 10,
    fontSize: 15,
    marginLeft: 5,
  },
});
