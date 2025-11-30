import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {Animated,ImageBackground,Pressable,StyleSheet,Text,View,ScrollView,Platform} from 'react-native';
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

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const jugadorActual = players.find(p => p.id === currentPlayer);
  const nombreJugador = jugadorActual?.name ?? `Jugador ${currentPlayer}`;

  const isImpostor = impostorIDs.includes(currentPlayer);

  const rolText = isImpostor ? `¡Eres el Impostor!` : `${crewmateKeyword}`;

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: FLIP_DURATION,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setIsFlipped(false));
  }, [currentPlayer]);

  const Container = Platform.OS === "web" ? ScrollView : View;
  const containerProps =
    Platform.OS === "web"
      ? { contentContainerStyle: styles.container }
      : { style: styles.container };

  return (
    <LinearGradient
      colors={['#0f0f0f', '#1a1a1a']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <Container {...containerProps}>

        <Pressable onPress={flipCard} style={styles.cardWrapper}>

          {/* FRENTE */}
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
                {jugadorActual?.name || `Jugador ${jugadorActual?.id}`}
              </Text>

              <Text style={styles.subInfo}>
                {`${currentPlayer}/${totalJugadores}`}
              </Text>
            </ImageBackground>
          </Animated.View>

          {/* DORSO */}
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

        <Pressable style={styles.button} onPress={flipCard}>
          <Text style={styles.buttonText}>VER</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleNextPlayer}>
          <Text style={styles.buttonText}>SIGUIENTE</Text>
        </Pressable>

      </Container>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  cardWrapper: {
    width: 350,
    height: 540,
    marginBottom: 5,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: 350,
    height: 540,
    backgroundColor: '#333',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },

  subInfo: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 35,
    color: '#ffffff',
  },

  button: {
    padding: 15,
    marginBottom: -17,
  },

  buttonText: {
    padding: 12,
    width: 200,
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
