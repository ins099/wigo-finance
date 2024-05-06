import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import IconButton from "../components/iconButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddFundCryptoScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#182561" }}>
      <View
        style={{
          ...styles.navContainer,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: windowWidth / 20,
            top: windowHeight / 12,
            zIndex: 100,
          }}
        >
          <IconButton onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 18,
              }}
              resizeMode="contain"
              source={require("../assets/images/leftIcon.png")}
            />
          </IconButton>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: windowHeight / 1.1,
            paddingVertical: 10,
            paddingHorizontal: 20,
            position: "relative",
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Add Fund</Text>
            <Text
              style={[
                styles.textTitle,
                {
                  fontSize: RFPercentage(2.3),
                  marginTop: 5,
                },
              ]}
            >
              By Crypto
            </Text>
          </View>
          <View style={{ marginTop: windowHeight / 12, alignSelf: "center" }}>
            <View
              style={{
                backgroundColor: "#2F3B71",
                width: "35%",
                height: "30%",
                padding: 15,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#ffffff",
              }}
            >
              <Image
                source={require("./../assets/images/digital-wallet-1.png")}
                alt="Digital Wallet"
                style={{
                  width: windowWidth / 8,
                  height: windowHeight / 15,
                  resizeMode: "contain",
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 10,
                paddingHorizontal: windowWidth / 7,
                color: "#ffffff",
                fontSize: RFPercentage(2.2),
                textAlign: "center",
              }}
            >
              You have successfully added funds to your account using your
              crypto wallet.
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: windowWidth / 20,
              justifyContent: "center",
              alignSelf: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("GlobalAccount")}
              style={{
                backgroundColor: "#1E96FC",
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "#ffffff", textAlign: "center" }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
  textTitle: {
    fontSize: RFPercentage(3.3),
    color: "#ffffff",
    fontWeight: "400",
  },
  textContainer: {
    width: "92%",
  },
  infoWrap: {
    marginTop: windowHeight / 40,
  },
  detailText: {
    color: "#BBBBBB",
    fontSize: windowWidth / 30,
  },
  input: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
});

export default AddFundCryptoScreen;
