import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "./Text";
import Gap from "./Gap";
import { scaleFont, scaleSize } from "@/utils/Normalize";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface InputProps extends TextInputProps {
  label?: string;
  hasError?: boolean;
  disabled?: boolean;
  required?: boolean;
  textSize?: number;
  paddingVertical?: number;
}

export interface InputState {
  isHidden: boolean;
  borderColor: string;
}

class Input extends Component<InputProps, InputState> {
  private inputRef: React.RefObject<TextInput>;

  constructor(props: InputProps) {
    super(props);
    this.state = {
      isHidden: props.secureTextEntry || false,
      borderColor: Colors.light.neutral[200],
    };
    this.inputRef = React.createRef<TextInput>();
  }

  onFocus = () => {
    this.setState({ borderColor: Colors.light.neutral[500] });
  };

  onBlur = () => {
    this.setState({ borderColor: Colors.light.neutral[200] });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState: any) => ({ isHidden: !prevState.isHidden }));
  };

  focus = () => {
    if (this.inputRef?.current) {
      this.inputRef.current.focus();
    }
  };

  render() {
    const { isHidden, borderColor } = this.state;
    const {
      hasError,
      label,
      disabled,
      required,
      textSize = 14,
      paddingVertical = 12,
      ...restProps
    } = this.props;

    return (
      <View>
        <Text
          size="SM"
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}
        >
          {label}
        </Text>
        <Gap height={12} />
        <View style={(GlobalTheme.row, GlobalTheme.center)}>
          <View
            style={[
              styles.inputWrapper,
              {
                borderColor: hasError ? "red" : borderColor,
                backgroundColor: disabled
                  ? Colors.light.neutral[200]
                  : Colors.light.white,
              },
            ]}
          >
            <TextInput
              {...restProps}
              ref={this.inputRef}
              style={[
                styles.input,
                {
                  fontSize: scaleFont(textSize),
                  lineHeight: scaleFont(textSize * 1.6),
                  paddingVertical: scaleSize(paddingVertical),
                  textAlignVertical: "center",
                },
              ]}
              placeholderTextColor={Colors.light.neutral[500]}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              secureTextEntry={isHidden}
            />
            {restProps.secureTextEntry!! && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.togglePasswordVisibility}
              >
                {isHidden ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={16}
                    color={Colors.light.black}
                  />
                ) : (
                  <Ionicons
                    name="eye-outline"
                    size={16}
                    color={Colors.light.black}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default Input;

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: scaleSize(16),
    borderRadius: scaleSize(12),
    borderWidth: 1,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontFamily: "Monrape-Regular",
    color: Colors.light.black,
    textAlignVertical: "center",
  },
});
