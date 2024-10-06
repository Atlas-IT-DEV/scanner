import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { penIcon } from "../../images/images";
import GestureRecognizer from "react-native-swipe-gestures";
import EditProfileForm from "../forms/edit_profile_form";

const EditModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <SvgXml xml={penIcon} />
        <Text style={styles.editButtonText}>Редактировать профиль</Text>
      </TouchableOpacity>
      {modalVisible && (
        <GestureRecognizer
          style={{ flex: 1 }}
          onSwipeUp={() => setModalVisible(true)}
          onSwipeDown={() => setModalVisible(false)}
        >
          <Modal animationType="slide" presentationStyle="formSheet">
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
              <View style={styles.swipeLine} />
              <Text style={styles.editProffileText}>Редактировать профиль</Text>
              <View style={styles.formView}>
                <EditProfileForm />
              </View>

              <View style={styles.buttonsView}>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonCloseText}>Выйти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSave}>
                  <Text style={styles.buttonSaveText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        </GestureRecognizer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "rgba(11, 124, 118, 1)",
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    borderRadius: 8,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "RalewayMedium",
  },
  swipeLine: {
    width: "30%",
    height: 4,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  editProffileText: {
    marginTop: 17,
    alignSelf: "center",
    color: "rgba(41, 41, 41, 1)",
    fontSize: 16,
    fontFamily: "RalewayMedium",
  },
  dataView: {
    marginTop: 15,
    gap: 15,
    marginHorizontal: 24,
  },
  dataField: {
    gap: 7,
  },
  InputView: {
    height: 45,
    borderColor: "rgba(208, 209, 219, 1)",
    borderWidth: 1,
    borderRadius: 8,
  },
  formView: {
    marginTop: 15,
  },
  buttonsView: {
    flexDirection: "row",
    gap: 22,
    marginTop: 50,
    paddingHorizontal: 24,
  },
  buttonClose: {
    height: 57,
    backgroundColor: "rgba(236, 249, 255, 1)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 27,
    flex: 1,
  },
  buttonSave: {
    height: 57,
    backgroundColor: "rgba(19, 174, 165, 1)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 27,
    flex: 1,
  },
  buttonCloseText: {
    color: "rgba(11, 124, 118, 1)",
    fontSize: 16,
    fontFamily: "RalewayMedium",
  },
  buttonSaveText: {
    color: "white",
    fontSize: 16,
    fontFamily: "RalewayMedium",
  },
});

export default EditModal;
