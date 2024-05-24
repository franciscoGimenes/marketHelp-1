import { createStackNavigator } from '@react-navigation/stack';
import Bem_Vindo from './pages/index';
import Compras from './pages/compras';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="index"
                component={Bem_Vindo}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="compras"
                component={Compras}
            />
        </Stack.Navigator>
    )
} 