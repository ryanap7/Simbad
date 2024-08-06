import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Fragment } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Gap from "./Gap";
import Text from "./Text";
import { Image } from "expo-image";

interface InputFileProps {
  label: string;
  value: any;
  onPress?: () => void;
}

const InputFile: React.FC<InputFileProps> = ({ label, value, onPress }) => {
  return (
    <Fragment>
      <Text size="SM">{label}</Text>
      <Gap height={12} />
      {value ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Image style={styles.preview} source={{ uri: value.uri }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.card,
            GlobalTheme.center,
            { borderColor: Colors.light.neutral[200] },
          ]}
          onPress={onPress}
        >
          <Ionicons
            name="camera-outline"
            size={32}
            color={Colors.light.neutral[700]}
          />
          <Gap height={8} />
          <Text size="SM" lightColor={Colors.light.neutral[700]}>
            Masukkan Foto anda
          </Text>
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default InputFile;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    height: scaleSize(178),
    borderRadius: scaleSize(16),
    borderWidth: 1,
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: scaleSize(178),
    borderRadius: scaleSize(16),
    backgroundColor: Colors.light.white,
  },
});
