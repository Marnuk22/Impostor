import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGame } from './GameContext';

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

  const handleIncrementJugadoresUI = () => {
    const succes = handleIncrementJugadores();
    if (succes){//aca va la animacion (me dio error al querer copiarla del Menu1)
    }
  };

  const handleDecrementJugadoresUI = () => {
    const succes = handleDecrementJugadores();
    if (succes) {//aca lo mismo que arriba
    }
  };
  const handleVolver = () =>{
    router.push("/")
  }

  return <View>
    <Text>ACA HACEMO EL SEGUNDO JUEGUITO</Text>
    <Text style={styles.etiqueta}>{totalJugadores}JUGADORES</Text>
      <View style={styles.botonera}>
        <Pressable onPress={handleDecrementJugadoresUI} style={styles.botonPress}>
        <Text style={styles.boton}>-</Text>
        </Pressable>
        <Pressable onPress={handleIncrementJugadoresUI} style={styles.botonPress}>
        <Text style={styles.boton}>+</Text>
        </Pressable>
        <Pressable onPress={handleVolver} style={styles.botonPress}>
        <Text style={styles.titulo}>PROXIMAMENTE (VOLVER)</Text>
        </Pressable>
    </View>
  </View>;
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
    width: '90%',
  },

  titulo: {
    color: '#8b2626ff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },

  etiqueta: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 15,
    marginBottom: 20,
    textAlign: 'center',
    width: "100%",
  },

  numero: {
    color: '#FFFFFF',
    fontSize: 56,
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
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 50,
  },

  textoJugar: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
