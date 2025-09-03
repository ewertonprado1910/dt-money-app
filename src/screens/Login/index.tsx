import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { View, Text, TouchableOpacity } from "react-native"

import { PublicStackParamsList } from "@/routes/PublicRoutes"

import { DismissKeyboardView } from "@/components/DismissKeyboardView"
import { TextInput } from "react-native-gesture-handler"


export const Login = () => {
    const navigation =
        useNavigation<StackNavigationProp<PublicStackParamsList>>()

    return (

        <DismissKeyboardView >
            <Text className="color-accent-red">Tela de Login</Text>
            <TextInput className="bg-gray-500 w-full"></TextInput>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </DismissKeyboardView >

    )

}


