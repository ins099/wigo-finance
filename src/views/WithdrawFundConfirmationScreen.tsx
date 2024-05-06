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
  ActivityIndicator,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import IconButton from "../components/iconButton";
import { getWalletInfo, withdrawFundFromBank } from "../services";
import { useState } from "react";
import useToast from "../hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WithdrawFundConfirmationScreen: React.FC = ({
  navigation,
  route,
}: any) => {
  const { fire } = useToast();

  const { details } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  async function confirmWithdraw() {
    setIsLoading(true);

    const data = { ...details };

    delete data.FiatSymbol;

    try {
      const response = await withdrawFundFromBank(data);
      const walletInfo = await getWalletInfo();

      fire("Succesfully withdrawn", "success");

      navigation.navigate("WithdrawFundDetail", {
        details: {
          ...details,
          ...walletInfo,
          Ref: response.Content,
        },
      });
    } catch (error: any) {
      fire(error.message);
    } finally {
      setIsLoading(false);
    }
  }
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
                  color: "#FAFAFA",
                }}
              >
                Please transfer the following amount from my wallet to my bank
                account:
              </Text>
            </View>
            <View
              style={{
                marginTop: windowHeight / 20,
                marginBottom: windowHeight / 10,
                width: windowWidth / 2,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#2F3B71",
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5.62,
                  elevation: 7,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 28,
                    fontWeight: "bold",
                  }}
                >
                  {details.Amount}
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {details.FiatSymbol}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                columnGap: windowWidth / 50,
              }}
            >
              <TouchableOpacity
                style={{
                  width: windowWidth / 2.3,
                  backgroundColor: "#1E96FC",
                  padding: 15,
                  borderRadius: 30,
                }}
                disabled={isLoading}
                onPress={confirmWithdraw}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: "#ffffff", textAlign: "center" }}>
                    Confirm
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                style={{
                  width: windowWidth / 2.3,
                  backgroundColor: "#D8574A",
                  padding: 15,
                  borderRadius: 30,
                }}
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: "#ffffff", textAlign: "center" }}>
                  Cancel
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

export default WithdrawFundConfirmationScreen;

