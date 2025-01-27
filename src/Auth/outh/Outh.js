import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

export const Logout = async (navigation) => {
  try {
    await AsyncStorage.clear();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });

    console.log("AsyncStorage cleared successfully");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
