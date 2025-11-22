import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useGame } from "./GameContext";
//Menu de inicio para el Segundo Juego (aun en proceso)
export default function App() {
  const {
    totalJugadores,
    totalImpostores,
    handleStartGame,
    handleDecrementJugadores,
    handleDecrementImpostores,
    handleIncrementImpostores,
    handleIncrementJugadores,
  } = useGame();

  const handleIncrementJugadoresUI = () => {
    const succes = handleIncrementJugadores();
  };

  const handleDecrementJugadoresUI = () => {
    const succes = handleDecrementJugadores();
  };

  const handleVolver = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>

      {/* TÍTULO */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>SEGUNDO JUEGUITO</Text>
      </View>

      {/* CONTADOR */}
      <Text style={styles.label}>{totalJugadores} JUGADORES</Text>

      {/* BOTONERA */}
      <View style={styles.botonera}>
        <Pressable onPress={handleDecrementJugadoresUI} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>-</Text>
        </Pressable>

        <Pressable onPress={handleIncrementJugadoresUI} style={styles.circleButton}>
          <Text style={styles.circleButtonText}>+</Text>
        </Pressable>
      </View>

      {/* VOLVER */}
      <Pressable onPress={handleVolver} style={styles.volverButton}>
        <Text style={styles.volverText}>PROXIMAMENTE (VOLVER)</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  /* CAJA DEL TÍTULO */
  headerBox: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 20,
    borderColor: "#FFF",
    borderWidth: 3,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },

  headerText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
  },

  label: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  botonera: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginBottom: 50,
  },

  /* BOTONES REDONDOS */
  circleButton: {
    width: 70,
    height: 70,
    backgroundColor: "#000",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },

  circleButtonText: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  /* BOTÓN VOLVER */
  volverButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#111",
  },

  volverText: {
    color: "#8b2626",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});
