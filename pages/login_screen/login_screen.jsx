import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { background } from "../../images/images";

const LoginScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}
    >
      <SvgXml xml={background} width={windowWidth} style={styles.backgound} />
      <Text>Hello</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  backgound: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default LoginScreen;
