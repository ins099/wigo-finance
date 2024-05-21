import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";

import { Controller, useForm } from "react-hook-form";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextNormal } from "../components/AppText";
import PhoneInput from "../components/PhoneInput";
import SendPayment from "../components/SendPayment";
import Input from "../components/input";
import Navbar from "../components/navbar";
import {
  useGetlatestSendRecipientsQuery,
  useLazySearchRecipientsQuery,
} from "../redux/apis/reciepents";
import { Reciepent } from "./recipients";
import SuccessPayment from "../components/SuccessPayment";

const windowWidth = Dimensions.get("window").width;

function Transfers({ navigation }: { navigation: any }): JSX.Element {
  const { control, handleSubmit } = useForm();

  const [successModal, setSuccessModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const { data = [], refetch } = useGetlatestSendRecipientsQuery({});

  const [searchRecipients, { isLoading, error: searchError }] =
    useLazySearchRecipientsQuery();

  const onPressSend = (item) => {
    setSelectedUser(item);
    setSendModal(true);
  };
  const onPressDelete = () => {};

  const onPressSearch = async (data) => {
    try {
      const params = {};
      data["phoneNumber"] &&
        data["phoneNumber"] == "+" &&
        delete data.phoneNumber;
      Object.keys(data).map((key) => {
        if (data[key] && data[key] != "") params[`filter.${key}`] = data[key];
      });
      const response = await searchRecipients(params);
      if (response.data?.Data && response.data?.Data.length) {
        navigation.navigate("recipients", { recipients: response.data.Data });
      } else {
        Alert.alert("Error", "No user found.");
      }
    } catch (error) {
      console.log("SEATCH ERROR", error);
    }
  };

  const onSendSuccess = () => {
    setSendModal(false);
    setSuccessModal(true);
    // navigation.goBack();
  };

  const onPressHome = () => {
    setSuccessModal(false);
    setSendModal(false);
    navigation.navigate('GlobalAccount');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={[primaryDark, primaryDark]} style={{ flex: 1 }}>
        <Navbar navigation={navigation} />
        <View style={{ flex: 1 }}>
          <ScrollView
          // contentContainerStyle={{ backgroundColor: "red", height: "100%" }}
          // style={{ flex: 1, height: "100%" }}
          >
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <View style={styles.container}>
                <View style={styles.textContainer}>
                  <Text style={styles.textTitle}>Make your Transfer</Text>
                </View>

                <Text style={styles.subtextTitle}>
                  Make transfers to your peers by selecting existing recipients
                  or adding new
                </Text>
                <View style={{ flex: 1 }}>
                  <View style={styles.subHeading}>
                    <Text style={styles.subHeadingText}>Recent Transfers</Text>
                  </View>
                  {data?.length == 0 ? (
                    <TextNormal color="white" center>
                      No record found.
                    </TextNormal>
                  ) : (
                    data.map((item, index) => (
                      <Reciepent
                        item={item}
                        key={index}
                        onPressSend={() => onPressSend(item)}
                        onPressDelete={() => onPressDelete(item)}
                      />
                    ))
                  )}
                </View>
                <View style={{ height: 400, justifyContent: "space-evenly" }}>
                  <Controller
                    control={control}
                    key="email"
                    name="email"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value}
                        onChangeText={(str) => onChange(str)}
                        placeholder="Email ID"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    key="name"
                    name="name"
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
                    key="phoneNumber"
                    name="phoneNumber"
                    render={({ field: { value, onChange } }) => (
                      <PhoneInput
                        placeholder="Phone Number"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />

                  <TouchableOpacity
                    onPress={handleSubmit(onPressSearch)}
                    disabled={isLoading}
                  >
                    <LinearGradient
                      colors={["#1E96FC", "#072AC8"]}
                      style={styles.button}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="white" size="small" />
                      ) : (
                        <TextNormal color="white">Search</TextNormal>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </LinearGradient>

      <Modal visible={sendModal} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
          }}
        >
          <View style={{ height: RFPercentage(80), padding: 10 }}>
            <SendPayment
              close={() => {
                setSendModal(false);
                setSelectedUser(null);
              }}
              onSendSuccess={onSendSuccess}
              sendUser={selectedUser}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={successModal}>
        <SuccessPayment  onPressHome={onPressHome} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    // fontSize: windowWidth / 15,
    fontSize: RFPercentage(3),
    color: "#fff",
    fontWeight: "700",
  },
  textContainer: {
    width: windowWidth - windowWidth / 10,
  },
  subtextTitle: {
    color: "#A2D6F9",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.7),
    width: windowWidth - windowWidth / 10,
  },
  subHeading: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: windowWidth - windowWidth / 12,
    paddingTop: windowWidth / 12,
    paddingBottom: windowWidth / 30,
  },
  subHeadingText: {
    color: "#fff",
    fontSize: windowWidth / 25,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flex: 1,
    // backgroundColor:'pink'
  },
  input: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    paddingVertical: 10,
    // paddingHorizontal: windowWidth / 30,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
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

export default Transfers;
