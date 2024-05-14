import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Input from "./input";
import DatePicker from "./DatePicker";
import PhoneInput from "./PhoneInput";
import CustomDropdown from "./Dropdown";

interface FieldProps {
  id: string;
  name: string;
  control: any;
  type: string;
  defaultValue: any;
}

const Fields: React.FC<FieldProps> = (props) => {
  const { id, control, name, type, defaultValue } = props;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState }) => {
        if (type == "dropdown") {
          return (
            <View key={id}>
              <CustomDropdown value={value} onChange={onChange} {...props} />
            </View>
          );
        }
        if (type == "phone") {
          return (
            <View key={id}>
              <PhoneInput value={value} onChange={onChange} {...props} />
            </View>
          );
        }
        if (type == "date") {
          return (
            <View key={id}>
              <DatePicker value={value} onChange={onChange} {...props} />
            </View>
          );
        }
        return (
          <View key={id}>
            <Input
              value={value}
              onChangeText={(val: string) => onChange(val)}
              error={fieldState?.error?.message}
              {...props}
            />
          </View>
        );
      }}
    />
  );
};

export default Fields;

const styles = StyleSheet.create({});
