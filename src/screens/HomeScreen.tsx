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
import { showError, toggleLoader } from "../global/GFunction";
import * as appwrite from "appwrite";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65f69e4c399f9d7e2938");

const databases = new Databases(client);

export default function HomeScreen(props: any) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    // fetchTasks();
    fatch();
  }, []);

  const addTask = async () => {
    console.log("call....");
    toggleLoader(true);
    try {
      if (task.trim() != "") {
        await databases
          .createDocument(
            "65f7326d8b6ab44c345e", //data base id
            "65f73b7a02f1ba6ecc2f", //collection id
            ID.unique(),
            { Title: task }
          )
          .then((responce) => {
            toggleLoader(false);
            setTask("");
            console.log("responce....", responce);
            fatch();
          })
          .catch((e) => {
            toggleLoader(false);

            console.log("error....", e);
            showError(
              '"Title" has invalid type. Value must be a valid string and no longer than 100 chars'
            );
          });
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const fatch = () => {
    console.log("Fatch");
    toggleLoader(true);

    const promise = databases.listDocuments(
      "65f7326d8b6ab44c345e", //data base id
      "65f73b7a02f1ba6ecc2f"
    );

    promise.then(
      function (response) {
        toggleLoader(false);
        setTasks(response.documents);
        setTotal(response.total);
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const msgAlert = (
    dataBaseID: any,
    callectionId: any,
    documentID: any,
    Title: any
  ) => {
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
            deleteDocument(dataBaseID, callectionId, documentID);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deleteDocument = async (
    dataBaseID: any,
    callectionId: any,
    documentID: any
  ) => {
    toggleLoader(true);

    try {
      const response = await Permission.delete("user:Subhuu");
      console.log("Permission deleted successfully", response);
    } catch (error) {
      console.error("Error deleting permission:", error);
    }

    const promise = databases.deleteDocument(
      dataBaseID,
      callectionId,
      documentID
    );
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

  const renderItem = ({ item, index }: any) => (
    <View
      style={[
        styles.task,
        {
          marginBottom: index == tasks.length - 1 ? 70 : 10,
        },
      ]}
    >
      <Text
        numberOfLines={2}
        style={[
          styles.taskText,
          // { textDecorationLine: item.completed ? "line-through" : "none" },
        ]}
      >
        {item.Title}
      </Text>
      <Text style={styles.time}>
        {"Create at: " + moment(item.$createdAt).format("YYYY/MMM/DD hh:mm A")}
      </Text>
      <View style={styles.vwBottom}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ViewDetails", {
              item: item,
            });
          }}
        >
          <Image source={images.ViewDetails} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            // handleUpdateDocument(
            //   item.$databaseId,
            //   item.$collectionId,
            //   item.$id
            // );
          }}
        >
          <Image source={images.EditList} />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            msgAlert(
              item.$databaseId,
              item.$collectionId,
              item.$id,
              item.Title
            );
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
        <Text style={styles.title}>To-Do List</Text>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Add a new task"
              onChangeText={(text) => setTask(text)}
              placeholderTextColor={`${colors.white}99`}
              cursorColor={colors.white}
              value={task}
              multiline
            />
          </View>
          <TouchableOpacity
            style={styles.vwAddBtn}
            onPress={() => {
              addTask();
            }}
          >
            <Image source={images.Add} />
            <Text style={styles.lblAdd}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.vwSecondMain}>
        <Text style={styles.lblTotal}>{"Total : " + total}</Text>
        <FlatList
          data={tasks}
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
    width: "77%",
    height: 70,
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
    height: 150,
    backgroundColor: colors.blue,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  vwAddBtn: {
    height: 44,
    backgroundColor: colors.aqurim,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
  vwSecondMain: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: -20,
    flex: 1,
  },
  lblAdd: {
    fontSize: 16,
    fontFamily: fontFamily.Medium,
    color: colors.white,
    marginLeft: 5,
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
    fontSize: 16,
    fontFamily: fontFamily.Medium,
    color: colors.white,
  },
});
