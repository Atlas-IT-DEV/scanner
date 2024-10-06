import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SvgXml } from "react-native-svg";
import {
  continueButtonActive,
  continueButtonInactive,
  userIcon,
} from "../../images/images";
import { useNavigation } from "@react-navigation/native";

const nameValidationSchema = Yup.object().shape({
  nameProfile: Yup.string().required("Введите имя"),
});

const BioForm = () => {
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{ nameProfile: "" }}
      validationSchema={nameValidationSchema}
      onSubmit={(values) => {
        navigation.navigate("ProfileScreen");
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
            <SvgXml
              xml={
                errors.nameProfile
                  ? continueButtonInactive
                  : continueButtonActive
              }
            />
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

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
