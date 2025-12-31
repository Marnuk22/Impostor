import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGame } from '../GameContext';
//Muestra un listado de los jugadores y al presionar en cada uno revela su rol
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
        router.push('./MenuImpostor');
    };

    return (
        <LinearGradient
            colors={['#1a0033', '#000000']}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.titulo}>Resumen Del Juego</Text>

                <View style={styles.grid}>
                    {players.map((player) => {
                        const isEliminated = eliminados.includes(player.id);
                        const esImpostor = impostorIDs.includes(player.id);

                        return (
                            <Pressable
                                key={player.id}
                                onPress={() => eliminar(player.id)}
                                style={[
                                    styles.playerBox,
                                    isEliminated && (esImpostor ? styles.playerImpostor : styles.playerCrewmate)
                                ]}
                            >
                                <Text style={styles.playerName}> {player.name ? player.name : `jugador ${player.id}`}</Text>

                                {isEliminated && (
                                    <Text style={styles.playerRole}>
                                        {esImpostor ? "IMPOSTOR" : "INOCENTE"}
                                    </Text>
                                )}
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.restartButtonContainer}>
                    <Pressable style={styles.button} onPress={handleReinicio}>
                        <Text style={styles.buttonText}>Volver Al Menú</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingBottom: 80,
        alignItems: "center",
    },

    titulo: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
        marginBottom: 25,
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingHorizontal: 10,
        gap: 10,
    },

    playerBox: { 
        width: 150,
        height: 120,
        backgroundColor: '#000000',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 5,
    },

    playerImpostor: {
        backgroundColor: '#d80707ff',
        opacity: 0.90,
    },

    playerCrewmate: {
        backgroundColor: '#07701cff',
        opacity: 0.90,
    },

    playerName: { 
        color: '#ffffff',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },

    playerRole: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 6,
    },

    restartButtonContainer: {
        marginTop: 40,
        marginBottom: 60,
        alignItems: "center",
    },

    button: {
        padding: 15,
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
