// app/index.tsx
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from './GameContext';

export default function PaginaDeInicio() {
    const { 
        setJuegoElegido,
        handleGoTo
    } = useGame();

    return (
        <LinearGradient
            colors={['#0f0f0f', '#1a1a1a']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >

            <Text style={styles.tituloPrincipal}>ELEGIR UNO</Text>

            {/* BOTÓN JUEGO IMPOSTOR */}
            <Pressable 
                onPress={() => {
                    setJuegoElegido("impostor");
                    handleGoTo();
                }} 
                style={styles.boton}
            >
                <Text style={styles.botonTexto}>IMPOSTOR</Text>
            </Pressable>

            {/* BOTÓN MÁS O MENOS (DESACTIVADO) */}
            <Pressable 
                onPress={() => {}}
                style={styles.botonDesactivado}
            >
                <Text style={styles.botonTextoDisabled}>
                    MAS O MENOS (Proximamente...)
                </Text>
            </Pressable>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
},

tituloPrincipal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 60,
    letterSpacing: 2,
},

// ---------- BOTONES ACTIVOS ----------
boton: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 90,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginBottom: 30,
},

botonTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
},

// ---------- BOTÓN DESACTIVADO ----------
botonDesactivado: {
    backgroundColor: '#2b2b2b',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#555',
},

botonTextoDisabled: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
    textAlign: 'center',
},
});
