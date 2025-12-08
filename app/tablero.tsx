import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useGame } from './GameContext';

// Muestra un listado de los jugadores y al presionar en cada uno revela su rol
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
        router.push('/MenuImpostor');
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
                                <ImageBackground
                                    source={require('../assets/icon.png')}
                                    style={styles.imageBackground}
                                    imageStyle={{ borderRadius: 10 }}
                                >
                                    {/* Overlay solo cuando está eliminado */}
                                    {isEliminated && (
                                        <View style={[
                                            styles.overlay,
                                            esImpostor ? styles.overlayImpostor : styles.overlayCrewmate
                                        ]} />
                                    )}

                                    <Text style={styles.playerName}>
                                        {player.name ? player.name : `jugador ${player.id}`}
                                    </Text>

                                    {isEliminated && (
                                        <Text style={styles.playerRole}>
                                            {esImpostor ? "IMPOSTOR" : "INOCENTE"}
                                        </Text>
                                    )}
                                </ImageBackground>

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
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
        margin: 5,
        backgroundColor: '#000000',
    },

    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        borderRadius: 10,
    },

    overlayImpostor: {
        backgroundColor: 'rgba(255, 0, 0, 0.45)',
    },

    overlayCrewmate: {
        backgroundColor: 'rgba(0, 255, 100, 0.45)',
    },

    playerImpostor: {
        borderColor: '#ffffff',
    },

    playerCrewmate: {
        borderColor: '#ffffff',
    },

    playerName: { 
        color: '#ffffff',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: '#000',
        textShadowRadius: 3,
        textShadowOffset: { width: 2.5, height: 3 },
    },

    playerRole: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 6,
        textShadowColor: '#000000',
        textShadowRadius: 3,
        textShadowOffset: { width: 2.5, height: 3 },
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
