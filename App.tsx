import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "react-native";
import AppNavigator from "./src/navigations/AppNavigator";
import { AuthProvider } from "./src/contexts/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  async function checkUser() {
    const userJson = await AsyncStorage.getItem("user");

    const user = JSON.parse(userJson ?? "null");

    if (user === null) {
      setUser(null);
      setIsAuthenticated(false);
    } else {
      setUser(user);
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <NavigationContainer>
          <AuthProvider
            value={{
              isAuthenticated,
              setIsAuthenticated,
              isLoading,
              setIsLoading,
              user,
              setUser,
            }}
          >
            <RootSiblingParent>
              <AppNavigator />
            </RootSiblingParent>
          </AuthProvider>
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
}

export default App;
