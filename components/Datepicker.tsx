import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import moment from "moment";
import "moment/locale/id";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DatePickerRN from "react-native-date-picker";
import BottomSheet from "./BottomSheet";
import Text, { ThemedTextProps } from "./Text";
import Gap from "./Gap";

interface DatePickerState {
  borderColor: string;
  showPicker: boolean;
}

interface DatePickerProps {
  label?: string;
  value: Date | null;
  hasError?: boolean;
  textSize?: ThemedTextProps["size"];
  onPress?: (item: any) => void;
}

class Datepicker extends Component<DatePickerProps, DatePickerState> {
  private inputRef: React.RefObject<BottomSheet>;

  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      borderColor: Colors.light.neutral[200],
      showPicker: false,
    };
    this.inputRef = React.createRef<BottomSheet>();
  }

  onFocus = () => {
    this.setState({ borderColor: Colors.light.primary[500] });
  };

  onBlur = () => {
    this.setState({ borderColor: Colors.light.neutral[200] });
  };

  togglePicker = () => {
    this.setState((prevState: any) => ({ showPicker: !prevState.showPicker }));
  };

  handleDateChange = (date: Date) => {
    const { onPress } = this.props;
    this.togglePicker();
    onPress && onPress(date);
  };

  renderEmptyState = () => {
    return (
      <View style={[GlobalTheme.center, styles.checklist]}>
        <Text size="XS">Tidak ada Data</Text>
      </View>
    );
  };

  render() {
    const { borderColor, showPicker } = this.state;
    const { hasError, label, value, textSize = "SM" } = this.props;

    return (
      <>
        <Text size="SM">{label}</Text>
        <Gap height={12} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.inputWrapper,
            { borderColor: hasError ? "red" : borderColor },
          ]}
          onPress={this.togglePicker}
        >
          <View style={[GlobalTheme.full, styles.input]}>
            {value === null ? (
              <Text size={textSize}>Pilih tanggal</Text>
            ) : (
              <Text size={textSize}>{moment(value).format("DD-MM-YYYY")}</Text>
            )}
          </View>
        </TouchableOpacity>

        <DatePickerRN
          modal
          mode="date"
          locale="id"
          title={`Pilih ${label}`}
          open={showPicker}
          date={value ?? new Date()}
          onConfirm={this.handleDateChange}
          onCancel={this.togglePicker}
        />
      </>
    );
  }
}

export default Datepicker;

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.light.white,
    paddingHorizontal: scaleSize(16),
    borderRadius: scaleSize(12),
    borderWidth: 1,
    alignItems: "center",
  },
  input: {
    paddingVertical: scaleSize(16),
  },
  label: {
    alignSelf: "flex-start",
  },
  bottomsheet: {
    paddingTop: scaleSize(16),
    paddingHorizontal: scaleSize(16),
    marginBottom: scaleSize(32),
  },
  checklist: {
    marginBottom: scaleSize(12),
  },
});
