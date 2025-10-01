// app/tarjeta.tsx
import React, { useRef, useState, useEffect } from 'react'
import { Animated, StyleSheet, Text, View, Pressable } from 'react-native';
import { useGame } from './GameContext';


  const SLIDE_DISTANCE = -150;

  export default function SlidingCard() {
  // 1. Crear el valor animado: Mantiene el seguimiento de la posición.
    const{
    totalJugadores, 
    currentPlayer, 
    impostorIDs, 
    crewmateKeyword, 
    handleNextPlayer 
  } = useGame();

    const [isOpen, setIsOpen] = useState(false);
    const translateY = useRef(new Animated.Value(0)).current;
    const isImpostor = impostorIDs.includes(currentPlayer);
    const rolText = isImpostor ? "¡ERES EL IMPOSITOR!" : `${crewmateKeyword}`;

  useEffect(() => {
    // Si la tarjeta está abierta, la cerramos automáticamente.
    if (isOpen) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0, // Cierre instantáneo al cargar el siguiente jugador
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    }
  }, [currentPlayer]); // Se ejecuta cada vez que currentPlayer cambia

  // 3. Función de animación
  const toggleSlide = () => {
    const toValue = isOpen ? 0 : SLIDE_DISTANCE;
    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };
  const isLastPlayer = currentPlayer === totalJugadores;

  return (
    <View style={styles.container}>
      <View style={[styles.frontCard, styles.backCard]}>
        <Text style={styles.cardText}>{rolText}</Text>
      </View>

      <Animated.View
        style={[
          styles.backCard,
          styles.frontCard,
          { transform: [{ translateY }] },
        ]}
      >
        <Text style={styles.cardText}>jugador {currentPlayer} / {totalJugadores} </Text>
      </Animated.View>
      <View style={{ flex: 0.6 }} />{/* Espaciador para empujar el botón hacia abajo */}
      <Pressable onPress={toggleSlide} style={styles.button}>
        <Text style={styles.buttonText}>{isOpen ? 'Ocultar ROL' : 'Mostrar ROL'}</Text>
      </Pressable>
      <Pressable onPress={handleNextPlayer}>
        <Text style={styles.buttonText}>SIGUIENTE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 40,
    width: '80%',
    height: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  content: {
    textAlign: 'center',
    fontSize: 16,
  },
  cardText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
  },
  frontCard: {
    borderColor: '#000',
    borderWidth: 5,
    height: 300,
    width: 300,
    borderRadius: 20,
    marginTop: '10%',
    backgroundColor: '#999',
    position: 'absolute',
    top: 90,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCard: {
    backgroundColor: '#999',
    position: 'absolute',
    top: 90,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
    padding: 15,
  },
  buttonText: {
    padding: 10,
    width: 120,
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 10,
    color: '#FFF',
    backgroundColor: '#7a2f2fff',
    fontWeight: 'bold',
  },
});