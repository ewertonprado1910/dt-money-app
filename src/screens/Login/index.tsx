import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { View, Text, TouchableOpacity } from "react-native"

import { PublicStackParamsList } from "@/routes"


export const Login = () => {
    const navigation =
        useNavigation<StackNavigationProp<PublicStackParamsList>>()

    return (

        <View className="flex-1 items-center justify-center">
            <Text className="color-accent-red">Tela de Login</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View >

    )

}


