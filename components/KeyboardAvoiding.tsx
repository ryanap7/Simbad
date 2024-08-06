import { GlobalTheme } from "@/themes/Styles";
import React, { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type KeyboardAvoidingProps = {
  children: ReactNode;
};

const KeyboardAvoiding: React.FC<KeyboardAvoidingProps> = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={GlobalTheme.full}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoiding;
