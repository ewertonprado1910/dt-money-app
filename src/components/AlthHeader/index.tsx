import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible"
import { Image, View } from "react-native"


export const AlthHeader = () => {
    const keyboardIsVisible = useKeyboardVisible()

    if (keyboardIsVisible) {
        return <></>
    }

    return (
        <View
            className="items-center justify-center mt-16 w-full min-h-40">
            <Image source={require("@/assets/Logo.png")}
                className="h-[48px] w-[255px]"
            />
        </View>
    )
}