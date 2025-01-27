import React from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";

const Loading = () => {
  return (
    <View style={styles.Load}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  Load: {
    width: width,
    height: height,
    backgroundColor: '#7cdaf9',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Loading;
