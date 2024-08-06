import React, { ReactNode } from "react";
import { useColorScheme } from "react-native";

const withColorScheme = (Component: any) => {
  return (props: any) => {
    const colorScheme = useColorScheme();
    return <Component {...props} colorScheme={colorScheme} />;
  };
};

export default withColorScheme;
