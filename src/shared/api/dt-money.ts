import axios from "axios"

export const dtMoneyApi = axios.create({
    baseURL: "http://192.168.1.35:3001"
})