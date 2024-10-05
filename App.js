// import { StyleSheet,  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import RegistrationScreen from "./pages/registration_screen/registration_screen";
import LoginScreen from "./pages/login_screen/login_screen";
import ValidationScreen from "./pages/validation_screen/validation_screen";
import BioScreen from "./pages/bio_screen/bio_screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"), //400
    RalewayMedium: require("./assets/fonts/Raleway-Medium.ttf"), //500
    RalewaySemiBold: require("./assets/fonts/Raleway-SemiBold.ttf"), //600
    RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"), //700
  });
  return (
    <NavigationContainer>
      {/* <RootStoreContext.Provider value={new RootStore()}> */}
      {fontsLoaded && (
        <>
          <Stack.Navigator
            initialRouteName="RegistrationScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen
              name="ValidationScreen"
              component={ValidationScreen}
            />
            <Stack.Screen name="BioScreen" component={BioScreen} />
          </Stack.Navigator>
        </>
      )}
      {/* </RootStoreContext.Provider> */}
    </NavigationContainer>
  );
}
