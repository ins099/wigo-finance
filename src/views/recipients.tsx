import React, { useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../components/navbar";
import { TransferData2 } from "../constants/transactionData";
// import { useNavigation } from '@react-navigation/native';
// import pic1 from "../assets/images/pic1.png"
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage } from "react-native-responsive-fontsize";
import AddReciepent from "../components/AddReciepent";
import { TextBig, TextNormal } from "../components/AppText";
import SendPayment from "../components/SendPayment";
import { useGetReceipentsQuery } from "../redux/apis/reciepents";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const Reciepent = ({ item, onPressSend, onPressDelete }: any) => {
  return (
    <View key={item?.id} style={styles.itemContainer}>
      <Image
        style={{
          width: windowWidth / 9,
          // marginTop:windowWidth/15
        }}
        resizeMode="contain"
        source={require("../assets/images/pic1.png")}
      />
      <View>
        <Text style={styles.usertext1}>{item.name}</Text>
        <Text style={styles.usertext2}>{item.email}</Text>
        <Text style={styles.usertext3}>{item.number}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => onPressDelete(item)}>
          <Image
            style={{
              width: windowWidth / 15,
              marginRight: 10,
            }}
            resizeMode="contain"
            source={require("../assets/images/TrashIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrap}
          onPress={() => onPressSend(item)}
        >
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
    </View>
  );
};

function Recipients({ navigation }: { navigation: any }): JSX.Element {
  const sheetRef = useRef();
  const sendSheetRef = useRef();

  const { data, error, isLoading } = useGetReceipentsQuery({});

  const onPressDelete = (item) => {
    console.log({ item });
  };

  const onPressSend = async (item) => {
    sendSheetRef.current?.open();
  };

  return (
    <LinearGradient
      colors={[primaryDark, primaryDark]}
      style={globalStyles.container}
    >
      <Navbar navigation={navigation} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.topRow}>
          <TextBig color="white" bold>
            My Reciepents
          </TextBig>
          <TouchableOpacity
            onPress={() => {
              sheetRef.current?.open();
            }}
          >
            <LinearGradient
              colors={["#1E96FC", "#072AC8"]}
              style={{ flex: 1, ...styles.button }}
            >
              <TextNormal color="white">Add New</TextNormal>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.reciepentContainer}>
          {TransferData2.map((item, index) => (
            <Reciepent
              item={item}
              key={index}
              onPressSend={onPressSend}
              onPressDelete={onPressDelete}
            />
          ))}
        </View>
      </ScrollView>

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
        <AddReciepent close={() => sheetRef?.current?.close()} />
      </RBSheet>

      <RBSheet
        ref={sendSheetRef}
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
        <SendPayment close={() => sendSheetRef?.current?.close()} />
      </RBSheet>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  scrollContainer: {},
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: RFPercentage(12),
    alignSelf: "center",
    borderRadius: 15,
  },
  reciepentContainer: {},
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
  itemContainer: {
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
  btnWrap: {
    flexDirection: "row",
    borderRadius: windowWidth / 20,
    borderWidth: 1,
    alignItems: "center",
    padding: windowWidth / 100,
    paddingHorizontal: windowWidth / 40,
    borderColor: "#A2D6F9",
  },
  btnText: {
    color: "#A2D6F9",
    fontSize: windowWidth / 32,
    fontWeight: "700",
  },
});

export default Recipients;
