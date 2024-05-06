import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Image } from "react-native";
import GlobalAccount from "./../views/globalAccount";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalAccountWallet from "../views/globalAccountWallet";
import Transactions from "../views/transactions";
import Recipients from "../views/recipients";
import Transfers from "../views/transfers";
import Cards from "../views/cards";
import AddFundScreen from "../views/AddFundScreen";
import AddFundCryptoScreen from "../views/AddFundCryptoScreen";
import AddWalletScreen from "../views/AddWalletScreen";
import AddFundTransferScreen from "../views/AddFundTransferScreen";
import WithdrawFundScreen from "../views/WithdrawFundScreen";
import WithdrawFundConfirmationScreen from "../views/WithdrawFundConfirmationScreen";
import WithdrawFundDetailScreen from "../views/WithdrawFundDetailScreen";

const windowWidth = Dimensions.get("window").width;

const { Navigator, Screen } = createBottomTabNavigator();

const Stack = createStackNavigator();

const TabScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GlobalAccount" component={GlobalAccount} />
      <Screen name="GlobalAccountWallet" component={GlobalAccountWallet} />
      <Screen name="transactions" component={Transactions} />
      <Screen name="recipients" component={Recipients} />
      <Screen name="transfers" component={Transfers} />
      <Screen name="cards" component={Cards} />
      <Screen name="AddFund" component={AddFundScreen} />
      <Screen name="AddWallet" component={AddWalletScreen} />
      <Screen name="WithdrawFund" component={WithdrawFundScreen} />
      <Screen
        name="WithdrawFundConfirmation"
        component={WithdrawFundConfirmationScreen}
      />
      <Screen name="WithdrawFundDetail" component={WithdrawFundDetailScreen} />
      </Stack.Navigator>
)
      }

const TabNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingVertical: 10,
          width: windowWidth,
          // height: 50,
          backgroundColor: "#2F3B71",
        },
        tabBarItemStyle: {
          marginTop: -10,
        },
        tabBarLabelStyle: {
          marginBottom: 5,
          color: "#ffffff",
          fontSize: windowWidth / 38,
        },
      }}
    >
      <Screen
        name="Home"
        component={TabScreens}
        options={{
          tabBarIcon: () => (
            <Image
            source={require("./../assets/images/Home.png")}
              alt="Home"
              style={{
                marginTop: windowWidth / 30,
                width: windowWidth/10,
                height: windowWidth/10,
                resizeMode:"contain"
              }}
            />
          ),
        }}
      />
      <Screen
        name="Crypto"
        component={TabScreens}
        listeners={props => ({
          tabPress: e => {
            e.preventDefault();
        }})
          }
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./../assets/images/Crypto.png")}
              alt="Crypto"
              style={{
                marginTop: windowWidth / 30,
                width: windowWidth/10,
                height: windowWidth/10,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Screen
        name="Invest"
        component={TabScreens}

        listeners={props => ({
          tabPress: e => {
            e.preventDefault();
        }})
          }
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./../assets/images/Invest.png")}
              alt="Invest"
              style={{
                marginTop: windowWidth / 30,
                width: windowWidth/10,
                height: windowWidth/10,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Screen
        name="Services"
        component={TabScreens}

        listeners={props => ({
          tabPress: e => {
            e.preventDefault();
        }})
          }
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./../assets/images/Services.png")}
              alt="Services"
              style={{
                marginTop: windowWidth / 30,
                width: windowWidth/10,
                height: windowWidth/10,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Screen
        name="Community"
        component={TabScreens}

        listeners={props => ({
          tabPress: e => {
            e.preventDefault();
        }})
          }
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./../assets/images/Community.png")}
              alt="Community"
              style={{
                marginTop: windowWidth / 30,
                width: windowWidth/10,
                height: windowWidth/10,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Screen
        name="Media"
        component={TabScreens}

        listeners={props => ({
          tabPress: e => {
            e.preventDefault();
        }})
          }
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./../assets/images/Media.png")}
              alt="Media"
              style={{
                marginTop: windowWidth / 30,
                width: windowWidth/10,
                height: windowWidth/10,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
