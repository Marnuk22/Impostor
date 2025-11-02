import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGame } from './GameContext';



export default function FinDelJuegoTabla() {
    const { 
        players,
        eliminados,
        eliminar,
        impostorIDs,
        resetGame
    } = useGame();

    const handleReinicio = () => {
        resetGame();
        router.push('/Menu')
    }

    return(
    <ScrollView style={styles.container}>
        {/* 1. Llaves para entrar a modo JavaScript */}
    {players.map((player) => {
        const isEliminated = eliminados.includes(player.id);
        const esImpostor = impostorIDs.includes(player.id);
        return (
            <Pressable key={player.id} style={isEliminated ? styles.playerEliminated : styles.playerBox} onPress={() => eliminar(player.id)} disabled={isEliminated}>
                <Text style={styles.playerName}>{player.name}</Text>
                {isEliminated && (
                    <Text style={styles.playerRole}>
                        {esImpostor ? "Impostor" : "Tripulante"}
                    </Text>
                )}
            </Pressable>

        );

    })}

    <View style={styles.restartButtonContainer}>
        <Pressable style={styles.restartButton} onPress={handleReinicio}>
            <Text style={styles.restartButtonText}>Volver al Menú</Text>
        </Pressable>
    </View>

    </ScrollView>
    )
};

const styles = StyleSheet.create({
container:{
    flex: 1,
    paddingTop:150,
},
playerBox: { 
    padding: 15, 
    paddingTop:80,
    margin: 5, 
    backgroundColor: '#252525',
    borderRadius: 5,
},
playerName: { 
    color: 'white',
    fontSize: 16
},
playerEliminated: {
    padding: 15, 
    margin: 5, 
    backgroundColor: '#552222', // Fondo rojo
    borderRadius: 5,
    alignItems: 'center',
    opacity: 0.6,
    },
playerRole: {
    color: '#FFDDDD',
    fontSize: 12,
    marginTop: 5,
    },
restartButtonContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
    },
restartButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    },
restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    },
});