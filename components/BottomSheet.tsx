import withColorScheme from "@/hoc/withColorScheme";
import { Colors } from "@/themes/Colors";
import { scaleSize } from "@/utils/Normalize";
import React, { ReactNode } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Modal from "react-native-modal";

type BottomSheetProps = {
  children: ReactNode;
  height?: any;
};

type BottomSheetState = {
  visible: boolean;
};

class BottomSheet extends React.Component<BottomSheetProps, BottomSheetState> {
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
      <Modal
        useNativeDriver
        isVisible={this.state.visible}
        style={styles.container}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor={Colors.dark.background}
        backdropOpacity={0.6}
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
        hideModalContentWhileAnimating
      >
        <View
          style={[
            styles.wrapper,
            { height: height, backgroundColor: Colors.light.white },
          ]}
        >
          {children}
        </View>
      </Modal>
    );
  }
}

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-end",
  },
  wrapper: {
    borderTopLeftRadius: scaleSize(16),
    borderTopRightRadius: scaleSize(16),
  },
});
