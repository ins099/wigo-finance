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
import { useAuth } from "../contexts/authContext";
import { addFundToBank, getAllBankAccounts, getAllWallets } from "../services";
import useToast from "../hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddFundScreen: React.FC = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState<any>("");
  const [bankCurrencies, setBankCurrencies] = useState<any[]>([]);
  const [areBankCurrenciesLoaded, setAreBankCurrenciesLoaded] =
    useState<boolean>(false);
    const [error, setError] = useState("");

    const { fire } = useToast();

  const { user } = useAuth();
  const { id: userId, userName: UserName } = user ?? {};

  async function getBankAccounts() {
    const bankAccounts = await getAllBankAccounts();

    const userWallets = await getAllWallets(userId);

    const currencies: any[] = [];

    userWallets.forEach(({ FiatId, Id }: any) => {
      const bankDetails = bankAccounts.find(
        (bank: any) => bank.FiatId === FiatId
      );

      if (bankDetails) {
        currencies.push({
          FiatSymbol: bankDetails.FiatSymbol,
          ToBank: bankDetails.Id,
          AccountName: bankDetails.AccountName,
          AccountNumber: bankDetails.AccountNumber,
          BankName: bankDetails.BankName,
          WalletId: Id,
        });
      }
    });

    setBankCurrencies(currencies);
    setAreBankCurrenciesLoaded(true);
    if (currencies.length > 0) {
      setCurrency(currencies[0].FiatSymbol);
    }
  }

  useEffect(() => {
    getBankAccounts();
  }, []);

  async function addFund() {
    const { WalletId, ToBank, ...rest } = bankCurrencies.find(
      ({ FiatSymbol }) => FiatSymbol === currency
    );

    if (bankCurrencies.length === 0) {
      fire("No Currencies available");
      return;
    }
    if (!amount.trim()) {
      setError("Please enter amount");
      return;
    }

    const fundData = await addFundToBank({
      WalletId,
      ToBank,
      Amount: amount,
      UserName,
      UserId: userId,
    });

    const bankDetails = {
      Id: fundData.Id,
      Content: fundData.Content,
      ...rest,
      Amount: amount,
    };

    navigation.navigate(
      activeTab === "tab1" ? "AddFundTransfer" : "AddFundCrypto",
      {
        details: { ...bankDetails },
      }
    );
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#2F3B71",
                  marginTop: 10,
                  borderRadius: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: windowWidth / 2.25,
                    padding: 15,
                    backgroundColor:
                      activeTab === "tab1"
                        ? "rgba(250, 250, 250, 0.1)"
                        : "transparent",
                    borderWidth: activeTab === "tab1" ? 1 : 0,
                    borderColor:
                      activeTab === "tab1" ? "#ffffff" : "transparent",
                    borderRadius: 15,
                  }}
                  onPress={() => {
                    setActiveTab("tab1");
                    if (bankCurrencies.length > 0) {
                      setCurrency(bankCurrencies[0].FiatSymbol);
                    }
                  }}
                >
                  <Text style={{ color: "#ffffff", textAlign: "center" }}>
                    By Bank Transfer
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: windowWidth / 2.25,
                    padding: 15,
                    backgroundColor:
                      activeTab === "tab2"
                        ? "rgba(250, 250, 250, 0.1)"
                        : "transparent",
                    borderWidth: activeTab === "tab2" ? 1 : 0,
                    borderColor:
                      activeTab === "tab2" ? "#ffffff" : "transparent",
                    borderRadius: 15,
                  }}
                  disabled
                  onPress={() => {
                    setActiveTab("tab2");
                    if (bankCurrencies.length > 0) {
                      setCurrency("X" + bankCurrencies[0].FiatSymbol);
                    }
                  }}
                >
                  <Text style={{ color: "#ffffff", textAlign: "center" }}>
                    By Crypto
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {areBankCurrenciesLoaded ? (
              <View style={{ marginTop: windowHeight / 30 }}>
                <Text
                  style={[
                    styles.detailText,
                    {
                      color: "#ffffff",
                      fontSize: windowWidth / 25,
                      marginBottom: 20,
                    },
                  ]}
                >
                  Select Currency:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    rowGap: windowHeight / 80,
                    columnGap: windowWidth / 30,
                  }}
                >
                  {bankCurrencies.map((bankCurrency: any) => {
                    return (
                      <TouchableOpacity
                        key={bankCurrency.FiatSymbol}
                        style={{
                          width: windowWidth / 2.35,
                          padding: 15,
                          backgroundColor:
                            currency === bankCurrency.FiatSymbol ||
                            currency === "X" + bankCurrency.FiatSymbol
                              ? "rgba(250, 250, 250, 0.1)"
                              : "#2F3B71",
                          borderWidth:
                            currency === bankCurrency.FiatSymbol ||
                            currency === "X" + bankCurrency.FiatSymbol
                              ? 1
                              : 0,
                          borderColor:
                            currency === bankCurrency.FiatSymbol ||
                            currency === "X" + bankCurrency.FiatSymbol
                              ? "#ffffff"
                              : "transparent",
                          borderRadius: 15,
                        }}
                        onPress={() =>
                          setCurrency(
                            activeTab === "tab1"
                              ? bankCurrency.FiatSymbol
                              : "X" + bankCurrency.FiatSymbol
                          )
                        }
                      >
                        <Text style={{ color: "#ffffff" }}>
                          {activeTab === "tab1"
                            ? bankCurrency.FiatSymbol
                            : "X" + bankCurrency.FiatSymbol}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View style={{ paddingTop: 40 }}>
                <ActivityIndicator color="#fff" />
              </View>
            )}
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
                  borderBottomWidth: 1,
                  borderColor: "#ffffff",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={[
                    styles.input,
                    {
                      width: windowWidth / 1.25,
                      borderBottomWidth: 0,
                      paddingBottom: 1,
                    },
                  ]}
                  value={amount}
                  onChangeText={(number) => setAmount(number)}
                  keyboardType="numeric"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                />
                <Text style={{ color: "#ffffff", paddingTop: 1 }}>
                  {currency}
                </Text>
              </View>
            </View>
            {error ? (
                <View style={{ marginTop: 4 }}>
                  <Text style={{ color: "red" }}>{error}</Text>
                </View>
              ) : null}
            {/* <View
              style={{
               
              }}
            > */}
            <TouchableOpacity
              style={{
                backgroundColor: "#1E96FC",
                padding: 10,
                borderRadius: 20,
                position: "absolute",
                bottom: 100,
                justifyContent: "center",
                alignSelf: "center",
                width: "100%",
                zIndex: 11,
              }}
              onPress={addFund}
            >
              <Text style={{ color: "#ffffff", textAlign: "center" }}>
                Submit
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </KeyboardAvoidingView>
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

export default AddFundScreen;

