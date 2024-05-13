import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./../views/signIn";
import Welcome from "./../views/welcome";

import "react-native-gesture-handler";
import AddFundCryptoScreen from "./../views/AddFundCryptoScreen";
import AddFundScreen from "./../views/AddFundScreen";
import AddFundTransferScreen from "./../views/AddFundTransferScreen";
import AddWalletScreen from "./../views/AddWalletScreen";
import WithdrawFundConfirmationScreen from "./../views/WithdrawFundConfirmationScreen";
import WithdrawFundDetailScreen from "./../views/WithdrawFundDetailScreen";
import WithdrawFundScreen from "./../views/WithdrawFundScreen";
import Cards from "./../views/cards";
import ChangePassword from "./../views/changePassword";
import EmailVerification from "./../views/emailVerification";
import ForgetPassword from "./../views/forgetPassword";
import GlobalAccountWallet from "./../views/globalAccountWallet";
import KYCScreen from "./../views/kycScreen";
import ProfileCompletion from "./../views/profileCompletion";
import ProfileScreenOne from "./../views/profileScreenOne";
import Recipients from "./../views/recipients";
import SignUp from "./../views/signUp";
import Transactions from "./../views/transactions";
import Transfers from "./../views/transfers";
import TabNavigator from "./../navigations/TabNavigator";
import { primaryDark } from "../constants/colors";
import { useAuth } from "../contexts/authContext";
import { ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/globalStyles";
import { useGetLocationsQuery } from "../redux/apis/general";
import { useAppSelector } from "../redux/store";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  useGetLocationsQuery({}); //getting the locations from api.

  const accessToken = useAppSelector((store) => store.user.accessToken);

  if (isLoading) {
    return (
      <LinearGradient
        colors={[primaryDark, primaryDark]}
        style={[globalStyles.container, { justifyContent: "center" }]}
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!accessToken ? (
        <>
          <Screen name="Welcome" component={Welcome} />
          <Screen name="SignIn" component={SignIn} />
          <Screen name="SignUp" component={SignUp} />
          <Screen name="ForgetPassword" component={ForgetPassword} />
          <Screen name="EmailVerification" component={EmailVerification} />
          <Screen name="ProfileScreenOne" component={ProfileScreenOne} />
          <Screen name="KYCScreen" component={KYCScreen} />
          <Screen name="ProfileCompletion" component={ProfileCompletion} />
        </>
      ) : (
        <>
          <Screen name="Tab" component={TabNavigator} />
          <Screen name="AddFundTransfer" component={AddFundTransferScreen} />
          <Screen name="AddFundCrypto" component={AddFundCryptoScreen} />
        </>
      )}
      <Screen name="ChangePassword" component={ChangePassword} />
    </Navigator>
  );
};

export default AppNavigator;
