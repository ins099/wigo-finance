import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import IconButton from "../components/iconButton";
import { getAllWallets } from "../services";
import { useAuth } from "../contexts/authContext";
import useToast from "../hooks";
import { formatBalance } from "../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WithdrawFundScreen: React.FC = ({ navigation }: any) => {
  const { fire } = useToast();
  const { user } = useAuth();
  const { id: userId, userName } = user ?? {};

  const [wallets, setWallets] = useState([]);
  const [areCurrenciesLoaded, setAreCurrenciesLoaded] = useState(false);
  const [activeWallet, setActiveWallet] = useState<any>();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  async function getWallets() {
    const wallets = await getAllWallets(userId);

    if (wallets.length > 0) {
      setActiveWallet(wallets[0]);
      setWallets(wallets);
    }
    setAreCurrenciesLoaded(true);
  }

  useEffect(() => {
    getWallets();
  }, []);

  async function withDrawFund() {
    if (wallets.length === 0) {
      fire("No banks available");
      return;
    }

    if (!amount.trim()) {
      setError("Please enter amount");
      return;
    }

    if (activeWallet.Balance === 0) {
      fire("You can't withdraw from empty wallet");
      return;
    }

    if (amount > activeWallet.Balance) {
      fire("Insufficient balance");
      return;
    }

    const data = {
      WalletId: activeWallet.Id,
      Amount: amount,
      UserName: userName,
      UserId: userId,
      FiatSymbol: activeWallet.FiatSymbol,
    };

    navigation.navigate("WithdrawFundConfirmation", {
      details: {
        ...data,
      },
    });
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
              <Text style={{ fontSize: RFPercentage(2), color: "#ffffff" }}>
                From Wallet
              </Text>
            </View>
            <View style={{ marginTop: windowHeight / 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  rowGap: windowHeight / 80,
                  columnGap: windowWidth / 30,
                }}
              >
                {areCurrenciesLoaded ? (
                  <>
                    {wallets.length === 0 ? (
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 24,
                          }}
                        >
                          No wallets found
                        </Text>
                      </View>
                    ) : (
                      wallets.map((wallet: any) => {
                        return (
                          <TouchableOpacity
                            key={wallet.Id}
                            style={{
                              width: windowWidth / 2.35,
                              padding: 15,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              backgroundColor:
                                activeWallet.FiatId === wallet.FiatId
                                  ? "rgba(250, 250, 250, 0.1)"
                                  : "#2F3B71",
                              borderWidth:
                                activeWallet.FiatId === wallet.FiatId ? 1 : 0,
                              borderColor:
                                activeWallet.FiatId === wallet.FiatId
                                  ? "#ffffff"
                                  : "transparent",
                              borderRadius: 15,
                            }}
                            onPress={() => setActiveWallet(wallet)}
                          >
                            <Text style={{ color: "#ffffff" }}>
                              {wallet.FiatSymbol}
                            </Text>
                            <Text style={{ color: "#ffffff" }}>
                              {formatBalance(wallet.Balance)}
                            </Text>
                          </TouchableOpacity>
                        );
                      })
                    )}
                  </>
                ) : (
                  <View style={{ width: "100%" }}>
                    <ActivityIndicator color="#fff" />
                  </View>
                )}
                {/* <TouchableOpacity
                  style={{
                    width: windowWidth / 2.35,
                    padding: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor:
                      currency === "EUR"
                        ? "rgba(250, 250, 250, 0.1)"
                        : "#2F3B71",
                    borderWidth: currency === "EUR" ? 1 : 0,
                    borderColor: currency === "EUR" ? "#ffffff" : "transparent",
                    borderRadius: 15,
                  }}
                  onPress={() => setCurrency("EUR")}
                >
                  <Text style={{ color: "#ffffff" }}>EUR</Text>
                  <Text style={{ color: "#ffffff" }}>5,670</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: windowWidth / 2.35,
                    padding: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor:
                      currency === "USD"
                        ? "rgba(250, 250, 250, 0.1)"
                        : "#2F3B71",
                    borderWidth: currency === "USD" ? 1 : 0,
                    borderColor: currency === "USD" ? "#ffffff" : "transparent",
                    borderRadius: 15,
                  }}
                  onPress={() => setCurrency("USD")}
                >
                  <Text style={{ color: "#ffffff" }}>USD</Text>
                  <Text style={{ color: "#ffffff" }}>1,879</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: windowWidth / 2.35,
                    padding: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor:
                      currency === "VND"
                        ? "rgba(250, 250, 250, 0.1)"
                        : "#2F3B71",
                    borderWidth: currency === "VND" ? 1 : 0,
                    borderColor: currency === "VND" ? "#ffffff" : "transparent",
                    borderRadius: 15,
                  }}
                  onPress={() => setCurrency("VND")}
                >
                  <Text style={{ color: "#ffffff" }}>VND</Text>
                  <Text style={{ color: "#ffffff" }}>0.00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: windowWidth / 2.35,
                    padding: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor:
                      currency === "CFA"
                        ? "rgba(250, 250, 250, 0.1)"
                        : "#2F3B71",
                    borderWidth: currency === "CFA" ? 1 : 0,
                    borderColor: currency === "CFA" ? "#ffffff" : "transparent",
                    borderRadius: 15,
                  }}
                  onPress={() => setCurrency("CFA")}
                >
                  <Text style={{ color: "#ffffff" }}>CFA</Text>
                  <Text style={{ color: "#ffffff" }}>7,256,000</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.infoWrap}>
              <Text
                style={[
                  styles.detailText,
                  {
                    marginTop: windowHeight / 70,
                    color: "#ffffff",
                    fontSize: windowWidth / 25,
                    marginBottom: 5,
                  },
                ]}
              >
                Amount:
              </Text>
              <Text style={styles.detailText}>Add desire amount</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={[
                    styles.input,
                    {
                      width: windowWidth / 1.38,
                      borderBottomWidth: 1,
                      borderBottomColor: "#ffffff",
                      paddingBottom: 1,
                    },
                  ]}
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    setError(!text ? "Please enter amount" : "");
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    backgroundColor: "rgba(250, 250, 250, 0.1)",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>
                    {activeWallet?.FiatSymbol}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="white" />
                </View>
              </View>
              {error ? (
                <View style={{ marginTop: 4 }}>
                  <Text style={{ color: "red" }}>{error}</Text>
                </View>
              ) : null}
            </View>
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
                disabled={wallets.length === 0}
                onPress={withDrawFund}
              >
                <Text style={{ color: "#ffffff", textAlign: "center" }}>
                  Submit
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

export default WithdrawFundScreen;

