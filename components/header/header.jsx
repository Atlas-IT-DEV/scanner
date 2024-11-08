import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { arrow_back, dots_menu } from "../../images/images";

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <SvgXml xml={arrow_back} />
      </TouchableOpacity>
      <Text style={styles.headerText}>3D-сканер</Text>
      <TouchableOpacity style={styles.button}>
        <SvgXml xml={dots_menu} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    position: "absolute",
    left: 0,
    top: 20,
    backgroundColor: "white",
    zIndex: 9999,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontFamily: "RalewaySemiBold",
  },
});

export default Header;
