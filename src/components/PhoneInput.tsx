import React, { useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import ReactNativePhoneInput from "react-native-phone-input";
import { useGetLocationsQuery } from "../redux/apis/general";
import { TextSmall, TextSmaller } from "./AppText";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

interface PhoneInputProps extends TextInputProps {
  textInputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  label?: string;
  error?: string | undefined;
}

const PhoneInput: React.FC<PhoneInputProps> = (props): JSX.Element => {
  const {
    textInputContainerStyle,
    textInputStyle,
    label,
    containerStyle,
    error,
    value,
    onChange,
    ...restProps
  } = props;

  const phoneRef = useRef(null);

  const { data = [] } = useGetLocationsQuery({});

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && (
          <TextSmall color="#BBBBBB" textStyle={styles.label}>
            {label}
          </TextSmall>
        )}
        <View style={[styles.textInputContainer, textInputContainerStyle]}>
          <ReactNativePhoneInput
            ref={phoneRef}
            initialValue={value}
            onChangePhoneNumber={(result) => onChange(result)}
            initialCountry="us"
            style={[styles.textInput, textInputStyle]}
            textStyle={styles.textInput}
            textProps={{ maxLength: 15, ...restProps }}
            autoFormat
            renderFlag={() => null}
          />

          <SelectDropdown
            data={data}
            defaultValue={value}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            disabled={!restProps?.editable}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {/* <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      "Select your wallet"}
                  </Text> */}
                  <AntDesign
                    name={isOpened ? "up" : "down"}
                    color={"white"}
                    size={14}
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
                  <Text style={styles.dropdownItemTxtStyle}>{item?.Name}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
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

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  label: {
    // marginBottom: 5,
  },
  textInputContainer: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "100%",
    alignSelf: "center",
    // borderRadius: 8,
    height: 40,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: "white",
  },

  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },

  dropdownButtonStyle: {
    // width: 200,
    // height: 50,
    backgroundColor: "#2F3A70",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    position: "absolute",
    right: 0,
    top: 15,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },

  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },

  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    width: RFPercentage(16),
    // right:-100
    left: RFPercentage(25),
  },
});

// {"Code": "UZB", "Id": 222, "IsEU": null, "Name": "Uzbekistan", "label": "Uzbekistan", "value": 222},
