import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontFamily } from "../global/GConstant";
import moment from "moment";

export default function ViewDetails(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.lblMessage}>{props.route?.params?.item.Title}</Text>
      <Text style={styles.time}>
        {"Create at: " +
          moment(props.route?.params?.item.$createdAt).format(
            "YYYY/MMM/DD hh:mm A"
          )}
      </Text>
      <Text style={styles.time}>
        {"Update at: " +
          moment(props.route?.params?.item.$updatedAt).format(
            "YYYY/MMM/DD hh:mm A"
          )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lblMessage: {
    fontFamily: fontFamily.Medium,
    color: colors.black,
    fontSize: 16,
  },
  time: {
    fontFamily: fontFamily.Light,
    color: colors.grey,
    marginVertical: 5,
    fontSize: 16,
  },
});
