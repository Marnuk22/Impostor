    import React, { useState } from 'react';
    import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
    import { CATEGORIAS_DISPONIBLES, CategoryItem } from './DataBaseCategorias';
    import { Background } from '@react-navigation/elements';
    import { useGame } from '../GameContext';
    import { router } from 'expo-router';

    // Pantalla de selección de categorías


    export default function CategorySelector() {
            const { 
                handleStartGame,
                setCategoriasElegidas,
                categoriasElegidas,
            } = useGame();
            
            const handleSaveAndGoBack = () => {
            if (categoriasElegidas.length === 0) {
                alert('¡Debes seleccionar al menos una categoría!');
                return;
            }
            router.push("/Impostor/MenuImpostor");
        };

        const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
        
        const handleCategoryPress = (category: CategoryItem) => {
            const isSelected = selectedCategoryIds.includes(category.id);
            const newSelectedIds = isSelected
                ? selectedCategoryIds.filter(id => id !== category.id)
                : [...selectedCategoryIds, category.id];
            setSelectedCategoryIds(newSelectedIds);
            const newGameItemsSet = new Set<string>();
            newSelectedIds.forEach(id => {
            // Debes buscar los objetos CategoryItem originales
            const selectedCategory = CATEGORIAS_DISPONIBLES.find(c => c.id === id); 
            if (selectedCategory) {
                selectedCategory.items.forEach(item => newGameItemsSet.add(item));
            }
        });
        setCategoriasElegidas(Array.from(newGameItemsSet));
    }

        return (<View>
                <Text style={{fontWeight: 'bold'}}>Selecciona Categorías: </Text>
                {CATEGORIAS_DISPONIBLES.map(category => {
                    const isSelected = selectedCategoryIds.includes(category.id);
                    return (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => handleCategoryPress(category)}
                            // Agrega estilos aquí para mostrar si está seleccionado
                        >
                            <Text style= {{paddingTop: 10, backgroundColor: '#fca4a4ff', margin: 5, marginRight: 1200}}>{category.nombre}</Text>
                        </TouchableOpacity>
                    );
                })}
                <Text>Elementos del Juego: {categoriasElegidas.join(', ')}</Text>
                <Button
                                    title="Repartir Cartas"
                                    onPress={handleStartGame} 
                                />
                <Button
                                    title="Volver y Guardar"
                                    onPress={handleSaveAndGoBack} 
                                />
            </View>
            
        );
    }
