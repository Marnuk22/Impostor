// app/index.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGame } from './GameContext';

export default function PaginaDeInicio() {
    const { 
        JuegoElegido,
        setJuegoElegido,
        handleGoTo
    } = useGame();
return (
    <View style={styles.container}>
        <Pressable onPress={() => setJuegoElegido("impostor")} style={styles.botonera}>
            <Text style={styles.texto}>Impostor</Text>
        </Pressable>
        <Pressable onPress={() => handleGoTo()} style={styles.relleno}>
            <Text style={styles.texto}>Juugar {JuegoElegido}</Text>
        </Pressable>
        <Pressable onPress={() => setJuegoElegido("masomenos")} style={styles.botonera}>
            <Text style={styles.texto}>Mas o Menos (proximamente) {JuegoElegido}</Text>
        </Pressable>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
},
texto: {
    fontSize: 18,
    color: '#ad0505ff',
},
relleno: {
    backgroundColor: '#333',
    padding: 25,
},
botonera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 5,
},
});