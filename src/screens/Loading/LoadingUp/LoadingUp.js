import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";

function LoadingUp() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2C24E9" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default LoadingUp;
