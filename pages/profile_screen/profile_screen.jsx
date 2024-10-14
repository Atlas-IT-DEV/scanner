import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { avatar, bg4, copyIcon, logoutIcon } from "../../images/images";
import EditModal from "../../components/modals/edit_modal";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ name_profile = "Имя Фамилия" }) => {
  const windowWidth = Dimensions.get("window").width;
  console.log(windowWidth);
  const navigation = useNavigation()
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}
    >
      <SvgXml
        xml={bg4}
        width={windowWidth}
        height={150}
        style={styles.header}
      />
      <TouchableOpacity style={styles.avatar}>
        <Image
          source={{ uri: "https://reactjs.org/logo-og.png" }}
          style={{ width: 146, height: 146, borderRadius: 100 }}
        />
      </TouchableOpacity>
      <View style={styles.mainInfo}>
        <Text style={styles.nameText}>{name_profile}</Text>
        <View style={styles.dataProfile}>
          <View style={styles.dataField}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.attributeField}>Телефон:</Text>
              <Text style={styles.valueField}>(+7) 000 000 00 00</Text>
            </View>
            <TouchableOpacity>
              <SvgXml xml={copyIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.dataField}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.attributeField}>Пол:</Text>
              <Text style={styles.valueField}>Мужской</Text>
            </View>
            <TouchableOpacity>
              <SvgXml xml={copyIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.dataField}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.attributeField}>Дата рождения:</Text>
              <Text style={styles.valueField}>12/01/1997</Text>
            </View>
            <TouchableOpacity>
              <SvgXml xml={copyIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.dataField}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.attributeField}>Email:</Text>
              <Text style={styles.valueField}>name.family@mail.ru</Text>
            </View>
            <TouchableOpacity>
              <SvgXml xml={copyIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonsView}>
        <EditModal />
        <TouchableOpacity style={styles.buttonLogout} onPress={() => navigation.navigate("LoginScreen")}>
          <SvgXml xml={logoutIcon} />
          <Text style={styles.logOutText}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    zIndex: 1,
    position: "absolute",
    right: 0,
    top: 0,
  },
  avatar: {
    marginTop: 150,
    alignItems: "center",
  },
  mainInfo: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  nameText: {
    alignSelf: "center",
    fontFamily: "RalewaySemiBold",
    fontSize: 20,
    color: "rgba(44, 45, 58, 1)",
  },
  dataProfile: {
    marginTop: 30,
    gap: 15,
  },
  dataField: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  attributeField: {
    color: "rgba(104, 106, 138, 1)",
    fontFamily: "RalewayRegular",
    fontSize: 16,
  },
  valueField: {
    color: "rgba(44, 45, 58, 1)",
    fontFamily: "RalewayRegular",
    fontSize: 16,
  },

  buttonsView: {
    marginHorizontal: 30,
    marginTop: 15,
    gap: 15,
  },
  buttonLogout: {
    backgroundColor: "rgba(254, 236, 235, 1)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    borderRadius: 8,
  },
  logOutText: {
    color: "rgba(246, 105, 94, 1)",
    fontSize: 16,
    fontFamily: "RalewayMedium",
  },
});
export default ProfileScreen;
