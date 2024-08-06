import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import { Image } from "expo-image";
import React, { useCallback, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Gap from "./Gap";
import Text from "./Text";
import useSessionStore, { SessionModel } from "@/stores/Sessions/SessionsStore";
import Modal from "./Modal";
import Button from "./Button";
import NavigationServices from "@/utils/NavigationServices";
import ToastHelper from "@/utils/ToastHelper";
import AuthServices from "@/services/authServices";
import LoadingHelper from "@/utils/LoadingHelper";

const Header = () => {
  const ref = useRef<Modal | null>(null);

  const { user, setLogout }: any = useSessionStore(
    (state: SessionModel) => state
  );

  const onPress = useCallback(() => {
    ref.current?.show();
  }, []);

  const onClose = useCallback(() => {
    ref.current?.hide();
  }, []);

  const onLogoutPress = useCallback(async () => {
    LoadingHelper.show();
    try {
      const res = await AuthServices.logout();

      if (res.status === 200) {
        LoadingHelper.hide();
        setLogout();
        NavigationServices.replace("/login");
      }
    } catch (error: any) {
      LoadingHelper.hide();
      ToastHelper.show({
        type: "danger",
        message: error.message,
      });
    }
  }, []);

  return (
    <View style={[styles.container, GlobalTheme.row]}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image
          style={styles.image}
          source={`https://ui-avatars.com/api/?name=${user?.email}`}
          contentFit="cover"
          transition={1000}
        />
      </TouchableOpacity>
      <Gap width={12} />
      <View style={styles.content}>
        <Text>Hello, {user?.name}</Text>
        <Text
          size="XS"
          lightColor={Colors.light.neutral[800]}
          darkColor={Colors.dark.neutral[800]}
          numberOfLines={2}
        >
          {user?.village?.name ?? "-"}
        </Text>
      </View>

      <Modal ref={ref}>
        <View style={styles.modal}>
          <Text
            type="SemiBold"
            size="SM"
            lightColor={Colors.light.black}
            darkColor={Colors.dark.black}
          >
            Apakah yakin ingin keluar?
          </Text>
          <Gap height={16} />
          <View style={GlobalTheme.row}>
            <Button
              text="Tidak"
              backgroundColor={Colors.light.neutral[500]}
              onPress={onClose}
            />
            <Gap width={16} />
            <Button text="Ya" onPress={onLogoutPress} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(16),
  },
  image: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    resizeMode: "contain",
  },
  content: {
    maxWidth: "90%",
  },
  modal: {
    width: "90%",
    padding: scaleSize(24),
    backgroundColor: Colors.light.white,
    borderRadius: scaleSize(8),
  },
});
