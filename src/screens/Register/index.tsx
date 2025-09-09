import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { Text, TouchableOpacity, View } from "react-native"

import { PublicStackParamsList } from "@/routes/PublicRoutes"

export const Register = () => {
    const navigation =
        useNavigation<StackNavigationProp<PublicStackParamsList>>()
    return (
        <View className="flex-1 ">
            <Text className="color-accent-blue-dark">Olá Register</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}