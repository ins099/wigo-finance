import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface RadioProps {
  isSelected: boolean;
  onSelect: () => void;
  label: string;
  containerStyle?: ViewStyle;
}

const RadioButton: React.FC<RadioProps> = (props) => {
  const { isSelected, onSelect, label, containerStyle } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <MaterialCommunityIcons
        name={isSelected ? "checkbox-marked" : "checkbox-outline"}
        color="#BBBBBB"
        size={25}
        onPress={onSelect}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 40,
    // backgroundColor: "red",
    // marginVertical: 15,
    paddingLeft: 20,
  },
  label: { marginLeft: 10, color: "white", fontSize: 18 },
});
