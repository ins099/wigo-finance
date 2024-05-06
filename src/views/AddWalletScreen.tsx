import { useEffect, useState } from "react";
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
import IconButton from "./../components/iconButton";
import { addWallet, getAllCurrencies, getAllWallets } from "../services";
import { useAuth } from "../contexts/authContext";
import Toast from "react-native-root-toast";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddWalletScreen: React.FC = ({ navigation }: any) => {
  const { user } = useAuth();
  const { id: userId } = user ?? {};

  const [areCurrenciesLoaded, setAreCurrenciesLoaded] =
    useState<boolean>(false);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [allWallets, setAllWallets] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState<any>();

  async function initializeCurrencies() {
    const currencies = await getAllCurrencies();
    const wallets = await getAllWallets(userId);
    setAllCurrencies(currencies);
    setAllWallets(wallets);
    setSelectedCurrency(currencies[0]);
    setAreCurrenciesLoaded(true);
  }

  useEffect(() => {
    initializeCurrencies();
  }, []);

  async function createWallet() {
    if (allWallets.length === allCurrencies.length) {
      Toast.show(`You can only create ${allCurrencies.length} wallets`, {
        duration: Toast.durations.SHORT,
        containerStyle: {
          backgroundColor: "red",
        },
      });
      return;
    }

    if (!selectedCurrency) {
      return;
    }

    setWalletLoading(true);

    const data = {
      UserId: userId,
      FiatId: selectedCurrency.Id,
    };

    const response = await addWallet(data);

    setWalletLoading(false);

    if (response?.isWalletCreated) {
      navigation.navigate("GlobalAccount");
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
              <Text style={styles.textTitle}>Add Wallet</Text>
            </View>
            {areCurrenciesLoaded ? (
              <View style={{ marginTop: windowHeight / 70 }}>
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
                  {allCurrencies.map((currency) => {
                    return (
                      <TouchableOpacity
                        key={currency["Name"]}
                        style={{
                          width: windowWidth / 2.35,
                          padding: 15,
                          backgroundColor:
                            selectedCurrency?.["Symbol"] === currency["Symbol"]
                              ? "rgba(250, 250, 250, 0.1)"
                              : "#2F3B71",
                          borderWidth:
                            selectedCurrency?.["Symbol"] === currency["Symbol"]
                              ? 1
                              : 0,
                          borderColor:
                            selectedCurrency?.["Symbol"] === currency["Symbol"]
                              ? "#ffffff"
                              : "transparent",
                          borderRadius: 15,
                        }}
                        onPress={() => setSelectedCurrency(currency)}
                      >
                        <Text style={{ color: "#ffffff" }}>
                          {currency["Symbol"]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator color="#fff" />
              </View>
            )}
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
                onPress={createWallet}
                style={{
                  backgroundColor: "#1E96FC",
                  padding: 10,
                  borderRadius: 20,
                }}
                disabled={walletLoading}
              >
                {walletLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: "#ffffff", textAlign: "center" }}>
                    Create Wallet
                  </Text>
                )}
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

export default AddWalletScreen;
