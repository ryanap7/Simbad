import { Colors } from "@/themes/Colors";
import { scaleSize } from "@/utils/Normalize";
import ToastHelper, { ToastState } from "@/utils/ToastHelper";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import Text from "./Text";

class Toast extends React.Component<{}, ToastState> {
  static instance: Toast | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      visible: false,
      message: "",
      type: "success",
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount(): void {
    ToastHelper.setInstance({ show: this.show, hide: this.hide });
  }

  show(type: ToastState["type"], message: string) {
    this.setState({ visible: true, type, message });

    setTimeout(() => {
      this.hide();
    }, 4000);
  }

  hide() {
    this.setState({ visible: false, message: "", type: "success" });
  }

  render() {
    const { visible, message, type } = this.state;
    let backgroundColor = Colors.light["Toast-Success"];
    switch (type) {
      case "success":
        backgroundColor = Colors.light["Toast-Success"];
        break;
      case "danger":
        backgroundColor = Colors.light["Toast-Danger"];
        break;
      case "warning":
        backgroundColor = Colors.light["Toast-Warning"];
        break;
      default:
        backgroundColor = Colors.light["Toast-Success"];
        break;
    }

    return (
      visible && (
        <Animated.View
          entering={SlideInUp.duration(1000)}
          exiting={SlideOutUp.duration(1000)}
          style={[styles.toast, { backgroundColor }]}
        >
          <View>
            <Text type="SemiBold" size="SM" lightColor={Colors.light.white}>
              {message}
            </Text>
          </View>
        </Animated.View>
      )
    );
  }
}

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: scaleSize(40),
    left: scaleSize(24),
    right: scaleSize(24),
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(10),
    borderRadius: scaleSize(8),
    zIndex: 1,
  },
  text: {
    width: "70%",
  },
});
