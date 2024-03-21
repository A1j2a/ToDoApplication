import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../global/GConstant";

export default class Loader extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Modal
        backdropOpacity={0}
        style={{ margin: 0 }}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={this.state.loading}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      </Modal>
    );
  }

  toggleLoader(shouldShow) {
    this.setState({ loading: shouldShow });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#00000070",
  },
});
