// app/GameContext.tsx
//Importacones-----------------------------------------------------------------------------------------------------------------------
import { useRouter } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CATEGORIAS_DISPONIBLES, CategoryItem } from './Impostor/DataBaseCategorias';
//Importacones-----------------------------------------------------------------------------------------------------------------------

//Constantes Globales----------------------------------------------------------------------------------------------------------------

const LIMITES_POR_JUEGO = {
  impostor: { minPlayers: 4, maxPlayers: 12 },
  masomenos: { minPlayers: 3, maxPlayers: 10 },
}


export const MIN_JUGADORES = 3; 
export const MAX_JUGADORES = 15; 
export const MIN_IMPOSTORES = 1;

export interface Player {
  id: number;
  name: string;
}

export class Jugador{
  id: number;
  name: string;
  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}

export class JugadorMasOMenos extends Jugador {
  puntuacion: number;
  valorAsignado: number;
  constructor(id: number, name: string, puntuacion: number, valorAsignado: number){
    super(id, name);
    this.puntuacion = puntuacion;
    this.valorAsignado = valorAsignado;
  }
}



// 1. Definir la forma de los datos. Declarar las Variables y funciones que se van a compartir
interface GameContextType {
    totalJugadores: number;
    totalImpostores: number;
    currentPlayer: number; //indice del jugador actual
    impostorIDs: number[];
    crewmateKeyword: string; // palabra del tripulante (JUEGO IMPOSTOR)  
    
    JuegoElegido: string; 
    setJuegoElegido: React.Dispatch<React.SetStateAction<string>>;
    handleStartGame: () => void;//EN BASE AL JUEGO ELEGIDO, LLAMA A LA FUNCIÓN CORRESPONDIENTE PARA INICIAR EL JUEGO
    handleStartGameImpostor: () => void; // Funcion para Preparar las variables e iniciar el juego (JUEGO IMPOSTOR)
    handleStartGameMasOMenos: () => void;// función para Preparar las variables e iniciar el juego (JUEGO IMPOSTOR)
    handleNextPlayer: () => void; // función para pasar al siguiente jugador (JUEGO IMPOSTOR)
    MAX_IMPOSTORES: number; //(JUEGO IMPOSTOR)

    handleIncrementJugadores: () => boolean //FUUNCIONES DE MANEJO DE CANTIDAD DE JUGADORES
    handleDecrementJugadores: () => boolean; //FUUNCIONES DE MANEJO DE CANTIDAD DE JUGADORES
    handleIncrementImpostores: () => boolean; //FUUNCIONES DE MANEJO DE CANTIDAD DE JUGADORES (SOLO JUEGO IMPOSTOR)
    handleDecrementImpostores: () => boolean; //FUUNCIONES DE MANEJO DE CANTIDAD DE JUGADORES (SOLO JUEGO IMPOSTOR)

    players: Jugador[]; //Lista de jugadores con sus nombres
    renombraPlayer: (id: number, nombre: string) => void; //Función para renombrar jugadores del arreglo players
    eliminados: number[]; //Lista de jugadores eliminados (JUEGO IMPOSTOR)
    eliminar: (playerId: number) => void; //Función para agregar un jugador a la lista de eliminados (JUEGO IMPOSTOR)

    resetGame: () => void; //Función para resetear el juego manteniendo las variables de juego (JUEGO IMPOSTOR)
    handleGoTo: () => void; //Función para navegar al menú correspondiente según el juego elegido

    CATEGORIAS_LISTA: CategoryItem[]; //Lista de categorías disponibles
    categoriasElegidas: string[];    //Palabras de las categorías seleccionadas (JUEGO IMPOSTOR)
    setCategoriasElegidas: React.Dispatch<React.SetStateAction<string[]>>; //Setter de categorías seleccionadas (JUEGO IMPOSTOR)
    nombreCategoriasElegidas: string[];  //Nombres de las categorías seleccionadas
    setNombreCategoriasElegidas: React.Dispatch<React.SetStateAction<string[]>>; //Setter de nombres de categorías seleccionadas (JUEGO IMPOSTOR)

    faseJuego: string;              //Fase actual del juego (JUEGO IMPOSTOR)
    handleCategoriaClick: (nombreCategoria: string) => void; //Función para manejar la selección de categorías (JUEGO IMPOSTOR)
    comenzarJuego: () => void;      //Función para comenzar el juego después de la selección de categorías (JUEGO IMPOSTOR. INNECESARIO PARA OTROS MODOS)

    //---------------------------------------------------------Variables y funciones para Mas o Menos 
    RondaActual: number;
  }

//------------------------- Provider y Contexto -------------------------
const GameContext = createContext<GameContextType | undefined>(undefined);

// 2. Proveedor (Provider)
interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const router = useRouter();

  // DECLARACIÓN DE ESTADOS, VARIABLES Y SUS SETTERS -------------------------------------------------
    const [totalJugadores, setTotalJugadores] = useState(MIN_JUGADORES);
    const [totalImpostores, setTotalImpostores] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [impostorIDs, setImpostorIDs] = useState<number[]>([]);
    const [categoriasElegidas, setCategoriasElegidas] = useState<string[]>([]);
    const [nombreCategoriasElegidas, setNombreCategoriasElegidas] = useState<string[]>([]);
    const [crewmateKeyword, setCrewmateKeyword] = useState<string>(categoriasElegidas[0]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [eliminados, setEliminados] = useState<number[]>([]);
    const [JuegoElegido, setJuegoElegido] = useState<string>(' ');

    const [faseJuego, setFaseJuego] = useState('seleccion');// 'seleccion', 'jugando'


    // Use effect para inicializar el arreglo de players cada vez que cambia totalJugadores
    useEffect(() => {
        setPlayers(prevPlayers => {
            const newPlayers: Player[] = [];
            for (let i = 1; i <= totalJugadores; i++) {
                const existingPlayer = prevPlayers.find(p => p.id === i);
                if (existingPlayer) {
                    newPlayers.push(existingPlayer);
                } else {
                    newPlayers.push({ id: i, name: `` });
                }
            }
            return newPlayers;
        });
    }, [totalJugadores]);

    // Use effect para inicializar categorías por defecto si no hay ninguna elegida
    useEffect(() => {
    if (categoriasElegidas.length === 0 && CATEGORIAS_DISPONIBLES.length >= 2) {
        const porDefecto = CATEGORIAS_DISPONIBLES[0].items.concat(CATEGORIAS_DISPONIBLES[1].items);
        // Solo establecemos el estado si realmente las categorías están vacías
        setCategoriasElegidas(porDefecto);
    }
}, [categoriasElegidas]);

//----------------- FUNCIONES DEL CONTEXTO -----------------

    const resetGame = () => {
        // Resetea todos los estados a sus valores iniciales Excepto players y categoriasElegidas
        setCurrentPlayer(1);
        setImpostorIDs([]);
        setCrewmateKeyword(categoriasElegidas[0]);
        setEliminados([]);
    };


    //Agrega un jugador a la lista de eliminados (en la práctica marca que fue eliminado)
    const eliminar = (playerId: number) => {
      setEliminados(prev => [...prev, playerId]);
    }

    const renombraPlayer = (id: number, nombre: string) => {
    setPlayers(prev => 
      prev.map(p => p.id === id ? { ...p, name: nombre } : p)
      );
    }

  // CONSTANTE DERIVADA
    const MAX_IMPOSTORES = Math.max(1, Math.floor(totalJugadores / 3));

    //Función para navegar al menú correspondiente según el juego elegido
    const handleGoTo = () => {
      if (JuegoElegido === "impostor"){
        router.push("/Impostor/MenuImpostor");
      }
      if (JuegoElegido === "masomenos"){
        router.push("/MenuDeEleccion");
      }
    };



  // --- FUNCIÓN DE INICIO DEL IMPOSTOR (Se llama desde index.tsx) ---
    const handleStartGameImpostor = () => {
        const randomIndex = Math.floor(Math.random() * categoriasElegidas.length); 
        setCrewmateKeyword(categoriasElegidas[randomIndex]); // Asigna la palabra seleccionada al estado
        // 1. Inicializa y asigna el impostor

        const playerIDs = players.map(p => p.id);
        const shuffledPlayers = playerIDs.sort(() => 0.5 - Math.random());
        const selectedImpostorIDs = shuffledPlayers.slice(0, totalImpostores);

        setImpostorIDs(selectedImpostorIDs);
        setCurrentPlayer(1);
        // Navega a la pantalla donde comienza la asignación de roles
        router.push("/Impostor/Tarjetas");
        
    };
    const handleStartGameMasOMenos = () => {
      //router.push("/MasOMenos");
    };

    const handleStartGame = () => {
      if (JuegoElegido === "impostor"){
        handleStartGameImpostor();
      }
      if (JuegoElegido === "masomenos"){
        handleStartGameMasOMenos();
      }
    }
    
      //funciones de manejo de variables pasan a devolver bools para activar animaciones
      const handleIncrementJugadores = (): boolean => {
        const prev = totalJugadores;
        const nuevoTotal = Math.min(prev + 1, MAX_JUGADORES);
        if (prev === nuevoTotal) return false; 
        setTotalJugadores(nuevoTotal);
        return true; 
      }

      const handleDecrementJugadores = (): boolean => {
          const nuevoTotal = Math.max(totalJugadores - 1, MIN_JUGADORES);
          if (nuevoTotal === totalJugadores) return false;

          setTotalJugadores(nuevoTotal);          
          const nuevoMax = Math.max(MIN_IMPOSTORES, Math.floor(nuevoTotal / 3));
          if (totalImpostores > nuevoMax) 
              setTotalImpostores(nuevoMax);
          return true
      }

      const handleDecrementImpostores = (): boolean => {
        if (totalImpostores > MIN_IMPOSTORES) {
          setTotalImpostores(totalImpostores - 1);
          return true
        }
        return false
      }

      const handleIncrementImpostores = (): boolean => {
        if (totalImpostores < MAX_IMPOSTORES) {
          setTotalImpostores(totalImpostores + 1);
          return true
        }
        return false
      }

  // --- FUNCIÓN DE AVANCE (Se llama desde tarjeta.tsx) ---
    const handleNextPlayer = () => {
    const nextPlayer = currentPlayer + 1;
    
    
    // 3. Condición de Fin de Asignación (Fase 3)
    if (nextPlayer > totalJugadores) {
      setCurrentPlayer(0); // Reinicia para seguridad
      router.push("/Impostor/tablero"); // Navega a la pantalla final
    return;
    }
    // 2. Avanzar al siguiente jugador
    setCurrentPlayer(nextPlayer);
    };

    const handleCategoriaClick = (nombreCategoria: string) => {
      
    }

    const comenzarJuego = () => {
      setFaseJuego('jugando');
      router.push('/Impostor/Tarjetas');
    }

    return (
        <GameContext.Provider value={{
            //Lista de variables y funciones a compartir con el resto de la app   
            totalJugadores,
            totalImpostores,
            currentPlayer,
            handleGoTo,
            handleStartGame,
            handleStartGameImpostor,
            handleStartGameMasOMenos,
            handleNextPlayer,
            impostorIDs,
            crewmateKeyword,
            MAX_IMPOSTORES,
            handleIncrementJugadores,
            handleDecrementJugadores,
            handleIncrementImpostores,
            handleDecrementImpostores,
            players,
            renombraPlayer,
            eliminados,
            eliminar,
            resetGame,
            JuegoElegido,
            setJuegoElegido,
            CATEGORIAS_LISTA: CATEGORIAS_DISPONIBLES, 
            categoriasElegidas, //Valores dentro de las categorías seleccionadas
            setCategoriasElegidas,
            nombreCategoriasElegidas,  //Nombres de las categorías seleccionadas
            setNombreCategoriasElegidas,
            faseJuego,
            handleCategoriaClick,
            comenzarJuego,
            RondaActual: 0,
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