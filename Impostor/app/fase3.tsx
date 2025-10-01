// app/fase3.tsx

import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function FinDelJuegoScreen() {
    return (
        <View style={styles.container}>
            
            {/* Contenido principal centrado */}
            <View style={styles.contentContainer}>
                <Text style={styles.titulo}>FIN DEL JUEGO</Text>
                <Text style={styles.subTitulo}>¡Comienza la discusión!</Text>
            </View>

            {/* 🪄 El espaciador empuja el botón hacia la parte inferior */}
            <View style={{ flex: 0.12 }} />
            
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
});