import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useForm } from "react-hook-form";
import {
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
}

const FormService: React.FC<FormServiceProps> = (props) => {
  const { item, onSubmit } = props;
  const { control, handleSubmit } = useForm();

  const onHandleSubmit = (data: any) => {
    onSubmit(item.id, data);
  };

  return (
    <View style={styles.cardWrap} key={item.id}>
      <TextNormal bold color="white">
        {item.title}
      </TextNormal>
      {item.fields.map((it: any) => (
        <Fields key={it.id} {...it} control={control} />
      ))}
      <TouchableOpacity onPress={handleSubmit(onHandleSubmit)}>
        <LinearGradient
          colors={["#1E96FC", "#072AC8"]}
          style={styles.cardContainer}
        >
          <Text style={styles.text1}>Edit</Text>
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
