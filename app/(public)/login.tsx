import Button from "@/components/Button";
import Gap from "@/components/Gap";
import Input from "@/components/Input";
import KeyboardAvoiding from "@/components/KeyboardAvoiding";
import {
  initialState,
  sessionReducer,
  setEmail,
  setPassword,
} from "@/stores/Sessions/SessionsReducer";
import useSessionStore, { SessionModel } from "@/stores/Sessions/SessionsStore";
import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import { Image } from "expo-image";
import React, { useCallback, useReducer } from "react";
import { Dimensions, StyleSheet, useColorScheme, View } from "react-native";

const Login = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  const { login }: any = useSessionStore((item: SessionModel) => item);

  const onLoginPress = useCallback(async () => {
    const body = {
      email: state.email,
      password: state.password,
    };
    await login(body);
  }, [state, login]);

  return (
    <KeyboardAvoiding>
      <View style={[styles.page, GlobalTheme.full, { backgroundColor }]}>
        <View style={GlobalTheme.center}>
          <Image
            source={require("../../assets/Images/Logo.png")}
            style={styles.logo}
          />
        </View>
        <Gap height={24} />
        <Input
          label="Email"
          value={state.email}
          placeholder="Masukkan email anda"
          onChangeText={(text) => dispatch(setEmail(text))}
        />
        <Gap height={16} />
        <Input
          label="Kata Sandi"
          value={state.password}
          placeholder="Masukkan kata sandi anda"
          secureTextEntry
          onChangeText={(text) => dispatch(setPassword(text))}
        />
        <Gap height={24} />
        <View style={GlobalTheme.row}>
          <Button text="Masuk" onPress={onLoginPress} />
        </View>
      </View>
    </KeyboardAvoiding>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: scaleSize(24),
    paddingTop: Dimensions.get("window").height * 0.25,
  },
  logo: {
    width: Dimensions.get("window").width * 0.6,
    height: scaleSize(120),
  },
});
