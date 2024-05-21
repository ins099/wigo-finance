import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { TextBig } from "./AppText";
import Button from "./button";

const SuccessPayment = ({onPressHome}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/successBack.png")}
      resizeMode="stretch"
    >
      <View style={{ flex: 1 }}>
        <View
          style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            source={require("../assets/images/thumbs.png")}
            style={{ height: 200, aspectRatio: 1, marginBottom: 20 }}
          />
          <TextBig bold color="white" center>
            Got It!
          </TextBig>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <Button title="Home" variant="blue" onPress={onPressHome} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SuccessPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#182561",
  },
});
