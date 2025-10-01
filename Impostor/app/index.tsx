import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native'; 
import { useGame } from './GameContext';

  const MIN_JUGADORES = 5;
  const MAX_JUGADORES = 12; // Máximo fijo para jugadores
  const MIN_IMPOSTORES = 1;


export default function App() {
    // 1. OBTENER ESTADO Y SETTERS DEL CONTEXTO
    const { 
        totalJugadores, 
        setTotalJugadores, 
        totalImpostores, 
        setTotalImpostores, 
        handleStartGame // Función centralizada para iniciar el juego
    } = useGame();

  const MAX_IMPOSTORES = Math.max(1, Math.floor(totalJugadores / 3));

  const handleIncrementJugadores = () => {
        setTotalJugadores(prev => Math.min(prev + 1, MAX_JUGADORES));
  };
  const handleDecrementJugadores = () => {
    const valorJugadoresFinal = Math.max(totalJugadores - 1, MIN_JUGADORES);
    if (valorJugadoresFinal === totalJugadores) {
      return; // No hay cambio
    }
    // Ajusta el número de impostores si es necesario
    const nuevoMaximoImpostores = Math.max(3, Math.floor(valorJugadoresFinal / 3));
    if (totalImpostores > nuevoMaximoImpostores) {
      setTotalImpostores(nuevoMaximoImpostores);
    }
    return valorJugadoresFinal;
  };
  const handleIncrementImpostores = () => {
    if (totalImpostores < MAX_IMPOSTORES) {
      setTotalImpostores(totalImpostores + 1);
    }
  }
  const handleDecrementImpostores = () => {
    if (totalImpostores > MIN_IMPOSTORES) {
      setTotalImpostores(totalImpostores - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>titulo</Text>
      <View style={styles.barraBotones}>
        <Text style={styles.letras}>jugadores {totalJugadores}</Text>
        <Pressable onPress={handleDecrementJugadores}>
        <Text style={styles.boton}>-</Text>
        </Pressable>
        <Pressable onPress={handleIncrementJugadores}>
        <Text style={styles.boton}>+</Text>
        </Pressable>
      </View>
      <View style={styles.barraBotones}>
        <Text style={styles.letras}>impostores {totalImpostores}</Text>
        <Pressable onPress={handleDecrementImpostores}>
        <Text style={styles.boton}>-</Text>
        </Pressable>
        <Pressable onPress={handleIncrementImpostores}>
        <Text style={styles.boton}>+</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
      <Text style={styles.letrass}>jugaran {totalJugadores} personas con {totalImpostores} impostores </Text>

      <Pressable onPress={handleStartGame}>
        <Text style={styles.letras}>JUGAR</Text>
      </Pressable>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e0c46ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: 50,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'thin',
    marginBottom: 40,
  },
  letras: {
    color: '#e2e2e2ff',
    fontSize: 20,
    fontWeight: 'thin',
    paddingTop: 10,
    position: 'static',
  },
  letrass: {
    color: '#FF0000',
    fontSize: 20,
    fontWeight: 'thin',
    paddingTop: 40,
    position: 'static',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
    gap: 20,
  },
  barraBotones: {
    color: '#FFFFFF',
    fontSize: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
    gap: 20,
    paddingTop: 10,
  },
  boton: {
    width: 50,
    height: 50,
    color: '#d4d4d4ff',
    fontSize: 15,
    fontWeight: 'thin',
    paddingTop: 12,
    textAlign: 'center',
    margin: 10,
    marginLeft: 30,
    borderRadius: 100,
    backgroundColor: '#107bccff',
    },
});