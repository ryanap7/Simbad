import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";

type ButtonProps = {
  text: string;
  backgroundColor?: string;
  onPress?: () => void;
};

const Button = ({
  text,
  backgroundColor = Colors.light.primary[500],
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, GlobalTheme.center, { backgroundColor }]}
      onPress={onPress}
    >
      <Text size="SM" lightColor={Colors.light.white}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(24),
    borderRadius: scaleSize(8),
  },
});
