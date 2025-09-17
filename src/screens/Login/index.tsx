import { View } from "react-native"

import { LoginForm } from "./LoginForm"
import { DismissKeyboardView } from "@/components/DismissKeyboardView"
import { AlthHeader } from "@/components/AlthHeader"
import { useAuthContext } from "@/context/auth.context"


export const Login = () => {

    return (
        <DismissKeyboardView >
            <View className="flex-1 w-[82%] self-center" >
                <AlthHeader />
                <LoginForm />
            </View>
        </DismissKeyboardView >
    )
}


