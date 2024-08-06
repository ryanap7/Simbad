import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import ModalRN from "react-native-modal";

type BottomSheetProps = {
  children: ReactNode;
  height?: any;
};

type BottomSheetState = {
  visible: boolean;
};

class Modal extends React.Component<BottomSheetProps, BottomSheetState> {
  constructor(props: BottomSheetProps) {
    super(props);
    this.state = {
      visible: false,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    const { children, height = "auto" } = this.props;
    return (
      <ModalRN
        useNativeDriver
        isVisible={this.state.visible}
        style={styles.container}
        animationIn="bounceIn"
        animationOut="bounceOut"
        backdropColor={Colors.dark.background}
        backdropOpacity={0.6}
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
        hideModalContentWhileAnimating
      >
        <View style={[GlobalTheme.center, { maxHeight: height }]}>
          {children}
        </View>
      </ModalRN>
    );
  }
}

export default Modal;

const styles = StyleSheet.create({
  container: {
    margin: scaleSize(20),
  },
});
