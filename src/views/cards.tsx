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
// import { useNavigation } from '@react-navigation/native';
// import ModalComp from '../components/modalComp';
import Modal from "react-native-modal";
import { RFPercentage } from "react-native-responsive-fontsize";
import OTPComponent2 from "../components/otpComponent2";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Cards({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

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
    password2: "",
    phone: "",
  });

  function handleChange(key: string, value: string) {
    setUserDate({
      ...userDate,
      [key]: value,
    });
  }

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);

  const [checked, setChecked] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
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
            // ...styles.spacing
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Your Cards</Text>
            <Text style={styles.textTitle2}>Manage Cards</Text>
          </View>

          <Image
            style={{
              width: windowWidth / 1.2,
              marginTop: windowWidth / 15,
            }}
            resizeMode="contain"
            source={require("../assets/images/Balancecard2.png")}
          />
          {/* <Button title="Show modal" onPress={toggleModal} /> */}

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
                    onPress={() => toggleModal()}
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
                    Set a new pin for your card
                  </Text>
                  <Image
                    style={{
                      width: windowHeight / 2.5,
                    }}
                    resizeMode="contain"
                    source={require("../assets/images/Balancecard.png")}
                  />
                  <OTPComponent2
                    pin1={pin1}
                    setPin1={setPin1}
                    pin2={pin2}
                    setPin2={setPin2}
                    pin3={pin3}
                    setPin3={setPin3}
                    pin4={pin4}
                    setPin4={setPin4}
                  />
                  <LinearGradient
                    colors={["#1E96FC", "#072AC8"]}
                    style={styles.cardContainer2}
                  >
                    <TouchableOpacity
                      style={styles.cardContainerInner}
                      onPress={() => navigation.navigate("cards")}
                    >
                      <Text style={styles.text1}>SAVE PIN</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </Modal>
          {/* Modal Ends here */}

          {/* Modal 2 Starts here */}
          <Modal isVisible={isModalVisible2}>
            <LinearGradient
              colors={["#072AC8", "#182561"]}
              style={styles.modalStyleWrap}
            >
              <View style={styles.modalStyle2}>
                <View style={styles.modalNav}>
                  <TouchableOpacity
                    style={styles.modalInner}
                    onPress={() => toggleModal2()}
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
                    Reason for blocking card permanently
                  </Text>
                  <Image
                    style={{
                      width: windowHeight / 2.5,
                    }}
                    resizeMode="contain"
                    source={require("../assets/images/Balancecard3.png")}
                  />
                  <TouchableOpacity
                    style={styles.cardContainerModal}
                    onPress={() => setChecked(!checked)}
                  >
                    <TouchableOpacity
                      style={!checked ? styles.checkBox : styles.checkBox2}
                    >
                      {checked && (
                        <Image
                          style={{
                            width: windowWidth / 25,
                          }}
                          resizeMode="contain"
                          source={require("../assets/images/tickIcon2.png")}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={{ width: "90%" }}>
                      <Text style={styles.text1}>Damaged</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cardContainerModal}
                    onPress={() => setChecked2(!checked2)}
                  >
                    <TouchableOpacity
                      style={!checked2 ? styles.checkBox : styles.checkBox2}
                    >
                      {checked2 && (
                        <Image
                          style={{
                            width: windowWidth / 25,
                          }}
                          resizeMode="contain"
                          source={require("../assets/images/tickIcon2.png")}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={{ width: "90%" }}>
                      <Text style={styles.text1}>Fraud</Text>
                    </View>
                  </TouchableOpacity>

                  <LinearGradient
                    colors={["#1E96FC", "#072AC8"]}
                    style={styles.cardContainerBtn}
                  >
                    <TouchableOpacity
                      style={styles.cardContainerInner}
                      onPress={() => {}}
                    >
                      <Text style={styles.text1}>Block the Card</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </Modal>
          {/* Modal 2 Ends here */}

          {/* Modal 3 Starts here */}
          <Modal isVisible={isModalVisible3}>
            <LinearGradient
              colors={["#072AC8", "#182561"]}
              style={styles.modalStyleWrap}
            >
              <View style={styles.modalStyle3}>
                <View style={styles.modalNav}>
                  <TouchableOpacity
                    style={styles.modalInner}
                    onPress={() => toggleModal3()}
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
                  <Text style={styles.modalHeading}>Enter your data</Text>
                  <View style={{ width: "80%", marginTop: windowHeight / 24 }}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="Proxy Number"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      onChangeText={(text: string) =>
                        handleChange("password", text)
                      }
                      value={userDate.password}
                    />
                  </View>
                  <View style={{ width: "80%", marginTop: windowHeight / 24 }}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      maxLength={4}
                      placeholder="Last 4 digits"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      onChangeText={(text: string) =>
                        handleChange("password2", text)
                      }
                      value={userDate.password2}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.checkSection}
                    onPress={() => setChecked(!checked)}
                  >
                    <View style={!checked ? styles.checkBox : styles.checkBox2}>
                      {checked && (
                        <Image
                          style={{
                            width: windowWidth / 25,
                          }}
                          resizeMode="contain"
                          source={require("../assets/images/tickIcon2.png")}
                        />
                      )}
                    </View>
                    <Text style={styles.checkText}>
                      Accept the Terms & Conditions
                    </Text>
                  </TouchableOpacity>
                  <LinearGradient
                    colors={["#1E96FC", "#072AC8"]}
                    style={styles.cardContainerBtn}
                  >
                    <TouchableOpacity
                      style={styles.cardContainerInner}
                      onPress={() => {}}
                    >
                      <Text style={styles.text1}>Continue</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </Modal>
          {/* Modal 3 Ends here */}

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={toggleModal}
            >
              <Image
                style={{
                  width: windowWidth / 15,
                }}
                resizeMode="contain"
                source={require("../assets/images/Creditcard.png")}
              />
              <View style={{ width: "90%" }}>
                <Text style={styles.text1}>Card- Update PIN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContainer}>
              <Image
                style={{
                  width: windowWidth / 15,
                }}
                resizeMode="contain"
                source={require("../assets/images/CancelIcon.png")}
              />
              <View style={{ width: "90%" }}>
                <Text style={styles.text1}>Block Card- Temporary</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={toggleModal2}
            >
              <Image
                style={{
                  width: windowWidth / 15,
                }}
                resizeMode="contain"
                source={require("../assets/images/CancelIcon2.png")}
              />
              <View>
                <Text style={styles.text1}>Block Card- Permanently</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.addCard}>
            <Text style={styles.addCardText}>Add New Card</Text>
          </View>

          <LinearGradient
            colors={["#072AC8", "#1E96FC"]}
            style={styles.cardContainer2}
          >
            <TouchableOpacity
              style={styles.cardContainerInner}
              onPress={toggleModal3}
            >
              <Text style={styles.text1}>ASSIGN A PHYSICAL CARD</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.btn}>
            <Text style={styles.btnText}>GET A VIRTUAL CARD</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: windowWidth / 15,
    color: "#fff",
    fontWeight: "700",
  },
  textTitle2: {
    fontSize: windowWidth / 25,
    color: "#fff",
    marginTop: windowHeight / 90,
  },
  textContainer: {
    width: "90%",
  },

  headingCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardWrapper: {
    width: "94%",

    alignItems: "center",
    marginTop: windowHeight / 30,
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: "100%",
    marginTop: windowHeight / 60,
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 25,
    borderRadius: windowWidth / 25,
    flexDirection: "row",
    alignItems: "center",
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 25,
    marginLeft: windowWidth / 30,
    fontWeight: "900",
  },
  button: {
    color: "#fff",
    fontWeight: "700",
    fontSize: windowWidth / 25,
  },
  buttonWrap: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: windowHeight / 50,
  },
  buttonWrapInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E96FC",
    padding: windowWidth / 50,
    borderRadius: windowWidth / 15,
    width: "48%",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: "90%",
    paddingTop: windowWidth / 12,
    paddingBottom: windowWidth / 30,
  },
  addCard: {
    width: "80%",
    borderStyle: "dashed",
    height: windowHeight / 4,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: windowWidth / 20,
    marginVertical: windowHeight / 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addCardText: {
    color: "#fff",
    fontSize: windowWidth / 25,
  },
  cardContainer2: {
    width: "80%",
    borderRadius: windowWidth / 10,
  },
  cardContainerBtn: {
    width: "80%",
    marginTop: windowHeight / 30,
    borderRadius: windowWidth / 10,
  },

  cardContainerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 35,
  },
  btn: {
    width: "80%",
    marginVertical: windowHeight / 40,
    borderRadius: windowWidth / 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#A2D6F9",
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 35,
  },
  btnText: {
    color: "#A2D6F9",
    fontSize: windowWidth / 25,
    marginLeft: windowWidth / 30,
    fontWeight: "900",
  },
  modalStyle: {
    height: windowHeight / 1.5,
    alignItems: "flex-end",
  },
  modalStyle2: {
    height: windowHeight / 1.4,
    alignItems: "flex-end",
  },
  modalStyle3: {
    height: windowHeight / 1.9,
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
    fontSize: RFPercentage(3.3),
    paddingHorizontal: windowWidth / 12,
    textAlign: "center",
  },
  cardContainerModal: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: "90%",
    marginTop: windowHeight / 80,
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 30,
    borderRadius: windowWidth / 25,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
  checkSection: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    marginTop: windowHeight / 30,
  },
  checkBox: {
    borderWidth: 1,
    height: windowWidth / 18,
    width: windowWidth / 18,
    marginRight: windowWidth / 40,
    borderColor: "#fff",
    borderRadius: windowWidth / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  checkBox2: {
    height: windowWidth / 18,
    width: windowWidth / 18,
    marginRight: windowWidth / 40,
    borderRadius: windowWidth / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  checkText: {
    color: "#fff",
    fontSize: windowWidth / 32,
  },
});

export default Cards;
