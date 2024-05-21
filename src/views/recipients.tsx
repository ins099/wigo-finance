import React, { useRef, useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../components/navbar";
// import { useNavigation } from '@react-navigation/native';
// import pic1 from "../assets/images/pic1.png"
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage } from "react-native-responsive-fontsize";
import AddReciepent from "../components/AddReciepent";
import { TextBig, TextNormal } from "../components/AppText";
import SendPayment from "../components/SendPayment";
import { useGetReceipentsQuery } from "../redux/apis/reciepents";
import SuccessPayment from "../components/SuccessPayment";

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
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.usertext1}>{item?.Alias}</Text>
        {item?.Email && (
          <Text style={styles.usertext2} numberOfLines={1}>
            {item?.Email}
          </Text>
        )}
        {item?.PhoneNumber && (
          <Text style={styles.usertext3}>{item?.PhoneNumber}</Text>
        )}
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

function Recipients({ navigation, route }: { navigation: any }): JSX.Element {
  const recipients = route.params?.recipients;

  const [sendModal, setSendModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const { data = { Data: [] }, error, isLoading } = useGetReceipentsQuery({});
  const [selectedToSenduser, setSelectedToSendUser] = useState(null);

  const onPressDelete = (item) => {
    console.log({ item });
  };

  const onPressSend = (item) => {
    setSelectedToSendUser(item);
    setSendModal(true);
  };

  const onSendSuccess = () => {
    setSendModal(false);
    setSuccessModal(true);
    // navigation.goBack()
  };

  const onPressHome = () => {
    setSuccessModal(false);
    setSendModal(false);
    // navigation.reset("Tab");
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
              setAddModal(true);
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
          {recipients && recipients?.length ? (
            recipients.map((item, index) => (
              <Reciepent
                item={item}
                key={index}
                onPressSend={() => onPressSend(item)}
                onPressDelete={onPressDelete}
              />
            ))
          ) : data?.Data?.length == 0 ? (
            <TextNormal color="white" center>
              No record found.
            </TextNormal>
          ) : (
            data?.Data.map((item, index) => (
              <Reciepent
                item={item}
                key={index}
                onPressSend={() => onPressSend(item)}
                onPressDelete={onPressDelete}
              />
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={addModal} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
          }}
        >
          <View style={{ height: RFPercentage(80), padding: 10 }}>
            <AddReciepent close={() => setAddModal(false)} />
          </View>
        </View>
      </Modal>

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
                setSelectedToSendUser(null);
              }}
              onSendSuccess={onSendSuccess}
              sendUser={selectedToSenduser}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={successModal}>
        <SuccessPayment onPressHome={onPressHome} />
      </Modal>
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
