import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { COUNTRY } from "../constants/countryData";
import { Svg, SvgUri } from "react-native-svg";
import { RFValue } from "react-native-responsive-fontsize";

const CountryPicker = (props) => {
  const { value, onChange } = props;
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          value={value?.amount}
          onChangeText={(txt) => onChange({ ...value, amount: txt })}
          placeholder="Amount"
          placeholderTextColor={'#BBBBBB'}
        />
      </View>
      <TouchableOpacity style={styles.flagContainer}>
        <SelectDropdown
          data={COUNTRY}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <SvgUri uri={selectedItem?.image} height={30} width={30} />
                )}
                <AntDesign name={isOpened?"up":"down"} color="white" size={20} disabled />
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
                <SvgUri uri={item?.image} height={30} width={30} />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    alignItems: "center",
    flexDirection: "row",
  },
  textInputContainer: {
    flex: 1,
  },
  input: {
    color: "white",
    fontSize:RFValue(15)
  },
  flagContainer: {},

  dropdownButtonStyle: {
    width: 40,
    height: 50,
    // backgroundColor: "#E9ECEF",
    // borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
    marginLeft:10
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
    height: 200,
    paddingTop:0,
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
