import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react"

import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response"
import * as transactionService from "@/shared/services/dt-money-app/transaction.service"
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request"
import { Transaction } from "@/shared/interfaces/transaction"

export type TransactionContextTypes = {
    fetchCategories: () => Promise<void>
    categories: TransactionCategory[]
    createTransaction: (transaction: CreateTransactionInterface) => Promise<void>
    fetchTransactions: () => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextTypes)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
    children
}) => {

    const [categories, setCategories] = useState<TransactionCategory[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const fetchCategories = async () => {
        const categoriesResponse =
            await transactionService.getTransactionCategories()

        setCategories(categoriesResponse)
    }

    const createTransaction = async (
        transaction: CreateTransactionInterface
    ) => {
        await transactionService.createTransaction(transaction)
    }

    const fetchTransactions = useCallback(async () => {
        const transactionResponse = await transactionService.getTransaction({
            page: 1,
            perPage: 10
        })
        console.log(transactionResponse)
        setTransactions(transactionResponse.data)
    }, [])

    return (
        <TransactionContext.Provider
            value={{
                categories,
                fetchCategories,
                createTransaction,
                fetchTransactions
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactionContext)
}