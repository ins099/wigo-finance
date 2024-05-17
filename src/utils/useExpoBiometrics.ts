import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const useExpoBiometrics = () => {
  const [type, setType] = useState<null | string>(null);
  const [isFeature, setFeature] = useState(false);

  React.useEffect(() => {
    (async () => {
      await checkEnrolledBiometrics();
    })();
  }, []);

  const checkHardware = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert(
        "No hardware",
        "This device does not have the necessary hardware for biometric authentication."
      );
      setType(null);
      return null;
    }

    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (
      supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      )
    ) {
      console.log("Face ID is supported");
      setType("face-id");
      return "face-id";
    } else if (
      supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FINGERPRINT
      )
    ) {
      console.log("Fingerprint is supported");
      setType("fingerprint");
      return "fingerprint";
    }
  };

  const checkEnrolledBiometrics = async () => {
    let isHardware = await checkHardware();
    if (!isHardware) {
      return;
    }
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      setFeature(false);
      return;
    }
    setFeature(true);
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        Alert.alert("Success", "Authentication successful");
        return true;
      } else {
        Alert.alert("Failed", "Authentication failed");
        return false;
      }
    } catch (error) {
      console.error("Authentication error", error);
      return false;
    }
  };

  return {
    type,
    isFeature,
    authenticate,
  };
};
