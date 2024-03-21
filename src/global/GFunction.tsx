import { showMessage } from "react-native-flash-message";

import { Alert, PermissionsAndroid, Platform } from "react-native";
import { colors, fontFamily } from "./GConstant";
// import DocumentPicker from "react-native-document-picker";
// import ImagePicker from "react-native-image-crop-picker";
// let loaderRef;

export function showError(message: any) {
  showMessage({
    message: message,
    type: "danger",
    duration: 2000,
    titleStyle: {
      color: colors.white,
      fontSize: 14,
      fontFamily: fontFamily.Bold,
    },
    icon: "info",
    style: {
      paddingTop: 20,
    },
  });
}

export function showSuccess(message: any) {
  showMessage({
    message: message,
    type: "success",
    duration: 2000,
    titleStyle: {
      color: colors.white,
      fontSize: 16,
      fontFamily: fontFamily.Bold,
    },
    icon: "success",
    style: {
      paddingTop: 20,
    },
  });
}

export const setLoaderRef = (ref) => {
  loaderRef = ref;
};

export const toggleLoader = (showLoader: any) => {
  if (loaderRef) {
    loaderRef.toggleLoader(showLoader);
  }
};
