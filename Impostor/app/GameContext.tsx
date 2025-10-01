// app/GameContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'expo-router';


const MIN_JUGADORES = 4; 
const MAX_JUGADORES = 12; 
const MIN_IMPOSTORES = 1;

// Lista de palabras/roles para los tripulantes
const KEYWORDS: string[] = [
    "Ingeniero", 
    "Botánico", 
    "Astrónomo", 
    "Científico", 
    "Médico", 
    "Chef", 
    "Mecánico",
    "Piloto"
];

// 1. Definir la forma de los datos
interface GameContextType {
    totalJugadores: number;
    setTotalJugadores: React.Dispatch<React.SetStateAction<number>>;
    totalImpostores: number;
    setTotalImpostores: React.Dispatch<React.SetStateAction<number>>;
    currentPlayer: number;
    impostorIDs: number[];       
    crewmateKeyword: string;
    handleStartGame: () => void;
    handleNextPlayer: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// 2. Proveedor (Provider)
interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const router = useRouter();

  // ESTADOS CENTRALIZADOS
    const [totalJugadores, setTotalJugadores] = useState(MIN_JUGADORES);
    const [totalImpostores, setTotalImpostores] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [impostorIDs, setImpostorIDs] = useState<number[]>([]);
    const [crewmateKeyword, setCrewmateKeyword] = useState<string>(KEYWORDS[0]);

  // --- FUNCIÓN DE INICIO (Se llama desde index.tsx) ---
    const handleStartGame = () => {
      const randomIndex = Math.floor(Math.random() * KEYWORDS.length); 
      setCrewmateKeyword(KEYWORDS[randomIndex]); // Asigna la palabra seleccionada al estado
      // 1. Inicializa y asigna el impostor
      const allPlayers = Array.from({ length: totalJugadores }, (_, i) => i + 1);
      const shuffledPlayers = allPlayers.sort(() => 0.5 - Math.random());
      const selectedImpostorIDs = shuffledPlayers.slice(0, totalImpostores);

      setImpostorIDs(selectedImpostorIDs);
      setCurrentPlayer(1);
    
      // Navega a la pantalla donde comienza la asignación de roles
      router.push("/tarjeta");
    };

  // --- FUNCIÓN DE AVANCE (Se llama desde tarjeta.tsx) ---
    const handleNextPlayer = () => {
    const nextPlayer = currentPlayer + 1;
    
    // 3. Condición de Fin de Asignación (Fase 3)
    if (nextPlayer > totalJugadores) {
      setCurrentPlayer(0); // Reinicia para seguridad
      router.push("/"); // Navega a la pantalla final
    return;
    }

    // 2. Avanzar al siguiente jugador
    setCurrentPlayer(nextPlayer);
    };

    return (
        <GameContext.Provider value={{
            totalJugadores,
            setTotalJugadores,
            totalImpostores,
            setTotalImpostores,
            currentPlayer,
            handleStartGame,
            handleNextPlayer,
            impostorIDs,
            crewmateKeyword,
        }}>
            {children}
        </GameContext.Provider>
    );
};

// 3. Hook para usar el Contexto
export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
    }
    return context;
};