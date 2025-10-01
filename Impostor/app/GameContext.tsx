// app/GameContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'expo-router';

const MIN_JUGADORES = 4; 
const MAX_JUGADORES = 12; 
const MIN_IMPOSTORES = 1;

// Lista de palabras/roles para los tripulantes
const KEYWORDS: string[] = [
    "messi",
    "maradona",
    "ricardo fort",
    "coscu",
    "duki",
    "bizarrap",
    "wos",
    "trueno",
    "khea",
    "paulo londra",
    "l-gante",
    "tini stoessel",
    "moria casan",
    "mirta legrand",
    "susana gimenez",
    "tinelli",
    "guido kaczka",
    "alf",
    "homer",
    "marge",
    "bart",
    "lisa",
    "maggie",
    "milhouse",
    "ned flanders",
    "apu",
    "mr burns",
    "moe",
    "john wick",
    "neo",
    "trinity",
    "morpheus",
    "marty mcfly",
    "doc brown",
    "biff tannin",
    "tony montana",
    "scarface",
    "vito corleone",
    "michael corleone",
    "fredo corleone",
    "sonny corleone",
    "joker",
    "batman",
    "robin",
    "alfred",
    "bane",
    "superman",
    "wonder woman",
    "flash",
    "aquaman",
    "iron man",
    "captain america",
    "hulk",
    "thor",
    "black widow",
    "spiderman",
    "venom",
    "deadpool",
    "wolverine",
    "magneto",
    "professor x",
    "shrek",
    "burro",
    "fiona",
    "gato con botas",
    "buzz lightyear",
    "woody",
    "andy",
    "sid",
    "elsa",
    "anna",
    "olaf",
    "sven",
    "jack sparrow",
    "will turner",
    "elizabeth swann",
    "davy jones",
    "harry potter",
    "hermione",
    "ron weasley",
    "dumbledore",
    "snape",
    "voldemort",
    "gandalf",
    "frodo",
    "aragorn",
    "legolas",
    "gollum",
    "sam",
    "bilbo",
    "thorin",
    "smaug",
    "rick grimes",
    "daryl",
    "michonne",
    "negan",
    "walter white",
    "jesse pinkman",
    "saul goodman",
    "gustavo fring",
    "don cornelio",
    "ricardo iorio",
    "pappo",
    "charly garcia",
    "fito paez",
    "spinetta",
    "andres calamaro",
    "gustavo cerati",
    "simba (el rey león)",
    "nala (el rey león)",
    "mufasa (el rey león)",
    "aladdín (aladdín)",
    "jazmín (aladdín)",
    "genio (aladdín)",
    "jafar (aladdín)",
    "peter pan (peter pan)",
    "campanita (peter pan)",
    "capitán garfio (peter pan)",
    "winnie the pooh (winnie the pooh)",
    "piglet (winnie the pooh)",
    "tigger (winnie the pooh)",
    "eeyore (winnie the pooh)",
    "pinocho (pinocho)",
    "geppetto (pinocho)",
    "dumbo (dumbo)",
    "timothy (dumbo)",
    "bambi (bambi)",
    "hada azul (pinocho)",
    "aurora (la bella durmiente)",
    "maléfica (la bella durmiente)",
    "felipe (la bella durmiente)",
    "cenicienta (cenicienta)",
    "hada madrina (cenicienta)",
    "anastasia (cenicienta)",
    "ariel (la sirenita)",
    "sebastián (la sirenita)",
    "flounder (la sirenita)",
    "ursula (la sirenita)",
    "tarzán (tarzán)",
    "jane (tarzán)",
    "clayton (tarzán)",
    "tiana (la princesa y el sapo)",
    "naveen (la princesa y el sapo)",
    "doctor facilier (la princesa y el sapo)",
    "rapunzel (enredados)",
    "flynn rider (enredados)",
    "maximus (enredados)",
    "gothel (enredados)",
    "ralph (ralph el demoledor)",
    "vanellope (ralph el demoledor)",
    "miguel (coco)",
    "héctor (coco)",
    "mama coco",
    "remy (ratatouille)",
    "linguini (ratatouille)",
    "colette (ratatouille)",
    "anton ego (ratatouille)",
    "merida (valiente)",
    "rey fergus (valiente)",
    "bolt (bolt)",
    "edward elric (fullmetal alchemist)",
    "alphonse elric (fullmetal alchemist)",
    "roy mustang (fullmetal alchemist)",
    "light yagami (death note)",
    "l (death note)",
    "misa amane (death note)",
    "near (death note)",
    "yagami soichiro (death note)",
    "tanjiro kamado (demon slayer)",
    "nezuko kamado (demon slayer)",
    "zenitsu agatsuma (demon slayer)",
    "inosuke hashibira (demon slayer)",
    "gyu tomioka (demon slayer)",
    "eren jaeger (attack on titan)",
    "mikasa ackerman (attack on titan)",
    "armin arlert (attack on titan)",
    "levi ackerman (attack on titan)",
    "erwin smith (attack on titan)",
    "naruto uzumaki (naruto)",
    "hinata hyuga (naruto)",
    "gaara (naruto)",
    "jiraiya (naruto)",
    "sakura haruno (naruto)",
    "ichigo kurosaki (bleach)",
    "rukia kuchiki (bleach)",
    "orihime inoue (bleach)",
    "byakuya kuchiki (bleach)",
    "kenpachi zaraki (bleach)",
    "luffy (one piece)",
    "zoro (one piece)",
    "nami (one piece)",
    "sanji (one piece)",
    "chopper (one piece)",
    "robin (one piece)",
    "usopp (one piece)",
    "brook (one piece)",
    "franky (one piece)",
    "gon (hunter x hunter)",
    "killua (hunter x hunter)",
    "kurapika (hunter x hunter)"
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
      router.push("/fase3"); // Navega a la pantalla final
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