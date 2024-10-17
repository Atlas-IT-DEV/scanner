import { View } from "react-native";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import ChatsScreen from "../chats_screen/chats_screen";
import ScannerScreen from "../scanner_screen/scanner_screen";
import ProfileScreen from "../profile_screen/profile_screen";
import MenuScreen from "../menu_screen/menu_screen";

const DetailsScreen = ({ route }) => {
  const contentType = route.params?.contentType;
  let content;

  console.log(contentType);

  switch (contentType) {
    case "chats":
      content = <ChatsScreen />;
      break;
    case "scanner":
      content = <ScannerScreen />;
      break;
    case "profile":
      content = <ProfileScreen />;
      break;
    case "menu":
      content = <MenuScreen />;
      break;
    default:
      content = <ProfileScreen />;
      break;
  }
  return <View style={{ flex: 1 }}>{content}</View>;
};

export default DetailsScreen;
