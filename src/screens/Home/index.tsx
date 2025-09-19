import { useAuthContext } from "@/context/auth.context"
import { Button, Text, TouchableOpacity, View } from "react-native"


export const Home = () => {
    const { handleLogout } = useAuthContext()
    return (
        <View>
            <Text>Ola, Home</Text>
            <Button title="Sair" onPress={handleLogout}>
            </Button>
        </View>
    )
}