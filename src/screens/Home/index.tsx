import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect } from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"

import { useAuthContext } from "@/context/auth.context"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"
import { ListHeader } from "./ListHeader"

export const Home = () => {
    const { handleLogout } = useAuthContext()
    const { fetchCategories, fetchTransactions } = useTransactionContext()
    const { handlerError } = useErrorHandler()

    const handleFetchCategories = async () => {
        try {
            await fetchCategories()

        } catch (error) {
            handlerError(error, "Falha ao buscar as categorias.")
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all
                ([handleFetchCategories(), fetchCategories()])
        })()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <FlatList
                className="bg-background-secondary"
                ListHeaderComponent={ListHeader}
                //  ListFooterComponent={ }
                data={[]}
                renderItem={() => <></>}
            />
        </SafeAreaView>
    )
}
