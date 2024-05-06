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
  TouchableOpacity
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import IconButton from "../components/iconButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddFundTransferScreen: React.FC = ({ navigation, route }: any) => {
  const { AccountName, AccountNumber, BankName, Content } = route.params.details;
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
          <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Add Fund</Text>
              <Text
                style={[
                  styles.textTitle,
                  {
                    fontSize: RFPercentage(2.3),
                    marginTop: 5,
                  },
                ]}
              >
                By Bank Transfer
              </Text>
              <Text
                style={[
                  styles.textTitle,
                  { fontSize: RFPercentage(1.5), marginTop: 5 },
                ]}
              >
                Please transfer the desired amount from your bank account to our
                bank account as follows:
              </Text>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Account holder:</Text>
              <Text selectable style={styles.input}>
                  {AccountName}
              </Text>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Account Number:</Text>
              <Text selectable style={styles.input}>
                  {AccountNumber}
              </Text>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Routing number:</Text>
              <Text selectable style={styles.input}>
              </Text>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Bank Name:</Text>
              <Text selectable style={styles.input}>
                  {BankName}
              </Text>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Swift:</Text>
              <Text selectable style={styles.input}>
              </Text>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Ref:</Text>
              <Text selectable style={styles.input}>
                  {Content}
              </Text>
            </View>
            <View
              style={[
                styles.textContainer,
                { marginTop: 50, marginBottom: 30 },
              ]}
            >
              <Text style={[styles.textTitle, { fontSize: RFPercentage(1.8) }]}>
                Once received, the funds will be added to your wallet.
              </Text>
            </View>
            <View style={{ marginTop: windowHeight / 50 }}>
              <TouchableOpacity
              onPress={() => navigation.navigate("GlobalAccount")}
                style={{
                  backgroundColor: "#1E96FC",
                  padding: 10,
                  borderRadius: 20,
                  // position: "absolute",
                  marginTop: 10,
                  justifyContent: "center",
                  alignSelf: "center",
                  width: "100%",
                  zIndex:11,
                }}
              >
                <Text style={{ color: "#ffffff", textAlign: "center" }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
        </ScrollView>
    </View>
  );
};

export default AddFundTransferScreen;

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
    color:"rgba(255,255,255,0.8)",
    paddingVertical:3
  },
});
