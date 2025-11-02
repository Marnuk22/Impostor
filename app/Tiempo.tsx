import React, { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';

const INITIAL_TIME_SECONDS = 5 * 60;
const RADIUS = 160;
const STROKE_WIDTH = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function FinDelJuegoScreen() {
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_SECONDS);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        startTimeRef.current = Date.now();

        Animated.timing(animatedValue, {
        toValue: 1,
        duration: INITIAL_TIME_SECONDS * 1000,
        useNativeDriver: false,
        }).start();

        const interval = setInterval(() => {
        if (!startTimeRef.current) return;

        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const remaining = Math.max(INITIAL_TIME_SECONDS - elapsed, 0);
        setTimeLeft(remaining);

        if (remaining <= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [CIRCUMFERENCE, 0],
    });

    return (
        <LinearGradient colors={['#312b2bff', '#750c0cff', '#220000ff']} style={styles.container}>
        {/* Timer circular */}
        <View style={styles.timerContainer}>
            <Svg height={RADIUS * 2 + STROKE_WIDTH * 2} width={RADIUS * 2 + STROKE_WIDTH * 2}>
            {/* Fondo */}
            <Circle
                stroke="#000000"
                fill="none"
                cx={RADIUS + STROKE_WIDTH}
                cy={RADIUS + STROKE_WIDTH}
                r={RADIUS}
                strokeWidth={STROKE_WIDTH}
            />
            {/* Progreso */}
            <AnimatedCircle
                stroke={timeLeft <= 30 ? '#FF5555' : '#FFFFFF'}
                fill="none"
                cx={RADIUS + STROKE_WIDTH}
                cy={RADIUS + STROKE_WIDTH}
                r={RADIUS}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                originX={RADIUS + STROKE_WIDTH}
                originY={RADIUS + STROKE_WIDTH}
            />
            </Svg>
            <View style={styles.timerTextContainer}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
        </View>

        <View style={{ flex: 0.4 }} />

        <Pressable onPress={() => router.push('/Menu')} style={styles.botonContainer}>
            <Text style={styles.botonTexto}>VOLVER A JUGAR</Text>
        </Pressable>
        <View style={{ height: 20 }} />
        </LinearGradient>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    timerContainer: {
        width: (RADIUS + STROKE_WIDTH) * 2,
        height: (RADIUS + STROKE_WIDTH) * 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -250,
        marginTop: 120,
    },

    timerTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },

    timerText: {
        fontSize: 95,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },

    botonContainer: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderColor: '#000000',
        borderWidth: 3,
        alignItems: 'center',
        marginTop: 390,
    },

    botonTexto: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
});
