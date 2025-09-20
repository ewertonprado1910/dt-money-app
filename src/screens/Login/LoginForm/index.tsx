import { ActivityIndicator, Text, View } from "react-native"
import { useForm } from "react-hook-form"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppButton } from "@/components/AppButton"
import { AppInput } from "@/components/AppInput"
import { PublicStackParamsList } from "@/routes/PublicRoutes"
import { schema } from "./schema"
import { useAuthContext } from "@/context/auth.context"
import { useSnackbarContext } from "@/context/snackbar.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"
import { colors } from "@/shared/colors"


export interface FormLoginParams {
    email: string
    password: string
}

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<FormLoginParams>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(schema)
    })

    const { handleAuthenticate } = useAuthContext()
    const { notify } = useSnackbarContext()
    const { handlerError } = useErrorHandler()

    const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

    const onSubmit = async (userData: FormLoginParams) => {
        try {
            await handleAuthenticate(userData)
        } catch (error) {
            handlerError(error, "Erro ao logar")
        }
    }

    return (
        <>
            <AppInput
                control={control}
                name="email"
                label="email"
                placeholder="@ewertonprado"
                leftIconName="mail-outline"
            />

            <AppInput
                control={control}
                name="password"
                label="password"
                placeholder="Sua senha"
                leftIconName="lock-outline"
                secureTextEntry
            />

            <View
                className="flex-1 justify-between mt-8 mb-5 min-h-[240px]">

                <AppButton
                    onPress={handleSubmit(onSubmit)}
                    iconName="arrow-forward">
                    {isSubmitting ?
                        <ActivityIndicator color={colors.white} /> : "Login"
                    }
                </AppButton>

                <View>
                    <Text className="mb-6 text-gray-300 text-base">
                        Ainda não possui conta?
                    </Text>
                    <AppButton
                        iconName="arrow-forward"
                        mode="outline"
                        onPress={() => navigation.navigate("Register")}>
                        Cadastre-se
                    </AppButton>
                </View>

            </View>

        </>
    )
}