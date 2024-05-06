import React, { useMemo, useState } from "react";
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
import { RFPercentage } from "react-native-responsive-fontsize";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Navbar from "../components/navbar";
import { PickerComp5, PickerComp55 } from "../components/pickerComp";
import { TransferData } from "../constants/transactionData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// const fontScale = PixelRatio.getFontScale();
// const getFontSize = size => size / fontScale;

function Transfers({ navigation }: { navigation: any }): JSX.Element {
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
                  <View style={{ width: "80%", marginTop: windowHeight / 24 }}>
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
                  <View style={{ width: "80%", marginTop: windowHeight / 24 }}>
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
                  <View style={{ width: "80%", marginTop: windowHeight / 24 }}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="Phone Number"
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
                      onPress={() => navigation.navigate("recipients")}
                    >
                      <Text style={styles.text1}>Add New</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </Modal>

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
                    <PickerComp55 />
                  </View>
                  <View
                    style={{
                      width: "80%",
                    }}
                  >
                    <PickerComp5 />
                  </View>
                  <View style={{ width: "80%", marginTop: windowHeight / 24 }}>
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
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Make your Transfer</Text>
          </View>

          <Text style={styles.subtextTitle}>
            Make transfers to your peers by selecting existing recipients or
            adding new
          </Text>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Image
                style={{
                  width: windowWidth / 15,
                }}
                resizeMode="contain"
                source={require("../assets/images/SearchIcon.png")}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Search for Recipient"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange("password", text)}
                value={userDate.password}
              />
            </View>
            <TouchableOpacity style={styles.addRecp} onPress={toggleModal}>
              <Image
                style={{
                  width: windowWidth / 10,
                }}
                resizeMode="contain"
                source={require("../assets/images/User_fill_add.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>Recent Transfers</Text>
          </View>

          {TransferData.map((data, i) => (
            <View style={styles.container} key={i}>
              <Image
                style={{
                  width: windowWidth / 9,
                }}
                resizeMode="contain"
                source={require("../assets/images/pic4.png")}
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
              <TouchableOpacity onPress={toggleModal2} style={styles.btnWrap}>
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

          <LinearGradient
            colors={["#1E96FC", "#072AC8"]}
            style={styles.cardContainer}
          >
            <TouchableOpacity style={styles.cardContainerInner}>
              <Text style={styles.text1}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
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
    width: windowWidth - windowWidth / 12,
    // height: windowHeight / 12,
    marginTop: windowHeight / 50,
    borderRadius: windowWidth / 30,
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
    // fontSize: windowWidth / 28,
    fontSize: RFPercentage(1.7),
    fontWeight: "700",
  },
  usertext2: {
    color: "#fff",
    fontSize: RFPercentage(1.6),
  },
  usertext3: {
    color: "#fff",
    fontSize: RFPercentage(1.6),
  },
  cardContainer: {
    width: "85%",
    marginTop: windowHeight / 4,
    borderRadius: windowWidth / 10,
  },
  cardContainerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 35,
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 22,
    marginLeft: windowWidth / 30,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth - windowWidth / 10,
    marginTop: windowHeight / 40,
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F3B71",
    width: "75%",
    borderRadius: windowWidth / 12,
    padding: windowWidth / 40,
    height: windowHeight / 15,
  },
  searchBarText: {
    color: "gray",
    marginLeft: windowWidth / 100,
  },
  addRecp: {
    backgroundColor: "#2F3B71",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: windowWidth / 12,
    height: windowHeight / 15,
  },
  modalStyle: {
    height: windowHeight / 1.3,
    alignItems: "flex-end",
  },
  modalStyle2: {
    height: windowHeight / 1.3,
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
    fontSize: RFPercentage(3.4),
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
  textinput: {
    height: windowWidth / 10,
    width: "75%",
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

export default Transfers;
