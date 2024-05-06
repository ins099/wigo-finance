import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  City,
  Country,
  CountryCode,
  Currency,
  amountData,
  idType,
  wallets,
} from "../constants/countryData";
import { Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const DATA = ["abcd", "efgh", "ijkl"];

// interface PickerCompProps {
//   pickerData: any[];
//   setSelectedValues: (values: any) => any;
//   selectedValues: any;
// }

// const PickerComp: React.FC<PickerCompProps> = ({
//   pickerData,
//   setSelectedValues,
//   selectedValues,
// }): any => {
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const PickerComp1 = (): any => {
  const [selectedValues, setSelectedValues] = useState("");
  return (
    <ScrollView style={styles.containerOne}>
      <Image
        style={{
          width: windowWidth / 18,
          marginLeft: windowWidth / 50,
          position: "absolute",
          bottom: "35%",
          right: "15%",
        }}
        resizeMode="contain"
        source={require("../assets/images/flag.png")}
      />
      <Picker
        style={styles.container}
        dropdownIconColor={"#fff"}
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
      >
        {CountryCode.map((data: any, index: number) => (
          <Picker.Item
            style={styles.text}
            key={index}
            label={data.dial_code}
            value={index}
          />
        ))}
      </Picker>
    </ScrollView>
  );
};
export const PickerComp2 = (): any => {
  const [selectedValues, setSelectedValues] = useState("");
  return (
    <ScrollView style={styles.container2}>
      <Picker
        style={styles.container}
        dropdownIconColor={"#fff"}
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
      >
        {Country.map((data: any, index: number) => (
          <Picker.Item
            style={styles.text}
            key={index}
            label={data.name}
            value={index}
          />
        ))}
      </Picker>
    </ScrollView>
  );
};
export const PickerComp3 = (): any => {
  const [selectedValues, setSelectedValues] = useState("");
  return (
    <ScrollView style={styles.container}>
      <Picker
        style={styles.container}
        dropdownIconColor={"#fff"}
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
      >
        {City.map((data: any, index: number) => (
          <Picker.Item
            style={styles.text}
            key={index}
            label={data.code}
            value={index}
          />
        ))}
      </Picker>
    </ScrollView>
  );
};
export const PickerComp4 = (): any => {
  const [selectedValues, setSelectedValues] = useState("");
  return (
    <ScrollView>
      <Picker
        style={styles.container}
        dropdownIconColor={"#fff"}
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
      >
        {idType.map((data: any, index: number) => (
          <Picker.Item
            style={styles.text}
            key={index}
            label={data.idtype}
            value={index}
          />
        ))}
      </Picker>
    </ScrollView>
  );
};
export const PickerComp5 = (): any => {
  const [selectedValues, setSelectedValues] = useState("");
  return (
    <ScrollView style={styles.container}>
      <Image
        style={{
          width: windowWidth / 18,
          marginLeft: windowWidth / 50,
          position: "absolute",
          bottom: "35%",
          right: "15%",
        }}
        resizeMode="contain"
        source={require("../assets/images/flag.png")}
      />
      <Picker
        style={styles.container}
        dropdownIconColor={"#fff"}
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
      >
        {amountData.map((data: any, index: number) => (
          <Picker.Item
            style={styles.text}
            key={index}
            label={data.amount}
            value={index}
          />
        ))}
      </Picker>
    </ScrollView>
  );
};
export const PickerComp55 = (): any => {
  const [selectedValues, setSelectedValues] = useState("");
  return (
    <ScrollView style={styles.container}>
      <Picker
        style={styles.container}
        dropdownIconColor={"#fff"}
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
      >
        {wallets.map((data: any, index: number) => (
          <Picker.Item
            style={styles.text}
            key={index}
            label={data.wallet}
            value={index}
          />
        ))}
      </Picker>
    </ScrollView>
  );
};
export const PickerComp6 = (): any => {
  const [selectedValues, setSelectedValues] = useState("");
  return (
    <ScrollView style={styles.containerOne}>
      <Picker
        style={styles.container}
        dropdownIconColor={"#fff"}
        selectedValue={selectedValues}
        onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
      >
        {CountryCode.map((data: any, index: number) => (
          <Picker.Item
            style={styles.text}
            key={index}
            label={data.dial_code}
            value={index}
          />
        ))}
      </Picker>
    </ScrollView>
  );
};
export const PickerComp7 = ({ currency }: { currency: string }): any => {
  const [selectedValues, setSelectedValues] = useState(currency);
  return (
    <Picker
      style={{
        width: windowWidth / 5.5,
        borderWidth: 1,
        color: "#ffffff",
      }}
      dropdownIconColor="#fff"
      selectedValue={selectedValues}
      onValueChange={(itemValue, itemIndex) => setSelectedValues(itemValue)}
    >
      {Currency.map((data: any, index: number) => (
        <Picker.Item
          style={{ fontSize: RFPercentage(1.75), color: "#000000" }}
          key={index}
          label={data}
          value={index}
        />
      ))}
    </Picker>
  );
};

export const CustomPicker = ({
  dataArr,
  selectedItem,
  onSelect,
  placeholder
}: {
  dataArr: any[];
  selectedItem: any;
  onSelect: (arg: any) => void;
  placeholder:string
}): any => {
  return (
    <Picker
      style={{
        borderWidth: 1,
        color: "#ffffff",
        width: "100%",
        alignSelf: "center",
        marginVertical: 7,
      }}
      dropdownIconColor="#fff"
      selectedValue={selectedItem}
      placeholder={placeholder ?? "Please select the item"}
      onValueChange={(itemValue, itemIndex) => onSelect(itemValue)}
    >
      {dataArr.map((data: any, index: number) => (
        <Picker.Item
          style={{
            fontSize: RFPercentage(1.75),
            color: "#000000",
            width: "100%",
            paddingHorizontal: 10,
          }}
          key={data?.value ?? data.Id}
          label={data?.label ?? data.Name}
          value={data?.value ?? data.Id}
        />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  containerOne: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#fff',
    color: "#fff",
    paddingVertical: windowHeight / 90,
    height: windowHeight / 10,
    paddingHorizontal: -windowWidth / 5,
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    color: "#fff",
    paddingVertical: windowHeight / 90,
    height: windowHeight / 10,
  },
  container2: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    color: "#fff",
    paddingHorizontal: 0,
    paddingVertical: windowHeight / 90,
    // borderWidth: 1,
    height: windowHeight / 10,
    marginRight: 10,
  },
  text: {
    fontSize: windowWidth / 28,
  },
});
