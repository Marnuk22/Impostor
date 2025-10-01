// app/fase3.tsx
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';


const INITIAL_TIME_SECONDS = 5 * 60; // 5 minutos en segundos
const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};

export default function FinDelJuegoScreen() {
    // 1. Estado para la cuenta regresiva
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_SECONDS);
    const [isRunning, setIsRunning] = useState(true);
    // 2. Lógica del cronómetro con useEffect
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) {
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Limpieza: Detiene el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [timeLeft, isRunning]);

    // 3. Detener cuando el tiempo llega a 0
    useEffect(() => {
        if (timeLeft === 0) {
            setIsRunning(false);
            // Aquí puedes agregar lógica adicional, como una vibración o un sonido
        }
    }, [timeLeft]);


    return (
        <View style={styles.container}>
            {/* Contenido principal centrado */}
            <View style={styles.contentContainer}>
                <Text style={styles.titulo}>FIN DEL JUEGO</Text>
                <Text style={styles.subTitulo}>¡Comienza la discusión!</Text>
            </View>
            
            <Text 
                style={[
                    styles.timer, 
                    timeLeft <= 30 && styles.timerDanger // Rojo si quedan 30 segundos
                ]}
            >
                {formatTime(timeLeft)}
            </Text>
            <View style={{ flex: 0.40 }} />
            
            
            {/* Botón de navegación */}
            <Pressable onPress={() => router.push('/')} style={styles.botonContainer}>
                <Text style={styles.botonTexto}>VOLVER A JUGAR</Text>
            </Pressable>
            
            {/* Margen final para que no se pegue al borde */}
            <View style={{ height: 20 }} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e0c46ff',
        alignItems: 'center',
        padding: 20,
    },
    // Contenedor para asegurar que el título y subtítulo se centren verticalmente
    contentContainer: {
        flex: 1, // Le damos espacio para que se centre a sí mismo
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        color: '#FFD700',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitulo: {
        color: '#e2e2e2ff',
        fontSize: 20,
        fontWeight: 'thin',
    },
    // Estilo que envuelve el texto del botón (para darle fondo y padding)
    botonContainer: {
        backgroundColor: '#107bccff', // Fondo azul del botón
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        minWidth: 200,
        alignItems: 'center',
    },
    // Estilo del texto dentro del botón
    botonTexto: {
        color: '#e2e2e2ff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    timer: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 40,
        marginBottom: 30,
    },
    timerDanger: {
        color: '#FF4444', // Rojo
    },
});