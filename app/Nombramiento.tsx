// app/Nombramiento.tsx
import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useGame } from './GameContext';


export default function NombramientoScreen() {
    
    // Obtenemos todo lo que necesitamos del contexto
    const { 
        players, 
        renombraPlayer, 
        handleStartGame // <-- ¡Usamos la MISMA función que el Menú!
    } = useGame();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>¿Quiénes juegan?</Text>
            
            {players.map((player) => (
                <View key={player.id} style={styles.playerRow}>
                    <TextInput
                        style={styles.input}
                        value={player.name}
                        onChangeText={(newName) => {
                            renombraPlayer(player.id, newName);
                        }}
                    />
                </View>
            ))}

            <View style={styles.buttonContainer}>
                {/* ESTE ES EL BOTÓN "JUGAR" */}
                <Button
                    title="Repartir Cartas"
                    onPress={handleStartGame} // Llama a la lógica del contexto
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

container: {
        flex: 1,
        backgroundColor: '#121212', // Un fondo oscuro
    },
    // Contenedor del Scroll
    scrollContent: {
        paddingHorizontal: 20, // Espacio a los lados
        paddingVertical: 30, // Espacio arriba y abajo
    },
    // Título principal
    title: {
        paddingTop: 100,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30, // Espacio debajo del título
    },
    // Fila para cada jugador
    playerRow: {
        marginBottom: 15, // Espacio entre cada input
    },
    // El input para el nombre
    input: {
        backgroundColor: '#252525', // Fondo del input (gris oscuro)
        color: '#FFFFFF',          // Color del texto (blanco)
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,          // Bordes redondeados
        borderWidth: 1,
        borderColor: '#444444',    // Borde sutil
    },
    // Contenedor para el botón de jugar
    buttonContainer: {
        marginTop: 20, // Espacio arriba del botón
        backgroundColor: '#007AFF', // Fondo azul (estilo Apple) para el botón
        borderRadius: 10,
        overflow: 'hidden', // Para que el color de fondo respete el borderRadius en Android
    },
});
