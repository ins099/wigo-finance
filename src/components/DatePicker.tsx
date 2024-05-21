import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { TextNormal, TextSmall, TextSmaller } from "./AppText";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  value: any;
  onChange: (arg: any) => void;
  label?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  dateInputContainerStyle?: ViewStyle;
  error?: string;
  isTime?: true;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    error,
    containerStyle,
    isTime,
    dateInputContainerStyle,
    ...rest
  } = props;

  const [date, setDate] = useState(value ?? new Date());
  const [mode, setMode] = useState(isTime ? "time" : "date");
  const [show, setShow] = useState(false);

  const onHandleChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onChange(currentDate);
  };

  const showMode = () => {
    setShow(true);
    setMode(mode);
  };

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && (
          <TextSmall color="#BBBBBB" textStyle={styles.label}>
            {label}
          </TextSmall>
        )}
        <TouchableOpacity
          style={[styles.dateContainerStyle, dateInputContainerStyle]}
          onPress={showMode}
          disabled={!rest?.editable}
        >
          <TextNormal color={value ? "white" : "#BBBBBB"}>
            {value?.toLocaleDateString() ?? placeholder ?? "Please Select Date"}
          </TextNormal>
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onHandleChange}
            />
          )}
        </TouchableOpacity>
      </View>
      {error && (
        <TextSmaller bold color={"red"}>
          {"* "}
          {error}
        </TextSmaller>
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  label: {},
  dateContainerStyle: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "100%",
    alignSelf: "center",
    height: 40,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: "white",
  },
});
