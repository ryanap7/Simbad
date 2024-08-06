import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "./Text";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  backgroundColor?: string;
};

const Button = ({
  text,
  backgroundColor = Colors.light.primary[500],
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        GlobalTheme.center,
        {
          backgroundColor: rest.disabled
            ? Colors.light.neutral[500]
            : backgroundColor,
        },
      ]}
      {...rest}
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
