import { scaleSize } from "@/utils/Normalize";
import React from "react";
import { View } from "react-native";

const Gap = ({ width = 0, height = 0 }) => {
  return (
    <View style={{ width: scaleSize(width), height: scaleSize(height) }} />
  );
};

export default React.memo(Gap);
