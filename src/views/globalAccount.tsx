import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../components/navbar";
import { useAuth } from "../contexts/authContext";
import {
  getAllCurrencies,
  getAllTransactions,
  getAllWallets,
} from "../services";
import { formatBalance } from "../utils";

interface IWalletZone {
  currency: string;
  balance: string;
}

const WalletZone: IWalletZone[] = [
  {
    currency: "EUR",
    balance: "123.50",
  },
  {
    currency: "USD",
    balance: "3850.98",
  },
  {
    currency: "VND",
    balance: "20,300,800",
  },
  {
    currency: "FCFA",
    balance: "45,450,000",
  },
];

function formatDate(date: Date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Handle midnight (0 hours)

  const formattedDateTime = `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
  return formattedDateTime;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const windowFontScale = Dimensions.get("window").fontScale;

function GlobalAccount({ navigation }: { navigation: any }): JSX.Element {
  const [areWalletsLoaded, setAreWalletsLoaded] = useState(false);
  const [areTransactionsLoaded, setAreTransactionsLoaded] = useState(false);
  const [userWallets, setUserWallets] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [currenciesSymbols, setCurrenciesSymbols] = useState<any>({});
  const [transactions, setTransactions] = useState<any[]>([]);

  const { user } = useAuth();
  const { id: userId } = user ?? {};

  async function getUserWallets() {
    const wallets = await getAllWallets(userId);
    const currencies = await getAllCurrencies();

    const walletsWithCurrencies = wallets.map((wallet: any) => {
      const matchedCurrency = currencies.find(
        (currency: any) => currency.Id === wallet.FiatId
      );

      return {
        ...wallet,
        Symbol: matchedCurrency.Unit,
      };
    });

    if (wallets.length > 0) {
      setBaseCurrency(wallets[0]?.ConvertSymbol);
      setTotalBalance(
        wallets.reduce((prev: number, curr: any) => {
          return prev + curr.ConvertBalance;
        }, 0)
      );
    }

    setUserWallets(walletsWithCurrencies);
    setAreWalletsLoaded(true);

    const promises = wallets.map((wallet: any) => {
      return getAllTransactions(wallet.Id);
    });

    const response = await Promise.all(promises);

    const currenciesObj: any = {};

    currencies.forEach(({ Symbol: Sym, Unit }: any) => {
      currenciesObj[Sym] = Unit;
    });
    setCurrenciesSymbols(currenciesObj);

    // merge all the wallets transactions and sort the data and pick the 10 most recent transactions
    const sortedTransactions = response
      .flat()
      .sort(
        (a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime()
      )
      .slice(0, 10);

    setTransactions(sortedTransactions);
    setAreTransactionsLoaded(true);
  }

  useEffect(() => {
    const focusUnsubscriber = navigation.addListener("focus", () => {
      getUserWallets();
    });

    const blurUnsubscriber = navigation.addListener("blur", () => {
      setAreTransactionsLoaded(false);
      setAreWalletsLoaded(false);
      setTransactions([]);
      setUserWallets([]);
    });

    return () => {
      focusUnsubscriber();
      blurUnsubscriber();
    };
  }, []);

  return (
    <LinearGradient
      colors={[primaryDark, primaryDark]}
      style={globalStyles.container}
    >
      <ScrollView>
        <Navbar navigation={navigation} />
        <SafeAreaView
          style={{
            ...globalStyles.container,
            ...globalStyles.safeAreaContainer,
            ...styles.spacing,
            position: "relative",
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Your Wallet</Text>
          </View>

          <View
            style={{
              gap: 12,
              width: "100%",
              marginTop: 12,
              alignItems: "center",
            }}
          >
            {!areWalletsLoaded && (
              <View style={{ paddingVertical: 12 }}>
                <ActivityIndicator color="#fff" />
              </View>
            )}
            {areWalletsLoaded && userWallets.length === 0 && (
              <View style={{ marginVertical: 12 }}>
                <Text style={{ color: "#fff", fontSize: 24 }}>
                  No Wallet Found
                </Text>
              </View>
            )}
            {areWalletsLoaded && userWallets.length > 0 && (
              <View style={{ width: "92%" }}>
                <ImageBackground
                  source={require("../assets/images/card1bg.png")}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    overflow: "hidden",
                    paddingVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 22,
                      fontWeight: "300",
                      marginBottom: 12,
                    }}
                  >
                    Account Balance
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: "700",
                    }}
                  >
                    {currenciesSymbols[baseCurrency]}{" "}
                    {formatBalance(totalBalance)} {baseCurrency}
                  </Text>
                </ImageBackground>
              </View>
            )}
          </View>

          <View style={styles.buttonWrap}>
            <TouchableOpacity
              style={styles.buttonWrapInner}
              onPress={() => navigation.navigate("AddFund")}
            >
              <Image
                style={{
                  width: windowWidth / 12,
                }}
                resizeMode="contain"
                source={require("../assets/images/Load_circle_fill.png")}
              />
              <Text style={styles.button}>Add Fund</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapInner}
              onPress={() => navigation.navigate("transfers")}
            >
              <Image
                style={{
                  width: windowWidth / 12,
                }}
                resizeMode="contain"
                source={require("../assets/images/Download_circle_fill.png")}
              />
              <Text style={styles.button}>Send Fund</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              style={styles.buttonWrapInner}
              onPress={() => navigation.navigate("AddWallet")}
            >
              <Image
                style={{
                  width: windowWidth / 12,
                }}
                resizeMode="contain"
                source={require("../assets/images/Add_ring.png")}
              />
              <Text style={styles.button}>Add Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapInner}
              onPress={() => navigation.navigate("WithdrawFund")}
            >
               <Image
                style={{
                  width: windowWidth / 12,
                }}
                resizeMode="contain"
                source={require("../assets/images/Horizontal_switch.png")}
              />
              <Text style={styles.button}>Withdraw Fund</Text>
            </TouchableOpacity>
          </View>

          {/* Wallet Zone */}
          <View
            style={{
              width: "87%",
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("./../assets/images/Wallet.png")}
              alt="Wallet"
              resizeMode="contain"
            />
            <Text style={[styles.button, { color: "#FAFAFA" }]}>
              Wallet Zone
            </Text>
          </View>
          {!areWalletsLoaded && (
            <View style={{ paddingVertical: 12 }}>
              <ActivityIndicator color="#fff" />
            </View>
          )}
          {areWalletsLoaded && userWallets.length > 0 && (
            <View
              style={{
                width: "90%",
                marginTop: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: windowHeight / 90,
              }}
            >
              {userWallets.map((wallet: any) => (
                <View
                  key={wallet.Id}
                  style={{
                    width: "48%",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: "#2F3B71",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: windowFontScale * 11 }}
                  >
                    Balance {wallet.FiatSymbol}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: windowFontScale * 15,
                      fontWeight: "600",
                    }}
                  >
                    {formatBalance(wallet.Balance)}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <View style={{ width: "90%", marginTop: windowHeight / 50 }}>
            <TouchableOpacity
              style={[styles.buttonWrapInner, { justifyContent: "center" }]}
              onPress={() => navigation.navigate("transactions")}
            >
              <Image
                style={{
                  width: windowWidth / 12,
                }}
                resizeMode="contain"
                source={require("../assets/images/Horizontal_switch.png")}
              />
              <Text style={styles.button}>Transactions</Text>
            </TouchableOpacity>
          </View>

          {/* End Wallet Zone */}

          {/* <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("transactions")}
          >
            <Image
              style={{
                width: windowWidth / 12,
              }}
              resizeMode="contain"
              source={require("../assets/images/Verticalswitch.png")}
            />
            <View>
              <Text style={styles.text1}>View Transaction</Text>
            </View>
          </TouchableOpacity> */}

          <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>Transaction Zone</Text>
          </View>
          {!areTransactionsLoaded && (
            <View style={{ paddingTop: 24 }}>
              <ActivityIndicator color="#fff" />
            </View>
          )}
          {areTransactionsLoaded && transactions.length === 0 ? (
            <View style={{ marginTop: 24 }}>
              <Text style={{ color: "#fff", fontSize: 24 }}>
                No Transaction Found
              </Text>
            </View>
          ) : null}
          {transactions.map((transaction: any) => {
            return (
              <View style={styles.transactionWrap} key={transaction.Id}>
                <View style={styles.leftWrap}>
                  <View style={styles.iconWrap}>
                    <Image
                      style={{
                        width: windowWidth / 15,
                      }}
                      resizeMode="contain"
                      source={
                        transaction.TypeName === "Topup"
                          ? require("../assets/images/Loadcirclefill.png")
                          : transaction.TypeName === "CreateWithdraw"
                          ? require("../assets/images/Downloadcirclefill.png")
                          : ""
                      }
                    />
                  </View>
                  <View>
                    <Text style={styles.transactionText}>
                      {transaction.TypeName === "Topup"
                        ? "Fund Added"
                        : transaction.TypeName === "CreateWithdraw"
                        ? "Fund Withdrawn"
                        : ""}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {formatDate(new Date(transaction.Created))}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.amount}>
                    {currenciesSymbols[transaction.FiatSymbol]}
                    {formatBalance(transaction.Value)}
                  </Text>
                  <Text
                    style={{
                      ...styles.state,
                      color: "#6FCF97"
                      // ...(transaction.TypeName === "Topup"
                      //   ? { color: "#6FCF97" }
                      //   : transaction.TypeName === "CreateWithdraw"
                      //   ? { color: "#FF4B38" }
                      //   : {}),
                    }}
                  >
                    {/* {transaction.TypeName === "Topup"
                      ? "Successful"
                      : "Fund Withdrawn"} */}
                      Successful
                  </Text>
                </View>
              </View>
            );
          })}
          {/* <View style={styles.transactionWrap}>
            <View style={styles.leftWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={{
                    width: windowWidth / 15,
                  }}
                  resizeMode="contain"
                  source={require("../assets/images/Loadcirclefill.png")}
                />
              </View>
              <View>
                <Text style={styles.transactionText}>Fund Added</Text>
                <Text style={styles.transactionDate}>
                  08/11/2022 - 11:06 AM
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>$2500</Text>
              <Text style={styles.state}>Successful</Text>
            </View>
          </View>
          <View style={styles.transactionWrap}>
            <View style={styles.leftWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={{
                    width: windowWidth / 15,
                  }}
                  resizeMode="contain"
                  source={require("../assets/images/Downloadcirclefill.png")}
                />
              </View>
              <View>
                <Text style={styles.transactionText}>Fund Sent to LV</Text>
                <Text style={styles.transactionDate}>
                  08/11/2022 - 11:06 AM
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>-$1000</Text>
              <Text style={styles.state2}>Pending</Text>
            </View>
          </View>
          <View style={styles.transactionWrap}>
            <View style={styles.leftWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={{
                    width: windowWidth / 15,
                  }}
                  resizeMode="contain"
                  source={require("../assets/images/closeringlight.png")}
                />
              </View>
              <View>
                <Text style={styles.transactionText}>Fund Sent to CC</Text>
                <Text style={styles.transactionDate}>
                  08/11/2022 - 11:06 AM
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>$100</Text>
              <Text style={styles.state3}>Failed</Text>
            </View>
          </View> */}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

export { formatDate };

const styles = StyleSheet.create({
  textTitle: {
    fontSize: windowWidth / 15,
    color: "#fff",
    fontWeight: "700",
  },
  textContainer: {
    width: "90%",
  },

  headingCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: "90%",
    marginTop: windowHeight / 20,
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 25,
    borderRadius: windowWidth / 25,
    flexDirection: "row",
    alignItems: "center",
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 25,
    marginLeft: windowWidth / 30,
  },
  button: {
    color: "#fff",
    fontWeight: "700",
    fontSize: windowWidth / 25,
    textAlign: "center",
    marginLeft: 5,
  },
  buttonWrap: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: windowHeight / 50,
    columnGap: 20,
  },
  buttonWrapInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E96FC",
    padding: windowWidth / 50,
    borderRadius: windowWidth / 15,
  },
  subHeading: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: "90%",
    paddingTop: windowWidth / 12,
    paddingBottom: windowWidth / 30,
  },
  subHeadingText: {
    color: "#fff",
    fontSize: windowWidth / 25,
  },
  transactionWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2F3B71",
    width: "90%",
    borderRadius: windowWidth / 60,
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 30,
    marginTop: windowHeight / 40,
  },
  leftWrap: {
    flexDirection: "row",
  },
  transactionText: {
    color: "#fff",
    fontSize: windowWidth / 28,
  },
  transactionDate: {
    color: "gray",
    fontSize: windowWidth / 35,
  },
  amount: {
    color: "#fff",
    fontSize: windowWidth / 30,
    fontWeight: "bold",
    textAlign:"right"
  },
  state: {
    fontSize: windowWidth / 30,
    fontWeight: "bold",
  },
  state2: {
    color: "#F2994A",
    fontSize: windowWidth / 30,
    fontWeight: "bold",
  },
  state3: {
    color: "#DC1500",
    fontSize: windowWidth / 30,
    fontWeight: "bold",
  },
  spacing: {
    marginBottom: windowHeight / 20,
  },
  iconWrap: {
    backgroundColor: "#182561",
    borderRadius: windowWidth / 2,
    width: windowWidth / 10,
    alignItems: "center",
    marginRight: windowWidth / 100,
  },
});

export default GlobalAccount;

