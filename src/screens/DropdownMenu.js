// DropdownMenu.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

// Obtén el ancho de la pantalla
const { width } = Dimensions.get("window");

const DropdownMenu = ({ visible, onClose, onDetailsPress, onQuestionsPress, onFinishPress }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const menuTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.menuContainer,
        { width: width * 0.5, transform: [{ translateY: menuTranslateY }] },
      ]}
    >
      <TouchableOpacity style={styles.menuItem} onPress={onDetailsPress}>
        <Text style={styles.menuItemText}>Ver detalles de preguntas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onQuestionsPress}>
        <Text style={styles.menuItemText}>Todas las preguntas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.finishButton} onPress={onFinishPress}>
        <Text style={styles.finishButtonText}>Finalizar Examen</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 85,
    right: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuItemText: {
    fontSize: 16,
    color: "#1C1D32",
    fontWeight: "500",
  },
  finishButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f44336",
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: "center",
  },
  finishButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});

export default DropdownMenu;
