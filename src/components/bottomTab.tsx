import React from "react";
import { Dimensions, Image, View } from "react-native";

const windowWidth = Dimensions.get("window").width;

export function BottomTab() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 10,
        width: windowWidth,
        // height: 50,
        backgroundColor: "rgba(250, 250, 250, 0.1)s",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
      }}
    >
      <Image
        source={require("./../assets/images/Home.png")}
        alt="Home"
        resizeMode="contain"
      />
      <Image
        source={require("./../assets/images/Crypto.png")}
        alt="Crypto"
        resizeMode="contain"
      />
      <Image
        source={require("./../assets/images/Invest.png")}
        alt="Invest"
        resizeMode="contain"
      />
      <Image
        source={require("./../assets/images/Services.png")}
        alt="Services"
        resizeMode="contain"
      />
      <Image
        source={require("./../assets/images/Community.png")}
        alt="Community"
        resizeMode="contain"
      />
      <Image
        source={require("./../assets/images/Media.png")}
        alt="Media"
        resizeMode="contain"
      />
    </View>
  );
}
