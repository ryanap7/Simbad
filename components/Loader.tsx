import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type Props = {
  active?: boolean;
};

type State = {};

type PropsObjectAnimated = {
  value: Animated.Value;
  sizes: [number, number, number];
};

const ObjectAnimated: React.FC<PropsObjectAnimated> = ({ value, sizes }) => (
  <Animated.View
    style={[
      styles.circle,
      {
        transform: [
          {
            scale: value.interpolate({
              inputRange: [0, 1, 2],
              outputRange: sizes,
            }),
          },
        ],
        backgroundColor: value.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [
            Colors.light.primary[100],
            Colors.light.primary[500],
            Colors.light.primary[100],
          ],
        }),
      },
    ]}
  />
);

class Loader extends Component<Props, State> {
  animatedValue: Animated.Value;

  constructor(props: Props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  setTimingAnimated = (
    originalValue: Animated.Value,
    toValue: number,
    duration: number
  ) => {
    return Animated.timing(originalValue, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  animate = () => {
    Animated.sequence([
      this.setTimingAnimated(this.animatedValue, 1, 750),
      this.setTimingAnimated(this.animatedValue, 2, 750),
      this.setTimingAnimated(this.animatedValue, 0, 750),
    ]).start(this.animate);
  };

  render() {
    const { active } = this.props;
    return active ? (
      <View style={[GlobalTheme.full, GlobalTheme.center]}>
        <View style={[GlobalTheme.row, GlobalTheme.center]}>
          <ObjectAnimated value={this.animatedValue} sizes={[1.5, 1, 1]} />
          <ObjectAnimated value={this.animatedValue} sizes={[1, 1.5, 1]} />
          <ObjectAnimated value={this.animatedValue} sizes={[1, 1, 1.5]} />
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  circle: {
    height: scaleSize(8),
    width: scaleSize(8),
    margin: scaleSize(4),
    borderRadius: scaleSize(8),
  },
});

export default Loader;
