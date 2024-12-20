import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SvgXml } from "react-native-svg";
import { arrow, userIcon } from "../../images/images";
import { useNavigation } from "@react-navigation/native";
import pageStore from "../../store/page_store";

import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const nameValidationSchema = Yup.object().shape({
  nameProfile: Yup.string().required("Введите имя"),
});

const BioForm = observer(() => {
  const navigation = useNavigation();
  const { pageStore } = useStores();
  console.log("Номер телефона:", pageStore.phoneNumber);
  return (
    <Formik
      initialValues={{ nameProfile: "" }}
      validationSchema={nameValidationSchema}
      onSubmit={(values) => {
        console.log(values);
        if (values.nameProfile.split(" ").length == 2) {
          navigation.navigate("TabScreen");
          pageStore.updateUserName(values.nameProfile);
        } else {
          Alert.alert("Введите имя и фамилию через пробел!");
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        handleBlur,
      }) => (
        <>
          <View style={styles.nameView}>
            <SvgXml xml={userIcon} />
            <TextInput
              keyboardType="default"
              placeholder="Ваше имя"
              placeholderTextColor={"rgba(156, 156, 156, 1)"}
              onChangeText={handleChange("nameProfile")}
              onBlur={handleBlur("nameProfile")}
              value={values.nameProfile}
              style={styles.nameInput}
            />
          </View>
          {touched.nameProfile && errors.nameProfile && (
            <Text style={{ color: "red" }}>{errors.nameProfile}</Text>
          )}
          <TouchableOpacity
            disabled={errors.nameProfile ? true : false}
            onPress={handleSubmit}
            style={{ marginTop: 22, alignItems: "flex-end" }}
          >
            {errors.nameProfile ? (
              <View
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  backgroundColor: "#129189",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0.4,
                }}
              >
                <SvgXml xml={arrow} />
              </View>
            ) : (
              <View
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  backgroundColor: "#129189",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SvgXml xml={arrow} />
              </View>
            )}
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
});

const styles = StyleSheet.create({
  nameView: {
    marginTop: 22,
    paddingVertical: 14,
    borderBottomColor: "rgba(95, 95, 95, 1)",
    borderBottomWidth: 2.75,
    flexDirection: "row",
    gap: 15,
  },
  nameInput: {
    color: "rgba(95, 95, 95, 1)",
    fontSize: 22,
    backgroundColor: "white",
    flex: 1,
  },
});

export default BioForm;
