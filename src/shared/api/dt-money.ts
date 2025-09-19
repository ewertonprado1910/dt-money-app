import axios from "axios"
import { AppError } from "../helpers/AppError"

export const dtMoneyApi = axios.create({
    baseURL: "http://192.168.1.35:3001"
})

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