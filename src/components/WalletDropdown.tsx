import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";

const WalletDropdown = (props) => {
  const {
    items = [
      { key: 1, label: "Wallet 1", value: "wallet-1" },
      { key: 2, label: "Wallet 2", value: "wallet-2" },
      { key: 3, label: "Wallet 3", value: "wallet-3" },
    ],
    value,
    onChange,
  } = props;
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={items}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text
                style={[
                  styles.dropdownButtonTxtStyle,
                  selectedItem && { color: "white" },
                ]}
              >
                {(selectedItem && selectedItem.label) || "Select your wallet"}
              </Text>
              <AntDesign
                name={isOpened ? "up" : "down"}
                color={"white"}
                size={20}
                disabled
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default WalletDropdown;

const styles = StyleSheet.create({
  container: {},
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: "#BBB",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
