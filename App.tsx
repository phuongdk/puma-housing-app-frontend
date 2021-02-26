import axios from "axios";
import * as Font from "expo-font";
import * as ExpoLocalization from "expo-localization";
import React, { useEffect, useState } from "react";
import { LogBox, AsyncStorage } from "react-native";

import { RootNavigator } from "./src";
import { API_URL, getLang } from "./src/constants";
import { configureGlobalTypography } from "./src/helpers";
import { initLocalization } from "./src/localization";
import { LoadingManager } from "./src/presentation";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested",
]);

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(
  (config) => {
    LoadingManager.showLoading();
    return config;
  },
  (err) => {
    LoadingManager.hideLoading();
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (config) => {
    LoadingManager.hideLoading();
    return config;
  },
  (err) => {
    LoadingManager.hideLoading();
    return Promise.reject(err);
  }
);

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("APP_LANGUAGE").then((appLang) => {
      if (appLang === undefined || appLang === null) {
        appLang = ExpoLocalization.locale.split("-")[0];
      }
      const availableLang = getLang(appLang);
			initLocalization(availableLang);
			Font.loadAsync({
				"default-light": require("./assets/fonts/OpenSans-light.ttf"),
				"default-regular": require("./assets/fonts/OpenSans-regular.ttf"),
				"default-medium": require("./assets/fonts/OpenSans-medium.ttf"),
				"default-bold": require("./assets/fonts/OpenSans-bold.ttf"),
				"default-black": require("./assets/fonts/OpenSans-black.ttf"),
				"default-italic": require("./assets/fonts/OpenSans-black.ttf"),
			}).then(() => setIsFontLoaded(true));

      if (availableLang.isRTL) {
        Font.loadAsync({
          "default-light": require("./assets/fonts/mada-light.ttf"),
          "default-regular": require("./assets/fonts/mada-regular.ttf"),
          "default-medium": require("./assets/fonts/mada-bold.ttf"),
          "default-bold": require("./assets/fonts/mada-bold.ttf"),
          "default-black": require("./assets/fonts/mada-black.ttf"),
        }).then(() => setIsFontLoaded(true));
      } else {
        Font.loadAsync({
					"default-light": require("./assets/fonts/OpenSans-light.ttf"),
					"default-regular": require("./assets/fonts/OpenSans-regular.ttf"),
					"default-medium": require("./assets/fonts/OpenSans-medium.ttf"),
					"default-bold": require("./assets/fonts/OpenSans-bold.ttf"),
					"default-black": require("./assets/fonts/OpenSans-black.ttf"),
					"default-italic": require("./assets/fonts/OpenSans-black.ttf"),
        }).then(() => setIsFontLoaded(true));
      }
    });
  }, []);

  if (!isFontLoaded) {
    return null;
  }

	configureGlobalTypography();

	return <RootNavigator />;
};

export default App;
