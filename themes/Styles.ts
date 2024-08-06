import { TextStyle, ViewStyle } from "react-native";
import { Colors } from "./Colors";

interface GlobalThemeType {
  shadow: ViewStyle;
  full: ViewStyle;
  row: ViewStyle;
  between: ViewStyle;
  center: ViewStyle & TextStyle;
}

export const GlobalTheme: GlobalThemeType = {
  shadow: {
    shadowColor: Colors.dark.background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  full: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  between: {
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};
