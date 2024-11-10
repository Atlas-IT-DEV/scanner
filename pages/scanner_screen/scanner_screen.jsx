import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import Header from "../../components/header/header";
import BotMessage from "../../components/messages/bot_message";
import { SvgXml } from "react-native-svg";
import { man } from "../../images/images";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useStores } from "../../store/store_context";

const ScannerScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [uniqCategories, setUniqCategories] = useState([]);
  const { pageStore } = useStores();

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await fetch(
        "https://orion-lab.tech:8010/products/?dirs=true",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setProducts(result);

      const uniqueCategories = [
        ...new Set(result.map((item) => item.category)),
      ];
      setUniqCategories(uniqueCategories);
    };
    getAllProducts();
  }, []);
  console.log(uniqCategories);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ImageBackground
        source={require("./../../images/chat_container.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%", display: "flex", zIndex: -1 }}
      >
        <ScrollView style={{ marginTop: 80 }}>
          <View style={{ marginTop: 20 }}>
            <BotMessage />
          </View>
          <SvgXml xml={man} style={styles.man} />
        </ScrollView>
        <ScrollView
          horizontal
          style={{
            width: "100%",
            position: "absolute",
            left: 0,
            bottom: 120,
            zIndex: 100,
            flexDirection: "row",
            paddingHorizontal: 16,
          }}
        >
          {uniqCategories.map((item) => {
            console.log(item);
            return (
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>
                  {item == "upperbody"
                    ? "Верхняя одежда"
                    : item == "dress"
                    ? "Платье"
                    : null}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>

      <BottomMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "relative",
  },
  man: {
    marginTop: 45,
    alignSelf: "center",
  },
  categoryButton: {
    backgroundColor: "rgba(18, 145, 137, 1)",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: "RalewayMedium",
    color: "white",
  },
});

export default ScannerScreen;
