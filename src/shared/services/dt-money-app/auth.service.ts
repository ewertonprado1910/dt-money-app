import AsyncStorage from "@react-native-async-storage/async-storage"

import { FormLoginParams } from "@/screens/Login/LoginForm"
import { FormRegisterParams } from "@/screens/Register/RegisterForm"
import { dtMoneyApi } from "@/shared/api/dt-money"
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response"


export const authenticate = async (userData: FormLoginParams):
    Promise<IAuthenticateResponse> => {
    const { data } = await dtMoneyApi.post
        <IAuthenticateResponse>("/auth/login", userData)

    await AsyncStorage.setItem("dt-money-user", JSON.stringify(data))

    return data
}

export const registerUser = async (userData: FormRegisterParams):
    Promise<IAuthenticateResponse> => {
    const { data } = await dtMoneyApi.post
        <IAuthenticateResponse>("/auth/register", userData)

    await AsyncStorage.setItem("dt-money-user", JSON.stringify(data))

    return data
}