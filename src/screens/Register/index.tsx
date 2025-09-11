import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { View } from "react-native"

import { PublicStackParamsList } from "@/routes/PublicRoutes"
import { DismissKeyboardView } from "@/components/DismissKeyboardView"
import { RegisterForm } from "./RegisterForm"
import { AlthHeader } from "@/components/AlthHeader"

export const Register = () => {
    const navigation =
        useNavigation<StackNavigationProp<PublicStackParamsList>>()
    return (
        <DismissKeyboardView >
            <View className="flex-1 w-[82%] self-center" >
                <AlthHeader/>
                <RegisterForm/>
            </View>
        </DismissKeyboardView>


    )
}