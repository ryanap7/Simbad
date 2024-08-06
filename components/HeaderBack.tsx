import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";
import NavigationServices from "@/utils/NavigationServices";

type Props = {
  title: string;
};

const HeaderBack = ({ title }: Props) => {
  const onBack = useCallback(() => {
    NavigationServices.navigate("/recipient");
  }, []);
  return (
    <View style={[styles.header, GlobalTheme.row]}>
      <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color={Colors.light.black}
        />
      </TouchableOpacity>
      <View style={[GlobalTheme.full, GlobalTheme.center]}>
        <Text type="SemiBold" size="BASE">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.light.white,
    paddingHorizontal: scaleSize(24),
    paddingVertical: scaleSize(16),
  },
});
