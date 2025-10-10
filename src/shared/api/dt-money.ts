import axios from "axios"
import { AppError } from "../helpers/AppError"
import { addTokenToRequest } from "../helpers/axios.helper"

export const dtMoneyApi = axios.create({
    baseURL: "http://192.168.1.43:3001"
})

addTokenToRequest(dtMoneyApi)

dtMoneyApi.interceptors.response.use(
    (conig) => conig,
    (error) => {
        if (error.response && error.response.data) {
            return (
                Promise.reject(new AppError(error.response.data.message))
            )
        } else {
            return Promise.reject(new AppError("Falha na requisição!"))
        }
    }
)