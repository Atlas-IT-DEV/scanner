import { StyleSheet, Text, View } from "react-native";

const BotMessage = ({ message }) => {
  let time = new Date();
  let hour = `${
    time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
  }:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}`;
  return (
    <View style={styles.container}>
      <Text style={styles.botText}>Выберите тип одежды</Text>
      <Text style={styles.timeText}>{hour}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 203,
    backgroundColor: "white",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft: 24,
  },
  botText: {
    fontSize: 16,
    fontFamily: "RalewayRegular",
    color: "rgba(44, 45, 58, 1)",
  },
  timeText: {
    color: "rgba(208, 209, 219, 1)",
    fontSize: 12,
    fontFamily: "RalewayMedium",
    marginTop: 7,
  },
});

export default BotMessage;
