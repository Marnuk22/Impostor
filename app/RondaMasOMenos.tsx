import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useGame } from "./GameContext";
export default function App() {
const {
    totalJugadores,
    handleIncrementJugadores,
    handleDecrementJugadores,
    
} = useGame();


}