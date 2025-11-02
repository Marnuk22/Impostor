// app/GameContext.tsx
import { useRouter } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export const MIN_JUGADORES = 4; 
export const MAX_JUGADORES = 12; 
export const MIN_IMPOSTORES = 1;

export interface Player {
  id: number;
  name: string;
}
// Lista de palabras/roles para los tripulantes
const KEYWORDS: string[] = [
    "Messi",
    "Maradona",
    "Ricardo Fort",
    "Coscu",
    "Duki",
    "Bizarrap",
    "Wos",
    "Trueno",
    "Khea",
    "Paulo Londra",
    "L-Gante",
    "Tini Stoessel",
    "Moria Casán",
    "Mirta Legrand",
    "Susana Giménez",
    "Tinelli",
    "Guido Kaczka",
    "Alf",
    "Homer",
    "Marge",
    "Bart",
    "Lisa",
    "Maggie",
    "Milhouse",
    "Ned Flanders",
    "Apu",
    "Mr. Burns",
    "Moe",
    "John Wick",
    "Neo",
    "Trinity",
    "Morpheus",
    "Marty McFly",
    "Doc Brown",
    "Biff Tannen",
    "Tony Montana",
    "Scarface",
    "Vito Corleone",
    "Michael Corleone",
    "Fredo Corleone",
    "Sonny Corleone",
    "Joker",
    "Batman",
    "Robin",
    "Alfred",
    "Bane",
    "Superman",
    "Wonder Woman",
    "Flash",
    "Aquaman",
    "Iron Man",
    "Captain America",
    "Hulk",
    "Thor",
    "Black Widow",
    "Spiderman",
    "Venom",
    "Deadpool",
    "Wolverine",
    "Magneto",
    "Professor X",
    "Shrek",
    "Burro",
    "Fiona",
    "Gato con Botas",
    "Buzz Lightyear",
    "Woody",
    "Andy (Toy Story)",
    "Sid",
    "Elsa",
    "Anna",
    "Olaf",
    "Sven",
    "Jack Sparrow",
    "Will Turner",
    "Elizabeth Swann",
    "Davy Jones",
    "Harry Potter",
    "Hermione Granger",
    "Ron Weasley",
    "Albus Dumbledore",
    "Severus Snape",
    "Lord Voldemort",
    "Gandalf",
    "Frodo",
    "Aragorn",
    "Legolas",
    "Gollum",
    "Sam",
    "Bilbo",
    "Thorin",
    "Smaug",
    "Rick Grimes",
    "Daryl",
    "Michonne",
    "Negan",
    "Walter White",
    "Jesse Pinkman",
    "Saul Goodman",
    "Gustavo Fring",
    "Don Cornelio",
    "Ricardo Iorio",
    "Pappo",
    "Charly García",
    "Fito Páez",
    "Spinetta",
    "Andrés Calamaro",
    "Gustavo Cerati",
    "Simba (El Rey León)",
    "Nala (El Rey León)",
    "Mufasa (El Rey León)",
    "Aladdín (Aladdín)",
    "Jazmín (Aladdín)",
    "Genio (Aladdín)",
    "Jafar (Aladdín)",
    "Peter Pan (Peter Pan)",
    "Campanita (Peter Pan)",
    "Capitán Garfio (Peter Pan)",
    "Winnie the Pooh ",
    "Piglet (Winnie the Pooh)",
    "Tigger (Winnie the Pooh)",
    "Eeyore (Winnie the Pooh)",
    "Pinocho (Pinocho)",
    "Geppetto (Pinocho)",
    "Dumbo (Dumbo)",
    "Timothy (Dumbo)",
    "Bambi (Bambi)",
    "Hada Azul (Pinocho)",
    "Aurora (La Bella Durmiente)",
    "Maléfica (La Bella Durmiente)",
    "Felipe (La Bella Durmiente)",
    "Cenicienta (Cenicienta)",
    "Hada Madrina (Cenicienta)",
    "Anastasia (Cenicienta)",
    "Ariel (La Sirenita)",
    "Sebastián (La Sirenita)",
    "Flounder (La Sirenita)",
    "Ursula (La Sirenita)",
    "Tarzán (Tarzán)",
    "Jane (Tarzán)",
    "Clayton (Tarzán)",
    "Tiana (La Princesa y el Sapo)",
    "Naveen (La Princesa y el Sapo)",
    "Doctor Facilier (La Princesa y el Sapo)",
    "Rapunzel (Enredados)",
    "Flynn Rider (Enredados)",
    "Maximus (Enredados)",
    "Gothel (Enredados)",
    "Ralph (Ralph el Demoledor)",
    "Vanellope (Ralph el Demoledor)",
    "Miguel (Coco)",
    "Héctor (Coco)",
    "Mama Coco",
    "Remy (Ratatouille)",
    "Linguini (Ratatouille)",
    "Colette (Ratatouille)",
    "Anton Ego (Ratatouille)",
    "Merida (Valiente)",
    "Rey Fergus (Valiente)",
    "Bolt (Bolt)",
    "Edward Elric (Fullmetal Alchemist)",
    "Alphonse Elric (Fullmetal Alchemist)",
    "Roy Mustang (Fullmetal Alchemist)",
    "Light Yagami (Death Note)",
    "L (Death Note)",
    "Misa Amane (Death Note)",
    "Near (Death Note)",
    "Yagami Soichiro (Death Note)",
    "Tanjiro Kamado (Demon Slayer)",
    "Nezuko Kamado (Demon Slayer)",
    "Zenitsu Agatsuma (Demon Slayer)",
    "Inosuke Hashibira (Demon Slayer)",
    "Gyu Tomioka (Demon Slayer)",
    "Eren Jaeger (Attack on Titan)",
    "Mikasa Ackerman (Attack on Titan)",
    "Armin Arlert (Attack on Titan)",
    "Levi Ackerman (Attack on Titan)",
    "Erwin Smith (Attack on Titan)",
    "Naruto Uzumaki (Naruto)",
    "Hinata Hyuga (Naruto)",
    "Gaara (Naruto)",
    "Jiraiya (Naruto)",
    "Sakura Haruno (Naruto)",
    "Ichigo Kurosaki (Bleach)",
    "Rukia Kuchiki (Bleach)",
    "Orihime Inoue (Bleach)",
    "Byakuya Kuchiki (Bleach)",
    "Kenpachi Zaraki (Bleach)",
    "Luffy (One Piece)",
    "Zoro (One Piece)",
    "Nami (One Piece)",
    "Sanji (One Piece)",
    "Chopper (One Piece)",
    "Robin (One Piece)",
    "Usopp (One Piece)",
    "Brook (One Piece)",
    "Franky (One Piece)",
    "Gon (Hunter x Hunter)",
    "Killua (Hunter x Hunter)",
    "Kurapika (Hunter x Hunter)",
    "ibai (influencer)",
    "AuronPlay (Influencer)",
    "Rubius (Influencer)",
    "Vegetta777 (Influencer)",
    "Willyrex (Influencer)",
    "German Garmendia (Influencer)",
    "JulioProfe (Influencer)",
    "Martin Sirio (La Faraona)",
    "Momo (Influencer Argentino)",
    "Marito Baracus (Influencer Argentino)",
    "Flor Vigna (Influencer)",
    "Nati Jota (Influencer)",
    "Lit Killah (Cantante/Influencer)",
    "Nicki Nicole (Cantante/Influencer)",
    "Cazzu (Cantante/Influencer)",
    "Tiago PZK (Cantante/Influencer)",
    "Ysy A (Cantante/Influencer)",
    "Coscu Army Kid (Influencer)",
    "Manu Ginobili (Influencer Deportivo)",
    "PewDiePie (Influencer)",
    "MrBeast (Influencer)",
    "Kai Cenat (Influencer)",
    "Speed (Influencer)",
    "Pokimane (Influencer)",
    "Amouranth (Influencer)",
    "El Rey León",
    "Aladdín",
    "La Sirenita",
    "La Bella Y La Bestia",
    "La Bella Durmiente",
    "Blanca Nieves Y Los Siete Enanos",
    "Pinocho",
    "Dumbo",
    "Bambi",
    "Cenicienta",
    "Peter Pan",
    "Winnie The Pooh",
    "La Dama Y El Vagabundo",
    "Los Aristogatos",
    "Robin Hood",
    "Taron Y El Caldero Mágico",
    "El Zorro Y El Sabueso",
    "Oliver Y Su Pandilla",
    "La Princesa Y El Sapo",
    "Enredados",
    "Valiente",
    "Frozen",
    "Moana",
    "Zootopia",
    "Intensamente",
    "Coco",
    "Soul",
    "Un Gran Dinosaurio",
    "Ratatouille",
    "Cars",
    "Buscando A Nemo",
    "Monsters Inc",
    "Toy Story",
    "Los Increíbles",
    "Up: Una Aventura De Altura",
    "Wall-E",
    "Unidos",
    "Elementos",
    "Luca",
    "Volver Al Futuro",
    "El Padrino",
    "Scarface",
    "El Caballero De La Noche",
    "El Hombre De Acero",
    "La Liga De La Justicia",
    "Mujer Maravilla",
    "Aquaman",
    "Linterna Verde",
    "Batman Inicia",
    "Joker",
    "Escuadrón Suicida",
    "Deadpool",
    "Logan",
    "X-Men",
    "Capitán América El Primer Vengador",
    "Iron Man",
    "Thor",
    "Guardianes De La Galaxia",
    "Avengers Los Vengadores",
    "Doctor Strange Hechicero Supremo",
    "Black Panther",
    "Spider-Man De Regreso A Casa",
    "Mi Vecino Totoro",
    "El Castillo Ambulante",
    "El Viaje De Chihiro",
    "La Princesa Mononoke",
    "Hollow Knight",
    "Celeste",
    "Stardew Valley",
    "Undertale",
    "Hades",
    "Dead Cells",
    "GTA San Andreas",
    "GTA V",
    "The Witcher 3",
    "Red Dead Redemption 2",
    "Cyberpunk 2077",
    "Assassin's Creed",
    "Minecraft",
    "Fortnite",
    "League Of Legends",
    "Counter Strike",
    "Goku",
    "Vegeta",
    "Piccolo",
    "Frieza",
    "Cell",
    "Majin Buu",
    "Naruto",
    "Sasuke",
    "Sakura",
    "Kakashi",
    "Jiraiya",
    "Ichigo",
    "Davo",
    "La Cobra",
    "CJ",
    "Tommy Vercetti",
    "Niko Bellic",
    "Kratos",
    "Atreus",
    "Zeus",
    "Play 2",
    "PES 06",
    "Resident Evil 4",
    "Silent Hill",
    "Metal Gear Solid",
    "Final Fantasy VII",
    "Macri",
    "Gravity Falls",
    "Steven Universe",
    "Hora De Aventura",
    "Un Show Más",
    "Regular Show",
    "Clarence",
    "Los Padrinos Mágicos",
    "Bob Esponja",
    "Patricio Estrella",
    "Calamardo Tentáculos",
    "Steam",
    "Epic Games",
    "Ubisoft",
    "EA Games",
    "World Of Warcraft",
    "Discord",
    "Twitch",
    "YouTube",
    "Mariano Bondar",
    "Paren La Mano",
    "Alfred (Batman)",
    "Freddy Krueger",
    "Jason Voorhees",
    "Michael Myers",
    "Chucky",
    "Pennywise",
    "Silvestre Stallone",
    "Arnold Schwarzenegger",
    "Rápido Y Furioso",
    "Scary Movie"
];

// 1. Definir la forma de los datos
interface GameContextType {
    totalJugadores: number;
    totalImpostores: number;
    currentPlayer: number;
    impostorIDs: number[];       
    crewmateKeyword: string;
    handleStartGame: () => void;
    handleNextPlayer: () => void;
    MAX_IMPOSTORES: number;
    handleIncrementJugadores: () => boolean;
    handleDecrementJugadores: () => boolean;
    handleIncrementImpostores: () => boolean;
    handleDecrementImpostores: () => boolean;
    players: Player[];
    renombraPlayer: (id: number, nombre: string) => void;
    eliminados: number[];
    eliminar: (playerId: number) => void;
    resetGame: () => void;

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
    const [players, setPlayers] = useState<Player[]>([]);
    const [eliminados, setEliminados] = useState<number[]>([]);

    useEffect(() => {
        setPlayers(prevPlayers => {
            const newPlayers: Player[] = [];
            for (let i = 1; i <= totalJugadores; i++) {
                const existingPlayer = prevPlayers.find(p => p.id === i);
                if (existingPlayer) {
                    newPlayers.push(existingPlayer);
                } else {
                    newPlayers.push({ id: i, name: `Jugador ${i}` });
                }
            }
            return newPlayers;
        });
    }, [totalJugadores]);

    const resetGame = () => {
        // Resetea todos los estados a sus valores iniciales
        setTotalJugadores(MIN_JUGADORES);
        setTotalImpostores(MIN_IMPOSTORES);
        setCurrentPlayer(1);
        setImpostorIDs([]);
        setCrewmateKeyword(KEYWORDS[0]);
        setEliminados([]);

        // ¡Importante! También resetea los nombres de los jugadores
        // // (Tu useEffect los mantiene, así que debemos forzar el reseteo aquí)
        // const defaultPlayers: Player[] = [];
        // for (let i = 1; i <= MIN_JUGADORES; i++) {
        //     defaultPlayers.push({ id: i, name: `Jugador ${i}` });
        // }
        // setPlayers(defaultPlayers);
    };



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

  // --- FUNCIÓN DE INICIO (Se llama desde index.tsx) ---
    const handleStartGame = () => {
      const randomIndex = Math.floor(Math.random() * KEYWORDS.length); 
      setCrewmateKeyword(KEYWORDS[randomIndex]); // Asigna la palabra seleccionada al estado
      // 1. Inicializa y asigna el impostor


      const playerIDs = players.map(p => p.id);
      const shuffledPlayers = playerIDs.sort(() => 0.5 - Math.random());
      const selectedImpostorIDs = shuffledPlayers.slice(0, totalImpostores);

      setImpostorIDs(selectedImpostorIDs);
      setCurrentPlayer(1);
      // Navega a la pantalla donde comienza la asignación de roles
      router.push("/Tarjetas");
    };
    
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
      router.push("/tablero"); // Navega a la pantalla final
    return;
    }
    // 2. Avanzar al siguiente jugador
    setCurrentPlayer(nextPlayer);
    };

    return (
        <GameContext.Provider value={{
            totalJugadores,
            totalImpostores,
            currentPlayer,
            handleStartGame,
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