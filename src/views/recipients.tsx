import React, { useMemo, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../components/navbar";
import { TransferData2 } from "../constants/transactionData";
// import { useNavigation } from '@react-navigation/native';
// import pic1 from "../assets/images/pic1.png"
import Modal from "react-native-modal";
import { RFPercentage } from "react-native-responsive-fontsize";
import { PickerComp5 } from "../components/pickerComp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Recipients({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const logoContainerPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === "android"
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  const [userDate, setUserDate] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
  });

  function handleChange(key: string, value: string) {
    setUserDate({
      ...userDate,
      [key]: value,
    });
  }

  const userData: any = [
    {
      name: "Erin Rhiel Madsen",
      email: "hanji@gmail.com",
      phone: "+251 253 2533",
    },
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  return (
    <LinearGradient
      colors={[primaryDark, primaryDark]}
      style={globalStyles.container}
    >
      <ScrollView>
        <Navbar navigation={navigation} />
        <SafeAreaView
          style={{
            ...globalStyles.container,
            ...globalStyles.safeAreaContainer,
          }}
        >
          <View style={styles.topWrap}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Your Recipients</Text>
            </View>

            {/* Modal Starts here */}
            <Modal isVisible={isModalVisible}>
              <LinearGradient
                colors={["#072AC8", "#182561"]}
                style={styles.modalStyleWrap}
              >
                <View style={styles.modalStyle}>
                  <View style={styles.modalNav}>
                    <TouchableOpacity
                      style={styles.modalInner}
                      onPress={toggleModal}
                    >
                      <Image
                        style={{
                          width: windowWidth / 15,
                        }}
                        resizeMode="contain"
                        source={require("../assets/images/Close_round_fill.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalHeading}>Add New Recipients</Text>
                    <View
                      style={{ width: "80%", marginTop: windowHeight / 24 }}
                    >
                      <TextInput
                        style={styles.input}
                        placeholder="Email ID"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("email", text)
                        }
                        value={userDate.email}
                      />
                    </View>
                    <View
                      style={{ width: "80%", marginTop: windowHeight / 24 }}
                    >
                      <TextInput
                        style={styles.input}
                        placeholder="Full name of the account holder"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("name", text)
                        }
                        value={userDate.name}
                      />
                    </View>
                    <View
                      style={{ width: "80%", marginTop: windowHeight / 24 }}
                    >
                      <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="numeric"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("phone", text)
                        }
                        value={userDate.phone}
                      />
                    </View>

                    <LinearGradient
                      colors={["#1E96FC", "#072AC8"]}
                      style={styles.cardContainer2}
                    >
                      <TouchableOpacity
                        style={styles.cardContainerInner}
                        onPress={() => navigation.navigate("cards")}
                      >
                        <Text style={styles.text1}>Add New</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </LinearGradient>
            </Modal>
            {/* Modal Ends here */}
            {/* Modal Starts here */}
            <Modal isVisible={isModalVisible2}>
              <LinearGradient
                colors={["#072AC8", "#182561"]}
                style={styles.modalStyleWrap}
              >
                <View style={styles.modalStyle2}>
                  <View style={styles.modalNav}>
                    <TouchableOpacity
                      style={styles.modalInner}
                      onPress={toggleModal2}
                    >
                      <Image
                        style={{
                          width: windowWidth / 15,
                        }}
                        resizeMode="contain"
                        source={require("../assets/images/Close_round_fill.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalHeading}>
                      How much do you want to send?
                    </Text>

                    <View
                      style={{
                        width: "80%",
                      }}
                    >
                      <PickerComp5 />
                    </View>
                    <View
                      style={{ width: "80%", marginTop: windowHeight / 24 }}
                    >
                      <TextInput
                        style={styles.input2}
                        placeholder="Description"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("email", text)
                        }
                        value={userDate.email}
                      />
                    </View>
                    <View style={styles.modalRecpWrap}>
                      <Text style={styles.modalRecpText}>recipient</Text>
                      <View style={styles.modalRecpInner}>
                        <View style={styles.modalRecpInner2}>
                          <Image
                            style={{
                              width: windowWidth / 10,
                            }}
                            resizeMode="contain"
                            source={require("../assets/images/pic3.png")}
                          />
                          <Text style={styles.modalRecpName}>
                            Wilson Kenter
                          </Text>
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
                    <LinearGradient
                      colors={["#1E96FC", "#072AC8"]}
                      style={styles.cardContainer2}
                    >
                      <TouchableOpacity
                        style={styles.cardContainerInner}
                        onPress={() => navigation.navigate("cards")}
                      >
                        <Text style={styles.text1}>Confirm</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </LinearGradient>
            </Modal>
            {/* Modal Ends here */}

            <LinearGradient
              colors={["#072AC8", "#1E96FC"]}
              style={styles.cardContainer}
            >
              <TouchableOpacity
                style={styles.cardContainerInner}
                onPress={toggleModal}
              >
                <Text style={styles.text1}>Add New</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {TransferData2.map((data, i) => (
            <View key={i} style={styles.container}>
              <Image
                style={{
                  width: windowWidth / 9,
                  // marginTop:windowWidth/15
                }}
                resizeMode="contain"
                source={require("../assets/images/pic1.png")}
              />
              <View style={styles.textWrap}>
                <Text style={styles.usertext1}>{data.name}</Text>
                <Text style={styles.usertext2}>{data.email}</Text>
                <Text style={styles.usertext3}>{data.number}</Text>
              </View>
              <Image
                style={{
                  width: windowWidth / 15,
                }}
                resizeMode="contain"
                source={require("../assets/images/TrashIcon.png")}
              />
              <TouchableOpacity style={styles.btnWrap} onPress={toggleModal2}>
                <Image
                  style={{
                    width: windowWidth / 18,
                  }}
                  resizeMode="contain"
                  source={require("../assets/images/Downloadcirclefill2.png")}
                />
                <Text style={styles.btnText}>Send Money</Text>
              </TouchableOpacity>
            </View>
          ))}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topWrap: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textTitle: {
    // fontSize: windowWidth / 15,
    color: "#fff",
    fontWeight: "700",
    fontSize: RFPercentage(3),
  },
  textContainer: {},
  cardContainer: {
    width: "35%",

    borderRadius: windowWidth / 10,
  },
  cardContainerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 40,
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 26,
    fontWeight: "700",
  },
  container: {
    width: "100%",
    // height: windowHeight / 12,
    marginTop: windowHeight / 50,
    borderRadius: windowWidth / 40,
    backgroundColor: "#2F3B71",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 40,
  },
  textWrap: {},
  btnWrap: {
    flexDirection: "row",
    borderRadius: windowWidth / 20,
    borderWidth: 1,
    alignItems: "center",
    padding: windowWidth / 100,
    paddingHorizontal: windowWidth / 60,
    borderColor: "#A2D6F9",
  },
  btnText: {
    color: "#A2D6F9",
    fontSize: windowWidth / 32,
    fontWeight: "700",
  },
  usertext1: {
    color: "#fff",
    fontSize: RFPercentage(1.7),
    fontWeight: "700",
  },
  usertext2: {
    color: "#fff",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.6),
  },
  usertext3: {
    color: "#fff",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.6),
  },
  modalStyle: {
    height: windowHeight / 1.6,
    alignItems: "flex-end",
  },
  modalStyle2: {
    height: windowHeight / 1.4,
    alignItems: "flex-end",
  },
  modalStyleWrap: {
    borderRadius: windowWidth / 40,
  },
  modalInner: {
    alignItems: "flex-end",
    paddingRight: windowWidth / 70,
  },
  modalNav: {
    height: "8%",
  },
  modalContent: {
    width: "100%",
    height: "92%",
    alignItems: "center",
  },
  modalHeading: {
    color: "#fff",
    // fontSize: windowWidth / 16,
    fontSize: RFPercentage(3.2),
    paddingHorizontal: windowWidth / 12,
    textAlign: "center",
  },
  cardContainer2: {
    width: "80%",
    marginTop: windowHeight / 16,
    borderRadius: windowWidth / 10,
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
  input2: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    paddingVertical: 10,
    paddingHorizontal: windowWidth / 30,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
  modalRecpWrap: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: "80%",
    marginTop: windowHeight / 25,
  },
  modalRecpText: {
    color: "#fff",
    fontSize: windowWidth / 35,
  },
  modalRecpInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

export default Recipients;
