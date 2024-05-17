import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View, Image, Dimensions, Text,TouchableOpacity } from "react-native";
import { TextBigger, TextNormal } from "./AppText";
import Input from "./input";
import { RFPercentage } from "react-native-responsive-fontsize";
import { PickerComp5 } from "./pickerComp";
import CountryPicker from "./CountryPicker";
import WalletDropdown from "./WalletDropdown";
import ConfirmPayment from "./ConfirmPayment";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface Props {
  close: () => void;
}

const SendPayment: React.FC<Props> = ({ close }) => {
  const { control, handleSubmit } = useForm();

  const [confirmModal, setConfirmModal] = useState(false);

  const onPressSend = async () => {
    setConfirmModal(true);
    // close();
  };

  return (
    <LinearGradient
      style={styles.sheetContainer}
      colors={["#072AC8", "#182561"]}
      locations={[0, 5]}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "flex-end" }}>
          <Entypo onPress={()=>close()} name="cross" color="white" size={25} />
        </View>
        <TextBigger
          color="white"
          center
          textStyle={{
            width: RFPercentage(25),
            alignSelf: "center",
            lineHeight: 30,
          }}
        >
          How much do you want to send ?
        </TextBigger>
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <Controller
            control={control}
            key="Wallet"
            name="Wallet"
            render={({ field: { value, onChange } }) => (
              <WalletDropdown value={value} onChange={onChange} />
            )}
          />
          <Controller
            control={control}
            key="EmailId"
            name="EmailId"
            render={({ field: { value, onChange } }) => (
              <CountryPicker value={value} onChange={onChange} />
            )}
          />
          <Controller
            control={control}
            key="Description"
            name="Description"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={(str) => onChange(str)}
                placeholder="Description"
              />
            )}
          />
          <View>
            <TextNormal color="white">Reciepent</TextNormal>
            <View style={styles.modalRecpInner}>
              <View style={styles.modalRecpInner2}>
                <Image
                  style={{
                    width: windowWidth / 10,
                  }}
                  resizeMode="contain"
                  source={require("../assets/images/pic3.png")}
                />
                <Text style={styles.modalRecpName}>Wilson Kenter</Text>
              </View>
              <Image
                style={{
                  width: windowWidth / 6,
                }}
                resizeMode="contain"
                source={require("../assets/images/recpIcon.png")}
              />
            </View>
          </View>

          <TouchableOpacity onPress={onPressSend}>
            <LinearGradient
              colors={["#1E96FC", "#072AC8"]}
              style={styles.button}
            >
              <TextNormal color="white">Send</TextNormal>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmPayment visible={confirmModal} setVisible={setConfirmModal} />
    </LinearGradient>
  );
};

export default SendPayment;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-evenly",
  },
  OTPContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: "20%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 15,
  },
  modalRecpInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor:'red',
    height: 50,
  },
  modalRecpInner2: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalRecpName: {
    color: "#fff",
    fontSize: windowWidth / 32,
    marginLeft: windowWidth / 40,
  },
});
