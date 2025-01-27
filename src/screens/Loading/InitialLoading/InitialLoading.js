import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import fotocarga from '../../../../assets/icon.jpg';

function InitialLoading() {
  const shineAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true, // Animamos transformaciones
      })
    ).start();
  }, [shineAnim]);

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.imageLoad} source={fotocarga} />
        <Animated.View 
          style={[
            styles.overlay,
            {
              transform: [
                {
                  translateX: shineAnim.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-Dimensions.get('window').width, Dimensions.get('window').width], // Movimiento diagonal
                  }),
                },
                {
                  translateY: shineAnim.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-Dimensions.get('window').height, Dimensions.get('window').height], // Movimiento diagonal
                  }),
                },
                {
                  rotate: '45deg', // Rotar el cuadro para que pase en diagonal
                },
              ],
            },
          ]}
        >
          <View style={styles.shine} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '55%', 
    height: '55%', 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageLoad: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    width: '200%', // Asegura que el brillo cubra toda la imagen diagonalmente
    height: '200%',
  },
  shine: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Color y opacidad del brillo
  },
});

export default InitialLoading;
