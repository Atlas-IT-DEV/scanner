import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomMenu from "../../components/bottom_menu/bottom_menu";

const ScannerScreen = () => {
  return (
    <>
      <ScrollView style={styles.container}></ScrollView>
      <BottomMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default ScannerScreen;
