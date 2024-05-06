import React, { FC, ReactElement, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../contexts/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface IProps {
  variant?: "white" | "blue" | "dark-blue";
  onPress?: () => void;
}

function Navbar({ navigation }: { navigation: any }): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const { setIsAuthenticated, setUser } = useAuth();

  const dispatch = useDispatch();

  return (
    <View
      style={{
        ...styles.navContainer,
      }}
    >
      <Modal
        isVisible={modalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
      >
        <LinearGradient
          colors={["#072AC8", "#2F3B71"]}
          style={{
            width: windowWidth / 2,
            height: windowHeight / 3,

            position: "absolute",
            top: windowHeight / 80,
            left: -20,
            borderTopRightRadius: windowWidth / 40,
            borderBottomRightRadius: windowWidth / 40,
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              paddingRight: windowWidth / 80,
              height: "15%",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                style={{
                  width: windowWidth / 16,
                }}
                resizeMode="contain"
                source={require("../assets/images/Close_round_fill.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.drawerWrap}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("GlobalAccount")}
            >
              Home
            </Text>
            <View style={styles.divider}></View>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("transfers")}
            >
              Make Transfer
            </Text>
            <View style={styles.divider}></View>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("WithdrawFund")}
            >
              Withdraw Fund
            </Text>
            <View style={styles.divider}></View>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("cards")}
            >
              My Cards
            </Text>
            <View style={styles.divider}></View>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("recipients")}
            >
              Recipients
            </Text>
            <View style={styles.divider}></View>
            <Text
              style={styles.text}
              onPress={async () => {
                // setModalVisible(false);
                // await AsyncStorage.removeItem("user");
                // setIsAuthenticated(false);
                // setUser(null);

                dispatch({ type: "LOGOUT", payload: null });
              }}
            >
              Log Out
            </Text>
          </View>
        </LinearGradient>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          style={{
            width: windowWidth / 10,
          }}
          resizeMode="contain"
          source={require("../assets/images/menuIcon.png")}
        />
      </TouchableOpacity>
      <View style={styles.navInnerContainer}>
        <Image
          style={{
            width: windowWidth / 10,
          }}
          resizeMode="contain"
          source={require("../assets/images/bellIcon.png")}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("GlobalAccountWallet")}
        >
          <Image
            style={{
              width: windowWidth / 10,
            }}
            resizeMode="contain"
            source={require("../assets/images/userIcon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    width: "100%",
    backgroundColor: "#2F3B71",
    height: windowHeight / 7,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth / 20,
  },
  navInnerContainer: {
    flexDirection: "row",
    width: windowWidth / 4.5,
    justifyContent: "space-between",
  },
  buttonWhite: {
    backgroundColor: "#fff",
  },
  buttonDarkBlue: {
    backgroundColor: "#182561",
  },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  buttonTextWhite: { color: "#072AC8" },
  buttonTextDarkBlue: { color: "#fff" },
  text: {
    color: "#fff",
    // fontSize: windowWidth / 24,
    fontSize: RFPercentage(2),
    fontWeight: "300",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  drawerWrap: {
    width: "100%",
    height: "85%",
    justifyContent: "space-between",
    paddingHorizontal: "8%",
    paddingBottom: "5%",
  },
});

export default Navbar;
