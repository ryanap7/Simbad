import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import React from "react";
import { StyleSheet, View } from "react-native";
import Gap from "./Gap";
import Skeleton from "./Skeleton";

const CardSkeleton = () => {
  return (
    <View style={[styles.card]}>
      <View>
        <View style={GlobalTheme.row}>
          <Skeleton
            height={scaleSize(40)}
            width={scaleSize(40)}
            borderRadius={scaleSize(20)}
          />
          <Gap width={16} />
          <View style={styles.content}>
            <Skeleton
              width="50%"
              height={scaleSize(16)}
              borderRadius={scaleSize(4)}
            />
            <Gap height={4} />
            <Skeleton
              height={scaleSize(12)}
              width="40%"
              borderRadius={scaleSize(4)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardSkeleton;

const styles = StyleSheet.create({
  card: {
    paddingVertical: scaleSize(12),
    borderBottomWidth: 0.2,
    borderColor: Colors.dark.neutral[500],
  },
  content: {
    width: "85%",
  },
});
