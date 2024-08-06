import LoadingHelper from "@/utils/LoadingHelper";
import React from "react";
import { StyleSheet, View } from "react-native";
import Loader from "./Loader";

interface LoadingState {
  visible: boolean;
}

class Loading extends React.Component<{}, LoadingState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      visible: false,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount(): void {
    LoadingHelper.setInstance({ show: this.show, hide: this.hide });
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      visible && (
        <View style={styles.page}>
          <Loader active={visible} />
        </View>
      )
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  page: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
