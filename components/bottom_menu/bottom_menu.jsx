import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import {
  menu_inact_bm,
  messenger_inact_bm,
  profile_act_bm,
  scanner_chat_inact_bm,
} from "../../images/images";
import { useNavigation } from "@react-navigation/native";

const BottomMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <SvgXml xml={messenger_inact_bm} />
        <Text style={[styles.buttonText, styles.inactiveText]}>Чаты</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ScannerScreen")}
      >
        <SvgXml xml={scanner_chat_inact_bm} />
        <Text style={[styles.buttonText, styles.inactiveText]}>3D-сканер</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.activeButton]}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <SvgXml xml={profile_act_bm} />
        <Text style={[styles.buttonText, styles.activeText]}>Профиль</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <SvgXml xml={menu_inact_bm} />
        <Text style={[styles.buttonText, styles.inactiveText]}>Меню</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 100,
    backgroundColor: "white",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    gap: 2,
    alignItems: "center",
    width: 76,
    height: 60,
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "RalewaySemiBold",
    fontSize: 12,
    color: "",
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "rgba(154, 155, 177, 1)",
  },
  activeButton: {
    backgroundColor: "rgba(18, 145, 137, 1)",
  },
});

export default BottomMenu;
