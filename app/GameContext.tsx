// app/GameContext.tsx
import { useRouter } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
//Mannejo de variables y funciones
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
    "Scary Movie",
    "Darth Vader",
    "Luke Skywalker",
    "Yoda", 
    "Han Solo",
    "Chewbacca",
    "Princesa Leia", 
    "R2-D2(Star Wars)"
    , "C-3PO(Star Wars)", 
    "Obi-Wan Kenobi",
    "Anakin Skywalker", 
    "Mario Bros",
    "Luigi",
    "Princesa Peach",
    "Bowser", 
    "Yoshi",
    "Donkey Kong", 
    "Link (Zelda)",
    "Princesa Zelda", 
    "Pikachu",
    "Ash Ketchum", "Charizard", 
    "Mewtwo",
    "Kirby",
    "Sonic", 
    "Pac-Man",
    "Master Chief (Halo)",
    "Lara Croft",
    "Leon S. Kennedy",
    "Ada Wong",
    "Jill Valentine", 
    "Chris Redfield", 
    "Albert Wesker", 
    "Sub-Zero", 
    "Scorpion",
    "Liu Kang", 
    "Raiden",
    "Ryu (Street Fighter)", 
    "Ken (Street Fighter)", 
    "Chun-Li", "Mega Man", 
    "Crash Bandicoot", 
    "Spyro", 
    "Ezio Auditore", 
    "Arthur Morgan", 
    "John Marston", 
    "Ciri (The Witcher)", 
    "Yennefer (The Witcher)", 
    "Steve (Minecraft)", 
    "Creeper (Minecraft)", 
    "Trevor Philips (GTA V)", 
    "Michael De Santa (GTA V)", 
    "Franklin Clinton (GTA V)", 
    "Big Smoke (GTA SA)", 
    "Michael Jackson",
    "Freddie Mercury", 
    "Madonna",
    "Elvis Presley", 
    "Bob Marley", 
    "John Lennon", 
    "Paul McCartney",
    "Taylor Swift",
    "Bad Bunny",
    "Lady Gaga",
    "Eminem",
    "Kurt Cobain",
    "Axel Rose", 
    "Slash", 
    "Shakira", 
    "Daddy Yankee", 
    "Residente", 
    "Amy Winehouse", 
    "David Bowie",
    "Prince",
    "The Weeknd", 
    "Ariana Grande",
    "Billie Eilish",
    "Dua Lipa",
    "Snoop Dogg",
    "Tupac",
    "Notorious B.I.G.",
    "Beyoncé",
    "Rihanna",
    "Adele",
    "Elton John",
    "Stevie Wonder",
    "Britney Spears",
    "Justin Bieber",
    "Katy Perry",
    "Mick Jagger",
    "Ozzy Osbourne",
    "Daft Punk",
    "Selena Gomez",
    "Harry Styles",
    "Chandler Bing",
    "Joey Tribbiani",
    "Rachel Green",
    "Monica Geller",
    "Ross Geller",
    "Phoebe Buffay",
    "Michael Scott(The Oficce)",
    "Dwight Schrute(The Oficce)",
    "Jim Halpert(The Oficce)",
    "Pam Beesly(The Oficce)",
    "Sheldon Cooper",
    "Leonard Hofstadter",
    "Penny (Big Bang Theory)",
    "Howard Wolowitz",
    "Barney Stinson",
    "Ted Mosby",
    "Robin Scherbatsky",
    "Jerry Seinfeld",
    "George Costanza",
    "Kramer",
    "Elaine Benes",
    "Dr. House",
    "Eleven (Stranger Things)",
    "Hopper (Stranger Things)",
    "Dustin (Stranger Things)",
    "Steve Harrington",
    "Vecna",
    "Jon Snow",
    "Daenerys Targaryen",
    "Tyrion Lannister",
    "Arya Stark",
    "Cersei Lannister",
    "Jaime Lannister",
    "El Profesor (La Casa de Papel)",
    "Tokio (La Casa de Papel)",
    "Berlín (La Casa de Papel)",
    "Nairobi (La Casa de Papel)",
    "Seong Gi-hun (Squid Game)",
    "Thomas Shelby (Peaky Blinders)",
    "Merlina (Wednesday)",
    "Joe Goldberg (You)",
    "Geralt de Rivia (The Witcher)",
    "Homelander (The Boys)",
    "Billy Butcher (The Boys)",
    "Invencible (Mark Grayson)",
    "Omni-Man",
    "Indiana Jones",
    "James Bond",
    "Forrest Gump",
    "E.T. (El Extraterrestre)",
    "Pelé",
    "Terminator",
    "Sarah Connor",
    "Ellen Ripley",
    "Alien (Xenomorfo)",
    "Depredador",
    "Rambo",
    "Rocky Balboa",
    "Tyler Durden (El Club de la Pelea)",
    "Vincent Vega (Pulp Fiction)",
    "Jules Winnfield (Pulp Fiction)",
    "Mia Wallace (Pulp Fiction)",
    "La Novia (Kill Bill)",
    "Beetlejuice",
    "Jack Skellington",
    "Sally (Extraño Mundo de Jack)",
    "El Grinch",
    "Kevin McCallister (Mi Pobre Angelito)",
    "Willy Wonka",
    "Maximus (Gladiador)",
    "William Wallace",
    "Ethan Hunt (Misión Imposible)",
    "Dominic Toretto",
    "Brian O'Conner",
    "Jason Bourne",
    "Katniss Everdeen",
    "Jack (Titanic)",
    "Rose (Titanic)",
    "Cristiano Ronaldo",
    "Michael Jordan",
    "LeBron James",
    "Kobe Bryant",
    "Usain Bolt",
    "Serena Williams",
    "Roger Federer",
    "Rafael Nadal",
    "Muhammad Ali",
    "Pelé",
    "Neymar",
    "Tom Brady",
    "Tiger Woods",
    "Mike Tyson",
    "Albert Einstein",
    "Steve Jobs",
    "Bill Gates",
    "Elon Musk",
    "Mark Zuckerberg",
    "Stephen Hawking",
    "Leonardo da Vinci",
    "Che Guevara",
    "Pablo Escobar",
    "Rick Sanchez",
    "Morty Smith",
    "Finn el Humano",
    "Jake el Perro",
    "Mordecai",
    "Rigby",
    "Gumball Watterson",
    "Darwin Watterson",
    "Coraje (El perro cobarde)",
    "Dexter (Laboratorio de Dexter)",
    "Dee Dee",
    "Burbuja (Chicas Superpoderosas)",
    "Bombón",
    "Bellota",
    "Mojo Jojo",
    "Johnny Bravo",
    "Scooby-Doo",
    "Shaggy",
    "Tom (Tom y Jerry)",
    "Jerry (Tom y Jerry)",
    "Bugs Bunny",
    "Pato Lucas",
    "Porky",
    "Silvestre",
    "Piolín",
    "Correcaminos",
    "Coyote",
    "Taz (Demonio de Tasmania)",
    "Pantera Rosa",
    "Garfield",
    "Snoopy",
    "Charlie Brown",
    "Popeye",
    "Olivia (Popeye)",
    "Brutus",
    "Cartman (South Park)",
    "Stan Marsh (Souht Park)",
    "Kyle (Souht Park)",
    "Kenny (South Park)",
    "Peter Griffin",
    "Stewie Griffin",
    "Brian Griffin",
    "Thanos",
    "Loki",
    "Doctor Strange",
    "Hawkeye",
    "Ant-Man",
    "Black Panther",
    "Star-Lord",
    "Gamora",
    "Drax",
    "Rocket Raccoon",
    "Groot",
    "Vision",
    "Wanda Maximoff (Scarlet Witch)",
    "Lex Luthor",
    "Catwoman",
    "Pingüino",
    "Acertijo",
    "Dos Caras",
    "Harley Quinn",
    "Doctor Octopus",
    "Duende Verde",
    "Nick Fury",
    "Tom Hanks",
    "Leonardo DiCaprio",
    "Brad Pitt",
    "Johnny Depp",
    "Will Smith",
    "Keanu Reeves",
    "Angelina Jolie",
    "Scarlett Johansson",
    "Jennifer Lawrence",
    "Dwayne 'La Roca' Johnson",
    "Morgan Freeman",
    "Samuel L. Jackson",
    "Jim Carrey",
    "Adam Sandler",
    "Bruce Willis",
    "Harrison Ford",
    "Meryl Streep",
    "Quentin Tarantino",
    "Steven Spielberg",
    "Martin Scorsese",
    "Cristina Kirchner",
    "Javier Milei",
    "Guillermo Francella",
    "Diego Capusotto",
    "Peter Capusotto",
    "Indio Solari",
    "Wanda Nara",
    "Zaira Nara",
    "Spreen",
    "Santi Maratea",
    "Lali Espósito",
    "María Becerra",
    "Emilia Mernes",
    "Ángel Di María",
    "Dibu Martínez",
    "Scaloni",
    "El Chavo del 8",
    "Don Ramón",
    "Quico",
    "La Chilindrina",
    "Luis Miguel", 
    "Ricky Martin", 
    "Chayanne",
    "Celia Cruz",
    "Marc Anthony",
    "Don Omar", 
    "Wisin", 
    "Yandel", 
    "Novak Djokovic", 
    "Riquelme", 
    "Carlos Tevez", 
    "Kun Agüero", 
    "Ayrton Senna", 
    "Michael Schumacher",
    "Kim Kardashian", 
    "Kylie Jenner",
    "Gordon Ramsay",
    "Martitegui",
    "Donnato",
    "Luis Ventura", 
    "Backstreet Boys",
    "Christina Aguilera",
    "Linkin Park",
    "Red Hot Chili Peppers",
    "Ed, Edd y Eddy",
    "Los Sims",
    "Scream",
    "Chuck Norris",
    "Hannibal Lecter",
    "scar (Rey leon)",
    "MacGyver",
    "Houdini",
    "Baywatch",
    "Cruella de Vil",
    "Hades (Hércules)",
    "Pepe Argento",
    "Moni Argento",
    "coki Argento",
    "Paola Argento",
    "Dardo Fuseneco",
    "Maria Elena Fuseneco",
    "Yayo Guridi",
    "Pachu Peña",
    "Pablo Granados",
    "Migue Granados","He-Man",
    "Gargamel",
    "Papá Pitufo",
    "Oprah Winfrey",
    "El Zorro",
    "Sargento García",
    "Señor Barriga",
    "Profesor Jirafales",
    "Doña Florinda",
    "Mafalda",
    "Frida Calo",
    "Davinici",
    "Juana de Arco",
    "Hello Kitty",
    "Icardi",
    "Dios",
    "Jesus",
    "Buda",
    "Mbappe",
    "Cristian Castro",
    "Tom Holland",
    "Nelson Mandela",
    "Mahatma Gandhi",
    "Adolf Hitler",
    //objetos-----------------
    "Cama",
    "Inodoro",
    "Heladera",
    "Microndas",
    "Tenedor",
    "Cuchillo",
    "Lámpara",
    "Reloj",
    "Espejo",
    "Llave",
    "Puerta",
    "Escoba",
    "Torre Eiffel",
    "Estatua de la Libertad",
    "Gran Muralla China",
    "Coliseo Romano",
    "Pirámides de Giza",
    "Obelisco (Buenos Aires)",
    "Cristo Redentor",
    "Machu Picchu",
    "Taj Mahal",
    "Torre de Pisa",
    "Monte Everest",
    "Cataratas del Iguazú",
    "Glaciar Perito Moreno",
    "Río Amazonas",
    "Desierto del Sahara",
    "Gran Cañón",
    "Cataratas del Niágara",
    "Isla de Pascua",
    "Aconcagua",
    "Pizza",
    "Hamburguesa",
    "Fernet",
    "Celular",
    "Cassette",
    "Cámara de fotos",
    "Auto",
    "Avión",
    "Bicicleta",
    "Tren",
    "Barco",
    "Moto",
    "DeLorean (Volver al Futuro)",
    "Motosierra",
    "Esferas del Dragón",
    "Pelota de fútbol",
    "Guitarra eléctrica",
    "Semáforo",
    "Fantasma",
    "Ovni",
    "Dinosaurio",
    "Escudo del Capitán América",
    "Muro de Berlín",
    "Área 51",
    "Triángulo de las Bermudas",
    "Atlántida",
    "Cementerio",
    "Hospital",
    "Cárcel",
    "Iglesia",
    "Casino",
    "Zombie",
    "Vampiro",
    "Hombre Lobo",
    "Baticueva",
    "Arca de Noé",
    "Estetoscopio",
    "Jeringa",
    "Esposas(Policía)",
    "Choripán",
    "Mate",
    "Champagne",
    "VHS",
    "Máquina de Escribir",
    "Family Game (NES)",
    "Pasaporte"
];

// 1. Definir la forma de los datos 
interface GameContextType {
    totalJugadores: number;
    totalImpostores: number;
    currentPlayer: number;
    impostorIDs: number[];
    crewmateKeyword: string;      
    JuegoElegido: string; 
    setJuegoElegido: React.Dispatch<React.SetStateAction<string>>;
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
    handleGoTo: () => void;
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
    const [JuegoElegido, setJuegoElegido] = useState<string>(' ');

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

    const resetGame = () => {
        // Resetea todos los estados a sus valores iniciales
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

    const handleGoTo = () => {
      if (JuegoElegido === "impostor"){
        router.push("/MenuImpostor");
      }
      if (JuegoElegido === "masomenos"){
        router.push("/MenuDeEleccion");
      }
    };



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
            handleGoTo,
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
            JuegoElegido,
            setJuegoElegido,
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