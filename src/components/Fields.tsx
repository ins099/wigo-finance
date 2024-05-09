import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Input from "./input";

interface FieldProps {
  id: string;
  name: string;
  control: any;
}

const Fields: React.FC<FieldProps> = (props) => {
  const { id, control, name } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => (
        <View key={id}>
          <Input
            value={value}
            onChangeText={(val: string) => onChange(val)}
            error={fieldState?.error?.message}
            {...props}
          />
        </View>
      )}
    />
  );
};

export default Fields;

const styles = StyleSheet.create({});
