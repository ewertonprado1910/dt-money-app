import { FC, PropsWithChildren } from "react"
import { Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native"


export const DismissKeyboardView: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SafeAreaView className="flex-1 bg-background-primary items-center">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="padding" className="flex-1">
                    <ScrollView>
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}