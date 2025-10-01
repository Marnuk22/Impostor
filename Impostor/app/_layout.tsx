
import { Stack } from 'expo-router';
import { GameProvider } from './GameContext'; 
// Asegúrate que la ruta al archivo GameContext sea correcta

export default function RootLayout() {
    return (
    // ESTO ES LO ÚNICO QUE DEBES HACER:
    <GameProvider> 
        <Stack>
        {/* Aquí irán todas tus pantallas (index, tarjeta, fase3, etc.) */}
        </Stack>
    </GameProvider>
    );
}