import { useThemeColor } from "@/hooks/useThemeColor";
import useSessionStore, { SessionModel } from "@/stores/Sessions/SessionsStore";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import ProfileServices from "@/services/profileServices";
import ToastHelper from "@/utils/ToastHelper";

const Statistic = () => {
  const backgroundColor: string = useThemeColor(
    { light: "", dark: "" },
    "primary"
  )[800];

  const color: string = useThemeColor(
    { light: "", dark: "" },
    "white"
  ).toString();

  const { user }: any = useSessionStore((state: SessionModel) => state);
  const [count, setCount] = useState(null);

  const getData = useCallback(async () => {
    try {
      const res = await ProfileServices.countRecipientsByVillageId(
        user?.village?.id
      );
      const { recipient_count } = res.data.data;
      setCount(recipient_count);
    } catch (error: any) {
      ToastHelper.show({
        type: "danger",
        message: error.message,
      });
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={[styles.container, GlobalTheme.shadow, { backgroundColor }]}>
      <Text size="SM" lightColor={color} darkColor={color}>
        Data penerima di desa {user?.village?.name}
      </Text>
      <Text type="SemiBold" size="2XL" lightColor={color} darkColor={color}>
        {count ?? "-"}
      </Text>
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    padding: scaleSize(16),
    borderRadius: scaleSize(8),
    marginHorizontal: scaleSize(20),
    marginVertical: scaleSize(16),
  },
});
