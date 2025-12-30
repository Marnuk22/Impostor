import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useGame } from './GameContext';
import { router } from "expo-router";

export default function NombramientoScreen() {
    
    const { 
        players, 
        renombraPlayer, 
        handleStartGame 
    } = useGame();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>¿Quiénes juegan?</Text>
            
            {players.map((player) => (
                <View key={player.id} style={styles.playerRow}>
                    <TextInput
                        style={styles.input}
                        defaultValue={player.name}
                        value={player.name === "" ? undefined : player.name} 
                        placeholder="Ingresar nombre..."
                        placeholderTextColor="#777"
                        onChangeText={(newName) => {
                            renombraPlayer(player.id, newName);
                        }}
                    />
                </View>
            ))}

            {/* BOTÓN REPARTIR CARTAS */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Repartir Cartas"
                    onPress={handleStartGame} 
                />
            </View>

            {/* BOTÓN VOLVER AL MENÚ */}
            <View style={[styles.buttonContainer, { marginTop: 10 }]}>
                <Button
                    title="Volver al Menú"
                    color="#ff0000ff"
                    onPress={() => router.push("/MenuImpostor")}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#121212', 
    },

    scrollContent: {
        paddingHorizontal: 20, 
        paddingVertical: 30, 
    },

    title: {
        paddingTop: 100,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30, 
    },

    playerRow: {
        marginBottom: 15, 
    },

    input: {
        backgroundColor: '#252525', 
        color: '#FFFFFF',
        width: 360,
        marginLeft: 13,          
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,          
        borderWidth: 1,
        borderColor: '#444444',   
    },

    buttonContainer: {
        marginTop: 20,
        backgroundColor: '#ff0000ff', 
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 20
    },
});
