import { createContext, FC, PropsWithChildren, useContext, useState } from "react"

import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response"
import * as transactionService from "@/shared/services/dt-money-app/transaction.service"

export type TransactionContextTypes = {
    fetchCategories: () => Promise<void>
    categories: TransactionCategory[]
}

export const TransactionContext = createContext({} as TransactionContextTypes)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
    children
}) => {

    const [categories, setCategories] = useState<TransactionCategory[]>([])
    // console.log(categories)

    const fetchCategories = async () => {
        const categoriesResponse =
            await transactionService.getTransactionCategories()
            
        setCategories(categoriesResponse)
    }

    return (
        <TransactionContext.Provider
            value={{
                categories,
                fetchCategories
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactionContext)
}