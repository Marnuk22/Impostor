// app/index.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGame } from './GameContext';
//Menu de inicio para el Impostor
export default function App() {
  const { 
    totalJugadores, 
    totalImpostores, 
    handleStartGame,
    handleDecrementJugadores,
    handleDecrementImpostores,
    handleIncrementImpostores,
    handleIncrementJugadores
  } = useGame();

  const MAX_IMPOSTORES = Math.max(1, Math.floor(totalJugadores / 3));

  // Animaciones
  const fadeTitulo = useRef(new Animated.Value(0)).current;
  const translateTitulo = useRef(new Animated.Value(-100)).current;
  const glowTitulo = useRef(new Animated.Value(0)).current;

  const fadeJugadores = useRef(new Animated.Value(0)).current;
  const fadeImpostores = useRef(new Animated.Value(0)).current;
  const scaleJugadores = useRef(new Animated.Value(1)).current;
  const scaleImpostores = useRef(new Animated.Value(1)).current;
  const pulseJugar = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateTitulo, { toValue: 0, friction: 7, tension: 50, useNativeDriver: true }),
      Animated.timing(fadeTitulo, { toValue: 1, duration: 2500, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowTitulo, { toValue: 1, duration: 800, useNativeDriver: false }),
        Animated.timing(glowTitulo, { toValue: 0, duration: 800, useNativeDriver: false }),
      ])
    ).start();

    Animated.stagger(200, [
      Animated.timing(fadeJugadores, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(fadeImpostores, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseJugar, { toValue: 1.05, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseJugar, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleRenombre = () => { 
      router.push("/Nombramiento") 
  }

  return (
    <LinearGradient colors={['#413f3fff', '#353434ff', '#000000']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>

          {/* TITULO */}
          <Animated.View style={[
            styles.cajaTitulo,
            { opacity: fadeTitulo, transform: [{ translateY: translateTitulo }] }
          ]}>
            <Animated.Text
              style={[
                styles.titulo,
                {
                  textShadowColor: glowTitulo.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#FFFFFF', '#FF0000'],
                  }),
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: glowTitulo.interpolate({
                    inputRange: [0, 1],
                    outputRange: [5, 20],
                  }),
                },
              ]}
            >
              IMPOSTOR
            </Animated.Text>
          </Animated.View>

          {/* JUGADORES */}
          <Text style={styles.etiqueta}>JUGADORES</Text>

          <View style={styles.botonera}>
            <Pressable onPress={handleDecrementJugadores} style={styles.botonPress}>
              <Text style={styles.boton}>-</Text>
            </Pressable>

            <Animated.Text style={[styles.numero, { transform: [{ scale: scaleJugadores }] }]}>
              {totalJugadores}
            </Animated.Text>

            <Pressable onPress={handleIncrementJugadores} style={styles.botonPress}>
              <Text style={styles.boton}>+</Text>
            </Pressable>
          </View>

          {/* IMPOSTORES */}
          <Text style={styles.etiqueta}>IMPOSTORES</Text>

          <View style={styles.botonera}>
            <Pressable onPress={handleDecrementImpostores} style={styles.botonPress}>
              <Text style={styles.boton}>-</Text>
            </Pressable>

            <Animated.Text style={[styles.numero, { transform: [{ scale: scaleImpostores }] }]}>
              {totalImpostores}
            </Animated.Text>

            <Pressable onPress={handleIncrementImpostores} style={styles.botonPress}>
              <Text style={styles.boton}>+</Text>
            </Pressable>
          </View>

          {/* INFO */}
          <Text style={styles.info}>
            JUGARAN {totalJugadores} PERSONAS CON {totalImpostores} IMPOSTORES.
          </Text>

          {/* --- BOTONES FINALES --- */}

          <Animated.View style={{ transform: [{ scale: pulseJugar }] }}>
            <Pressable onPress={handleStartGame} style={styles.botonJugar}>
              <Text style={styles.textoJugar}>JUGAR</Text>
            </Pressable>
          </Animated.View>

          <View style={styles.row}>

            <Animated.View style={{ transform: [{ scale: pulseJugar }] }}>
              <Pressable onPress={handleRenombre} style={styles.botonChico}>
                <Text style={styles.textoChico}>NOMBRES</Text>
              </Pressable>
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: pulseJugar }] }}>
              <Pressable onPress={handleRenombre} style={styles.botonChico}>
                <Text style={styles.textoChico}>CATEGORÍAS</Text>
              </Pressable>
            </Animated.View>

          </View>


          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  cajaTitulo: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 25,
    paddingHorizontal: 50,
    marginBottom: 50,
    borderRadius: 20,
    borderColor:'#ffffff',
    borderWidth: 3,
    elevation: 8,
    width: '90%',
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },

  etiqueta: {
    color: '#FFFFFF',
    marginTop: -10,
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 12,
    marginBottom: 20,
    textAlign: 'center',
    width: "100%",
  },

  numero: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -30,
  },

  botonera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 5,
  },

  botonPress: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30, 
  },

  boton: {
    width: 58,
    height: 58,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#000000ff',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  info: {
    color: '#cccccc',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    width: '97.5%',
  },

  botonJugar: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 40,
  },

  textoJugar: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: -10,
  },

  botonSmall: {
    paddingHorizontal: 30,
  },

  botonChico: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 20,
  },

  textoChico: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },

});
