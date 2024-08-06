import { GlobalTheme } from "@/themes/Styles";
import { FlashList } from "@shopify/flash-list";
import React, { Component } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Text, { ThemedTextProps } from "./Text";
import { Colors } from "@/themes/Colors";
import { scaleSize } from "@/utils/Normalize";
import BottomSheet from "./BottomSheet";
import Gap from "./Gap";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ItemsProps {
  key: string | number;
  value: string;
}

type SelectState = {
  borderColor: string;
};

interface SelectProps {
  label?: string;
  value: string;
  textType?: ThemedTextProps["type"];
  textSize?: ThemedTextProps["size"];
  hasError?: boolean;
  disabled?: boolean;
  data: ItemsProps[];
  onPress?: (item: any) => void;
}

class Select extends Component<SelectProps, SelectState> {
  private inputRef: React.RefObject<BottomSheet>;

  constructor(props: SelectProps) {
    super(props);
    this.state = {
      borderColor: Colors.light.neutral[400],
    };
    this.inputRef = React.createRef<BottomSheet>();
  }

  onFocus = () => {
    this.setState({ borderColor: Colors.light.primary[500] });
  };

  onBlur = () => {
    this.setState({ borderColor: Colors.light.neutral[400] });
  };

  show = () => {
    if (this.inputRef?.current) {
      this.inputRef.current.show();
    }
  };

  hide = () => {
    if (this.inputRef?.current) {
      this.inputRef.current.hide();
    }
  };

  renderEmptyState = () => {
    return (
      <View style={GlobalTheme.center}>
        <Text size="XS">Tidak ada Data</Text>
      </View>
    );
  };

  render() {
    const { borderColor } = this.state;
    const {
      hasError,
      label,
      value,
      textType = "Regular",
      textSize = "SM",
      data,
      disabled,
      onPress,
    } = this.props;

    return (
      <>
        <Text type={textType} size={textSize}>
          {label}
        </Text>
        <Gap height={12} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.inputWrapper,
            {
              borderColor,
              backgroundColor: disabled
                ? Colors.light.neutral[200]
                : Colors.light.white,
            },
          ]}
          onPress={this.show}
          disabled={disabled}
        >
          <View style={[GlobalTheme.full, styles.input]}>
            <Text size={textSize}>{value}</Text>
          </View>
          <Ionicons
            name="chevron-down-outline"
            size={16}
            color={Colors.light.black}
          />
        </TouchableOpacity>

        <BottomSheet ref={this.inputRef} height="70%">
          <View style={styles.bottomsheet}>
            <Text type="SemiBold" size={textSize}>
              {`Pilih ${label}`}
            </Text>
            <Gap height={16} />
            <FlashList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    GlobalTheme.row,
                    GlobalTheme.between,
                    styles.checklist,
                  ]}
                  onPress={
                    onPress &&
                    (() => {
                      onPress(item);
                      this.inputRef.current?.hide();
                    })
                  }
                >
                  <Text size="XS">{item.name}</Text>
                  {value === item.value && (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={20}
                      color={Colors.light.black}
                    />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={this.renderEmptyState}
              estimatedItemSize={50}
            />
          </View>
        </BottomSheet>
      </>
    );
  }
}

export default Select;

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
    paddingVertical: scaleSize(12),
  },
  label: {
    alignSelf: "flex-start",
  },
  bottomsheet: {
    height: Dimensions.get("window").height * 0.25,
    paddingTop: scaleSize(16),
    paddingHorizontal: scaleSize(16),
    marginBottom: scaleSize(8),
  },
  checklist: {
    paddingBottom: scaleSize(8),
    marginBottom: scaleSize(8),
    borderBottomWidth: 0.4,
    borderColor: Colors.light.neutral[400],
  },
});
