import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import IconButton from "../components/iconButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WithdrawFundDetailScreen: React.FC = ({ navigation, route }: any) => {
  const { details } = route.params;

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
          <IconButton onPress={() => navigation.navigate("GlobalAccount")}>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
              <Text style={styles.textTitle}>Withdraw Fund</Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: RFPercentage(2),
                  color: "#ffffff",
                }}
              >
                From Wallet
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: RFPercentage(1.7),
                  color: "#ffffff",
                }}
              >
                You have requested a withdrawal as follows:
              </Text>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 10,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: RFPercentage(2),
                    color: "#ffffff",
                  }}
                >
                  Amount:
                </Text>
                <Text
                  selectable
                  style={{
                    marginTop: 10,
                    fontSize: RFPercentage(2),
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  {" "}
                  {details.Amount} {details.FiatSymbol}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: RFPercentage(2),
                  color: "#ffffff",
                }}
              >
                Receiving Account
              </Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: windowWidth / 3,
                    marginTop: 10,
                    fontSize: RFPercentage(1.7),
                    color: "#BBBBBB",
                  }}
                >
                  Account Holder
                </Text>
                <Text
                  selectable
                  style={{
                    marginTop: 10,
                    fontSize: RFPercentage(2),
                    color: "#ffffff",
                  }}
                >
                  {details.AccountHolderName}
                </Text>
              </View>
              <View
                style={{
                  marginTop: -5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: windowWidth / 3,
                    marginTop: 10,
                    fontSize: RFPercentage(1.7),
                    color: "#BBBBBB",
                  }}
                >
                  Account number
                </Text>
                <Text
                  selectable
                  style={{
                    marginTop: 10,
                    fontSize: RFPercentage(2),
                    color: "#ffffff",
                  }}
                >
                  {details.AccountNumber}
                </Text>
              </View>
              <View
                style={{
                  marginTop: -5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: windowWidth / 3,
                    marginTop: 10,
                    fontSize: RFPercentage(1.7),
                    color: "#BBBBBB",
                  }}
                >
                  Routing Number
                </Text>
                <Text
                  selectable
                  style={{
                    marginTop: 10,
                    fontSize: RFPercentage(2),
                    color: "#ffffff",
                  }}
                >
                  {details.RouterNumber}
                </Text>
              </View>
              <View
                style={{
                  marginTop: -5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: windowWidth / 3,
                    marginTop: 10,
                    fontSize: RFPercentage(1.7),
                    color: "#BBBBBB",
                  }}
                >
                  Bank Name
                </Text>
                <Text
                  selectable
                  style={{
                    marginTop: 10,
                    fontSize: RFPercentage(2),
                    color: "#ffffff",
                  }}
                >
                  {details.BankName}
                </Text>
              </View>
              <View
                style={{
                  marginTop: -5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: windowWidth / 3,
                    marginTop: 10,
                    fontSize: RFPercentage(1.7),
                    color: "#BBBBBB",
                  }}
                >
                  Swift
                </Text>
                <Text
                  selectable
                  style={{
                    marginTop: 10,
                    fontSize: RFPercentage(2),
                    color: "#ffffff",
                  }}
                >
                  {details.Swift}
                </Text>
              </View>
            </View>
            <Text
              selectable
              style={{
                marginTop: 20,
                fontSize: RFPercentage(2),
                color: "#ffffff",
              }}
            >
              Ref: {details.Ref}
            </Text>
            <Text
              style={{
                width: windowWidth / 1.2,
                marginTop: 20,
                fontSize: RFPercentage(1.7),
                color: "#ffffff",
              }}
            >
              The funds will be available as soon as possible in your account
            </Text>
            <View
              style={{
                position: "absolute",
                bottom: 100,
                left: windowWidth / 20,
                justifyContent: "center",
                alignSelf: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#1E96FC",
                  padding: 10,
                  borderRadius: 20,
                }}
                onPress={() => navigation.navigate("GlobalAccount")}
              >
                <Text style={{ color: "#ffffff", textAlign: "center" }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default WithdrawFundDetailScreen;

