import { useForm } from "react-hook-form"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Text, View } from "react-native"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppButton } from "@/components/AppButton"
import { AppInput } from "@/components/AppInput"


import { PublicStackParamsList } from "@/routes/PublicRoutes"
import { schema } from "./schema"

interface FormRegisterParams {
    email: string
    name: string
    password: string
    confirmPassword: string
}
export const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }

    } = useForm<FormRegisterParams>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: ""
        },
        resolver: yupResolver(schema)
    })

    const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

    const onSubmit = async () => { }
    return (
        <>
            <AppInput
                control={control}
                name="name"
                leftIconName="person"
                label="NOME"
                placeholder="Seu nome"
            />
            <AppInput
                control={control}
                name="email"
                leftIconName="mail-outline"
                label="EMAIL"
                placeholder="Seu email"
            />
            <AppInput
                control={control}
                name="password"
                leftIconName="lock-outline"
                label="SENHA"
                placeholder="Digite uma senha"
            />
            <AppInput
                control={control}
                name="confirmPassword"
                leftIconName="lock-outline"
                label="SENHA"
                placeholder="Digite novamente a senha"
            />

            <View
                className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
                <AppButton
                    onPress={handleSubmit(onSubmit)}
                    iconName="arrow-forward">
                    Cadastrar
                </AppButton>

                <View>
                    <Text className="mb-6 text-gray-300 text-base">
                        Já possui uma conta?
                    </Text>
                    <AppButton
                        iconName="arrow-forward"
                        mode="outline"
                        onPress={() => navigation.navigate("Login")}
                    >
                        Acessar
                    </AppButton>
                </View>

            </View>
        </>
    )
}