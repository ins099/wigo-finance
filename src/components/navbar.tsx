import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useDispatch } from "react-redux";
import ChangePinCode from "./ChangePinCode";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface IProps {
  variant?: "white" | "blue" | "dark-blue";
  onPress?: () => void;
}

function Navbar({ navigation }: { navigation: any }): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [expand, setExpand] = useState<null | { id: "1" }>(null);
  const sheetRef = useRef(null);

  const dispatch = useDispatch();

  const onPressLogout = async () => {
    dispatch({ type: "LOGOUT", payload: null });
  };

  const drawerList = [
    {
      id: "1",
      name: "Profile",
      children: [
        { id: "1-i", name: "Bank Details", onPress: () => {} },
        { id: "1-ii", name: "Personal Details", onPress: () => {} },
      ],
      onPress: () => {
        setExpand((prev) => (prev?.id == "1" ? null : { id: "1" }));
      },
    },
    { id: "2", name: "My Wallet", onPress: () => {} },
    { id: "3", name: "My Reciepents", onPress: () => {} },
    { id: "4", name: "My Cards", onPress: () => {} },
    {
      id: "5",
      name: "Security",
      onPress: () => {
        setExpand((prev) => (prev?.id == "5" ? null : { id: "5" }));
      },
      children: [
        {
          id: "5-i",
          name: "Change Password",
          onPress: () => {
            setModalVisible(false);
            navigation.navigate("ChangePassword");
          },
        },
        {
          id: "5-ii",
          name: "Change Pin",
          onPress: () => {
            setModalVisible(false);
            setTimeout(() => {
              sheetRef.current?.open();
            }, 300);
          },
        },
        { id: "5-iii", name: "Allow Face ID", onPress: () => {} },
      ],
    },
    { id: "6", name: "Log Out", onPress: onPressLogout },
  ];

  return (
    <View
      style={{
        ...styles.navContainer,
      }}
    >
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

      <Modal
        isVisible={modalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        style={{ margin: 0 }}
        onBackdropPress={() => setModalVisible(false)}
      >
        <LinearGradient
          colors={["#072AC8", "#2F3B71"]}
          style={{
            width: windowWidth / 1.3,
            height: windowHeight,
            position: "absolute",
            paddingTop: "12%",
            borderTopRightRadius: windowWidth / 40,
            borderBottomRightRadius: windowWidth / 40,
          }}
        >
          <View style={styles.drawerWrap}>
            {drawerList.map((item) => (
              <>
                <TouchableOpacity
                  onPress={item.onPress}
                  style={{
                    // marginVertical: 20,
                    height: "7%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={styles.text}
                    // onPress={() => navigation.navigate("GlobalAccount")}
                  >
                    {item.name}
                  </Text>
                  {item?.children && (
                    <MaterialCommunityIcons
                      name={
                        expand?.id == item.id ? "chevron-up" : "chevron-down"
                      }
                      color="white"
                      disabled
                      size={RFValue(20)}
                    />
                  )}
                </TouchableOpacity>
                <View style={styles.divider} />
                {item?.children &&
                  expand?.id == item?.id &&
                  item?.children.map((child) => (
                    <TouchableOpacity
                      style={{ paddingHorizontal: 13 }}
                      onPress={child?.onPress}
                    >
                      <View style={{ marginVertical: 13 }}>
                        <Text style={styles.text}>{child?.name}</Text>
                      </View>
                      <View style={styles.divider} />
                    </TouchableOpacity>
                  ))}
              </>
            ))}
          </View>
        </LinearGradient>
      </Modal>
      <RBSheet
        ref={sheetRef}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        keyboardAvoidingViewEnabled={true}
        height={500}
      >
        <ChangePinCode close = {()=>sheetRef?.current?.close()}/>
      </RBSheet>
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
    paddingHorizontal: "8%",
  },
});

export default Navbar;
