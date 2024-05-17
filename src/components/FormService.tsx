import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextNormal } from "./AppText";
import Fields from "./Fields";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface FormServiceProps {
  item: any;
  onSubmit: (id: string, args: any) => void;
  defaultvals: any;
  walletLoading: boolean;
}

const FormService: React.FC<FormServiceProps> = (props) => {
  const { item, onSubmit, defaultvals, walletLoading } = props;
  const { control: accControl, handleSubmit: accSubmit } = useForm();
  const { control: addressControl, handleSubmit: addressSubmit } = useForm();
  const { control: personalControl, handleSubmit: personalSubmit } = useForm();

  const onHandleSubmit = () => {
    if (item.id == "address_detail") {
      addressSubmit((data) => onSubmit(item.id, data))();
    } else if (item.id == "account_detail") {
      accSubmit((data) => onSubmit(item.id, data))();
    } else {
      personalSubmit((data) => onSubmit(item.id, data))();
    }
  };
  return (
    <View style={styles.cardWrap} key={item.id}>
      <TextNormal bold color="white">
        {item.title}
      </TextNormal>
      {item.fields.map((it: any) => (
        <Fields
          key={it.id}
          {...it}
          control={
            item.id == "address_detail"
              ? addressControl
              : item.id == "account_detail"
              ? accControl
              : personalControl
          }
          defaultValue={defaultvals[it.name]}
        />
      ))}
      <TouchableOpacity onPress={onHandleSubmit} disabled={walletLoading}>
        <LinearGradient
          colors={["#1E96FC", "#072AC8"]}
          style={styles.cardContainer}
        >
          {walletLoading && item.id === "account_detail" ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.text1}>Edit</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default FormService;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: "100%",
    minHeight: 40,
    marginTop: 20,
    borderRadius: windowWidth / 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 25,
    marginLeft: windowWidth / 30,
  },

  cardWrap: {
    // width: windowWidth - windowWidth / 26,
    width: "99%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: windowWidth / 25,
    padding: windowWidth / 20,
    marginTop: windowHeight / 40,
  },
});
