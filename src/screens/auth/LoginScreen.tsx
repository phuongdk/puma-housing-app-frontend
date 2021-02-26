import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Toast from 'react-native-toast-message';

import {
  HeaderLine,
  PrimaryButton,
  Separator,
  TextInput,
  KeyboardView,
  Text,
} from "../../components";
import { AuthenticationContext } from "../../context";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { AuthService } from "../../services";
import { Theme } from "../../theme";

export const LoginScreen = () => {
  const authContext = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = () => {
    if (username === "" || password === "") {
			Toast.show({
				type: 'error',
				text1: '',
				text2: getString('Required Login Inputs'),
				onPress: () => {
					Toast.hide();
				}
			});
      return;
    }
    AuthService.login(username, password)
      .then(async (user) => {
        await authContext.login(user);
        navigation.goBack();
      })
      .catch((e) => {
				Toast.show({
					type: 'error',
					text1: '',
					text2: e.message,
				});
			});
  };

  const onClickRegister = () => {
    navigation.navigate(NavigationNames.RegisterScreen);
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <HeaderLine />
      <KeyboardView style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Text style={styles.titleText}>{getString("Login Title")}</Text>
          <TextInput
            inputProps={{
              placeholder: getString("Username"),
              value: username,
              onChangeText: setUsername,
            }}
          />
          <Separator height={16} />
          <TextInput
            inputProps={{
              placeholder: getString("Password"),
              secureTextEntry: true,
              textContentType: "none",
              autoCorrect: false,
              value: password,
              onChangeText: setPassword,
            }}
          />
          <Separator height={32} />
          <PrimaryButton
            title={getString("LOGIN_UPPER")}
            onPress={onClickLogin}
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onClickRegister}
          >
            <Text style={styles.registerButtonTitle}>
              {getString("REGISTER_UPPER")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 42,
    fontFamily: "default-light",
    color: Theme.colors.primaryColor,
    marginBottom: 24,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  registerButtonTitle: { color: Theme.colors.gray },
});