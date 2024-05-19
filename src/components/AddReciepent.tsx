import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useAddReceipentMutation,
  useLazyFindRecipientQuery,
} from "../redux/apis/reciepents";
import { TextBig, TextNormal } from "./AppText";
import Input from "./input";
import useToast from "../hooks";
import OTPComponent from "./otpComponent";

interface Props {
  close: () => void;
}

const AddReciepent: React.FC<Props> = (props) => {
  const { close } = props;
  const { control, handleSubmit, setValue } = useForm();
  const { fire } = useToast();

  const [findRecipient, { isLoading: findLoad, error }] =
    useLazyFindRecipientQuery();

  const [addRecipient, { isLoading: addLoader, error: addError }] =
    useAddReceipentMutation();

  const [foundUser, setFoundUser] = useState<null | any>(null);

  const onFindRecipient = async (data: any) => {
    try {
      const response = await findRecipient(data);
      if (response?.data) {
        console.log(response);
        setValue("FullName", response?.data.FullName);
        setFoundUser(response.data);
      } else {
        alert("No user found!");
      }
    } catch (error) {
      console.log("ERROR FINDING THE RECIPIENT", error);
    }
  };

  const onAddRecipient = async (data: any) => {
    try {
      const body = {
        Alias: data?.FullName,
        PinCode: data?.PinCode,
        User: foundUser?.Email,
      };
      console.log(JSON.stringify(body, null, 1));
      const response = await addRecipient(body);
      console.log("ADD RECIPIENT RES", JSON.stringify(response, null, 1));
      if (response?.data) {
        close();
        Alert.alert("Success", "Recipient added successfuly.");
        return;
      }
      Alert.alert("Error", "Something went wrong.");
    } catch (error) {
      console.log("ERRROROROOROR", error);
    }
  };

  const onHandleButtonPress = () => {
    if (!foundUser) {
      return handleSubmit(onFindRecipient)();
    }
    return handleSubmit(onAddRecipient)();
  };

  return (
    <LinearGradient
      style={styles.sheetContainer}
      colors={["#072AC8", "#182561"]}
      locations={[0, 5]}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "flex-end" }}>
          <Entypo onPress={close} name="cross" color="white" size={25} />
        </View>
        <TextBig color="white" center>
          Add New Reciepent
        </TextBig>
        <View
          style={{
            flex: 1,
            justifyContent: foundUser ? "space-evenly" : "flex-start",
            paddingTop: 20,
          }}
        >
          <Controller
            control={control}
            key="text"
            name="text"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={(str) => onChange(str)}
                placeholder="Email ID/Phone number"
              />
            )}
          />
          {foundUser != null && (
            <>
              <Controller
                control={control}
                key="FullName"
                name="FullName"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChangeText={(str) => onChange(str)}
                    placeholder="Full name of the account holder"
                  />
                )}
              />
              <Controller
                control={control}
                key="PinCode"
                name="PinCode"
                render={({ field: { value, onChange } }) => (
                  <OTPComponent
                    containerStyle={{
                      // flex: 1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      borderRadius: 20,
                      width: "100%",
                      padding: "5%",
                      // paddingHorizontal: '10%',
                    }}
                    showStyle={false}
                    textInputContainerStyle={{
                      paddingHorizontal: "7%",
                      marginTop: 10,
                    }}
                    value={value}
                    onChange={function (arg: any): void {
                      onChange(arg);
                    }}
                  />
                )}
              />
            </>
          )}
        </View>

        <TouchableOpacity
          onPress={onHandleButtonPress}
          disabled={findLoad || addLoader}
        >
          <LinearGradient colors={["#1E96FC", "#072AC8"]} style={styles.button}>
            {findLoad || addLoader ? (
              <ActivityIndicator color={"white"} size={"small"} />
            ) : (
              <TextNormal color="white">
                {foundUser != null ? "Add Recipient" : "Search"}
              </TextNormal>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AddReciepent;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
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
});
