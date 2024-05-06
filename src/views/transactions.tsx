import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Navbar from "../components/navbar";
import {
  getAllCurrencies,
  getAllTransactions,
  getAllWallets,
} from "../services";
import { useAuth } from "../contexts/authContext";
import { primaryDark } from "../constants/colors";
import { TransactionData } from "../constants/transactionData";
import { globalStyles } from "../styles/globalStyles";
import { formatDate } from "./globalAccount";
import { formatBalance } from "../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Transactions({ navigation }: { navigation: any }): JSX.Element {
  const { user } = useAuth();
  const { id: userId } = user ?? {};

  const [areTransactionsLoaded, setAreTransactionsLoaded] = useState(false);
  const [currenciesSymbols, setCurrenciesSymbols] = useState<any>({});
  const [transactions, setTransactions] = useState<any[]>([]);

  async function getTransactions() {
    const wallets = await getAllWallets(userId);
    const currencies = await getAllCurrencies();

    const promises = wallets.map((wallet: any) => {
      return getAllTransactions(wallet.Id);
    });

    const response = await Promise.all(promises);

    const currenciesObj: any = {};

    currencies.forEach(({ Symbol: Sym, Unit }: any) => {
      currenciesObj[Sym] = Unit;
    });

    setCurrenciesSymbols(currenciesObj);

    // merge all the wallets transactions and sort the transactions
    const sortedTransactions = response
      .flat()
      .sort(
        (a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime()
      );

    setTransactions(sortedTransactions);
    setAreTransactionsLoaded(true);
  }

  useEffect(() => {
    getTransactions();
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
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Your Transactions</Text>
          </View>
          <LinearGradient
            colors={["#1E96FC", "#072AC8"]}
            style={styles.cardContainer}
          >
            <TouchableOpacity
              style={styles.cardContainerInner}
              onPress={() => navigation.navigate("transfers")}
            >
              <Image
                style={{
                  width: windowWidth / 12,
                }}
                resizeMode="contain"
                source={require("../assets/images/Verticalswitch.png")}
              />
              <Text style={styles.text1}>Make a transaction</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.statementWrap}>
            <Text style={styles.statementText}>Recent Transaction</Text>
            <View style={styles.statementWrapInner}>
              <Text style={styles.statementText2}>Get Statement</Text>
              <Image
                style={{
                  width: windowWidth / 16,
                }}
                resizeMode="contain"
                source={require("../assets/images/ImportIcon.png")}
              />
            </View>
          </View>
          {areTransactionsLoaded && transactions.length === 0 ? (
            <View style={{ marginTop: 24 }}>
              <Text style={{ color: "#fff", fontSize: 24 }}>
                No Transaction Found
              </Text>
            </View>
          ) : null}
          {!areTransactionsLoaded ? (
            <View style={{ flex: 1, padding: 12 }}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <>
              {transactions.map((transaction) => (
                <View key={transaction.Id} style={styles.transactionWrap}>
                  <View style={styles.leftWrap}>
                    <View style={styles.iconWrap}>
                      {transaction.TypeName === "Topup" ? (
                        <Image
                          style={{
                            width: windowWidth / 15,
                          }}
                          resizeMode="contain"
                          source={require("../assets/images/Downloadcirclefill.png")}
                        />
                      ) : (
                        <Image
                          style={{
                            width: windowWidth / 15,
                          }}
                          resizeMode="contain"
                          source={require("../assets/images/Loadcirclefill.png")}
                        />
                      )}
                    </View>
                    <View>
                      <Text style={styles.transactionText}>
                        {transaction.TypeName === "Topup"
                          ? "Fund Added"
                          : transaction.TypeName === "CreateWithdraw"
                          ? "Fund Withdrawn"
                          : ""}
                      </Text>
                      {/* <Text style={styles.fee}>Card Set up fee</Text> */}
                      <Text style={styles.transactionDate}>
                        {formatDate(new Date(transaction.Created))}
                      </Text>
                    </View>
                  </View>
                  {/* <View>
                    <View style={styles.flagWrap}>
                      <Text style={styles.currency}>Currency</Text>
                      <Image
                        style={{
                          width: windowWidth / 18,
                          marginLeft: windowWidth / 50,
                        }}
                        resizeMode="contain"
                        source={require("../assets/images/flag.png")}
                      />
                     

                    </View>
                    <Text style={styles.state3}>Debit</Text>
                  </View> */}
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        ...styles.amount,
                      }}
                    >
                      {currenciesSymbols[transaction.FiatSymbol]}
                      {formatBalance(transaction.Value)}
                    </Text>
                    <Text
                      style={{
                        fontSize: windowWidth / 30,
                        fontWeight: "bold",
                        color: "#6FCF97",
                      }}
                    >
                      Successful
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

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
    width: "90%",
    marginTop: windowHeight / 20,
    borderRadius: windowWidth / 10,
  },
  cardContainerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 30,
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 22,
    marginLeft: windowWidth / 30,
  },

  spacing: {
    marginBottom: windowHeight / 20,
  },
  statementWrap: {
    flexDirection: "row",
    width: "94%",
    justifyContent: "space-between",
    marginTop: windowHeight / 20,
    borderBottomWidth: 1,
    borderColor: "#fff",
    paddingBottom: windowHeight / 100,
  },
  statementWrapInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  statementText: {
    color: "#fff",
    fontSize: windowWidth / 26,
  },
  statementText2: {
    color: "#fff",
    fontSize: windowWidth / 30,
  },
  transactionWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2F3B71",
    // width: windowWidth - windowWidth / 15,
    width: "96%",
    borderRadius: windowWidth / 60,
    paddingHorizontal: windowWidth / 60,
    paddingVertical: windowWidth / 30,
    marginTop: windowHeight / 40,
    alignItems: "center",
  },
  leftWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionText: {
    color: "#fff",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.4),
    fontWeight: "700",
  },
  fee: {
    color: "#fff",
    // fontSize: windowWidth / 36,
    fontSize: RFPercentage(1.4),
  },
  transactionDate: {
    color: "gray",
    // fontSize: windowWidth / 36,
    fontSize: RFPercentage(1.2),
    marginTop: 5,
  },
  currency: {
    color: "#fff",
    // fontSize: windowWidth / 32,
    fontSize: RFPercentage(1.4),
  },
  amount: {
    color: "#fff",
    // fontSize: windowWidth / 30,
    fontWeight: "700",
    fontSize: RFPercentage(1.4),
  },
  amount2: {
    color: "#6FCF97",
    fontSize: windowWidth / 32,
    fontWeight: "700",
  },
  state3: {
    color: "#fff",
    // fontSize: windowWidth / 32,
    fontSize: RFPercentage(1.4),
  },
  flagWrap: {
    flexDirection: "row",
  },
  iconWrap: {
    backgroundColor: "#182561",
    borderRadius: windowWidth / 2,
    width: windowWidth / 12,
    height: windowWidth / 12,
    alignItems: "center",
    marginRight: windowWidth / 100,
    justifyContent: "center",
  },
});

export default Transactions;

