import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import React from "react";
import { StyleSheet, View } from "react-native";
import Gap from "./Gap";
import Text from "./Text";

const Announcement = () => {
  const backgroundColor: string = useThemeColor(
    { light: "", dark: "" },
    "background"
  ).toString();

  return (
    <View style={[styles.container, GlobalTheme.shadow, { backgroundColor }]}>
      <Text size="SM">Pengumuman!</Text>
      <Gap height={4} />
      <Text
        size="XS"
        lightColor={Colors.light.neutral[800]}
        darkColor={Colors.dark.neutral[800]}
      >
        Penyaluran BLT tahap berikutnya akan dilaksanakan pada tanggal 15 Juli.
        Pastikan data penerima sudah diperbarui.
      </Text>
    </View>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  container: {
    borderRadius: scaleSize(8),
    padding: scaleSize(12),
    marginHorizontal: scaleSize(20),
    marginTop: scaleSize(8),
  },
});
