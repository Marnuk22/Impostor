import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useGame } from './GameContext';

const FLIP_DURATION = 500;

export default function SlidingCard() {
  const {
    totalJugadores,
    currentPlayer,
    impostorIDs,
    crewmateKeyword,
    handleNextPlayer,
    players,
  } = useGame();

  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  // Interpolaciones del flip
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  
  const jugadorActual = players.find(p => p.id === currentPlayer);
  const nombreDelJugador = jugadorActual?.name ?? `Jugador ${currentPlayer}`;
  const isImpostor = impostorIDs.includes(currentPlayer);
  const rolText = isImpostor ? "¡Eres el Impostor!" : `${crewmateKeyword}`;

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: FLIP_DURATION,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  // Reinicia la carta al pasar de jugador
  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setIsFlipped(false));
  }, [currentPlayer]);

  return (
    <LinearGradient
      colors={['#312b2bff', '#750c0cff', '#5a0a0aff']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>

        {/* TARJETA INTERACTIVA */}
        <Pressable onPress={flipCard}>
          {/* LADO FRONTAL */}
          <Animated.View
            style={[
              styles.card,
              { transform: [{ rotateY: frontInterpolate }] },
            ]}
          >
            <ImageBackground
              source={require('../assets/images.png')} 
              style={styles.cardBackground}
              imageStyle={{ opacity: 0.15 }}
            >
              <Text style={styles.cardText}>
                {nombreDelJugador.toUpperCase()} ({currentPlayer}/{totalJugadores})
              </Text>
            </ImageBackground>
          </Animated.View>

          {/* LADO POSTERIOR */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <ImageBackground
              source={require('../assets/images.png')}
              style={styles.cardBackground}
              imageStyle={{ opacity: 0.1 }}
            >
              <Text style={styles.cardText}>{rolText}</Text>
            </ImageBackground>
          </Animated.View>
        </Pressable>

        {/* BOTÓN SIGUIENTE */}
        <Pressable style={styles.button} onPress={handleNextPlayer}>
          <Text style={styles.buttonText}>SIGUIENTE</Text>
        </Pressable>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: 350,
    height: 540,
    backgroundColor: '#555',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    left: -175,
  },

  cardBack: {
    backgroundColor: '#7a2f2f',
  },

  cardBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  button: {
    marginTop: 550,
    padding: 15,
  },

  buttonText: {
    padding: 10,
    width: 150,
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    color: '#FFF',
    backgroundColor: '#000000',
    fontWeight: 'bold',
  },
});
