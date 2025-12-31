import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORIAS_DISPONIBLES, CategoryItem } from './DataBaseCategorias';
import { useGame } from '../GameContext';
import { router } from 'expo-router';

export default function CategorySelector() {

    const { 
        handleStartGame,
        setCategoriasElegidas,
        categoriasElegidas
    } = useGame();

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleSaveAndGoBack = () => {
        if (categoriasElegidas.length === 0) {
            alert('¡Debes seleccionar al menos una categoría!');
            return;
        }
        router.back();
    };

    const handleCategoryPress = (category: CategoryItem) => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true })
        ]).start();

        const isSelected = selectedCategoryIds.includes(category.id);
        const newSelectedIds = isSelected
            ? selectedCategoryIds.filter(id => id !== category.id)
            : [...selectedCategoryIds, category.id];

        setSelectedCategoryIds(newSelectedIds);

        const newGameItemsSet = new Set<string>();
        newSelectedIds.forEach(id => {
            const selectedCategory = CATEGORIAS_DISPONIBLES.find(c => c.id === id);
            if (selectedCategory) {
                selectedCategory.items.forEach(item => newGameItemsSet.add(item));
            }
        });

        setCategoriasElegidas(Array.from(newGameItemsSet));
    };

    return (
        <LinearGradient
            colors={['#0f0f0f', '#1a1a1a']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.container}>
                
                <Text style={styles.title}>Selecciona Las Categorías</Text>

                <ScrollView contentContainerStyle={styles.grid}>
                    {CATEGORIAS_DISPONIBLES.map(category => {
                        const isSelected = selectedCategoryIds.includes(category.id);

                        return (
                            <TouchableOpacity key={category.id} onPress={() => handleCategoryPress(category)}>
                                <View style={[styles.cardContainer, isSelected && styles.cardSelected]}>
                                    <ImageBackground
                                        source={category.imagen}
                                        style={styles.imageBackground}
                                        imageStyle={styles.imageBackgroundImage}
                                    >
                                        <Text style={styles.cardText}>
                                            {isSelected ? "✔ " : ""}{category.nombre}
                                        </Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.btnPrimary} onPress={handleStartGame}>
                        <Text style={styles.btnText}>Repartir Cartas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSecondary} onPress={handleSaveAndGoBack}>
                        <Text style={styles.btnText}>Guardar y Volver</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#fff"
    },

    grid: {
        paddingBottom: 120,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    cardContainer: {
        borderWidth: 3,
        borderColor: "#FFFFFF",
        borderRadius: 14,
        overflow: "hidden",
        margin: 20,
    },

    cardSelected: {
        borderColor: "#00d11cff",
        borderWidth: 4,
    },

    imageBackground: {
        height: 320,
        width: 320,
        justifyContent: "center",
        alignItems: "center",
    },

    imageBackgroundImage: {
        borderRadius: 14,
        opacity: 0.35,
    },

    cardText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        paddingHorizontal: 5
    },

    bottomButtons: {
        position: "absolute",
        bottom: 25,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around"
    },

    btnPrimary: {
        backgroundColor: "#ff5555",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
    },

    btnSecondary: {
        backgroundColor: "#5578ff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: "40%",

    },

    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    }
});
