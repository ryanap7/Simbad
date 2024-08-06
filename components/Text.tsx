import { useThemeColor } from "@/hooks/useThemeColor";
import { scaleFont } from "@/utils/Normalize";
import React from "react";
import {
  TextProps,
  Text as TextRN,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";

export type ThemedTextProps = TextProps & {
  style?: TextStyle | ViewStyle | undefined | any;
  lightColor?: string;
  darkColor?: string;
  type?: "Bold" | "SemiBold" | "Medium" | "Regular";
  size?: "2XL" | "XL" | "LG" | "BASE" | "SM" | "XS";
  numberOfLines?: number;
};

const getSize = (size: ThemedTextProps["size"]) => {
  switch (size) {
    case "2XL":
      return 24;
    case "XL":
      return 20;
    case "LG":
      return 18;
    case "BASE":
      return 16;
    case "SM":
      return 12;
    case "XS":
      return 10;
    default:
      return 16;
  }
};

const Text = ({
  style,
  lightColor,
  darkColor,
  type = "Regular",
  size = "BASE",
  ...rest
}: ThemedTextProps) => {
  const fontFamily = `Poppins-${type}`;
  const fontSize = getSize(size);

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const lineHeight = fontSize * 1.6;

  return (
    <TextRN
      style={[
        {
          fontFamily,
          fontSize: scaleFont(fontSize),
          color,
          lineHeight,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default React.memo(Text);
