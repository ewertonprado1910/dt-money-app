import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect } from "react"
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity } from "react-native"

import { useAuthContext } from "@/context/auth.context"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"
import { ListHeader } from "./ListHeader"
import { TransactionCard } from "./TransactionCard"
import { EmptyList } from "./EmptyList"
import { colors } from "@/shared/colors"

export const Home = () => {
    const { handleLogout } = useAuthContext()
    const { fetchCategories,
        fetchTransactions,
        transactions,
        refreshTransaction,
        handleLoadings,
        loadings,
        loadMoreTransactions
    } = useTransactionContext()
    const { handlerError } = useErrorHandler()

    const handleFetchCategories = async () => {
        try {
            handleLoadings({
                key: "initial",
                value: true
            })
            await fetchCategories()
        } catch (error) {
            handlerError(error, "Falha ao buscar as categorias.")
        } finally {
            handleLoadings({
                key: "initial",
                value: false
            })
        }
    }

    const handleFetchInitialTransactions = async () => {
        try {
            handleLoadings({
                key: "initial",
                value: true
            })
            await fetchTransactions({ page: 1 })
        } catch (error) {
            handlerError(error, "Falha ao buscar transações!")
        } finally {
            handleLoadings({
                key: "initial",
                value: false
            })
        }
    }

    const handleLoadMoreTransactions = async () => {
        try {
            handleLoadings({
                key: "loadMore",
                value: true
            })
            await loadMoreTransactions()

        } catch (error) {
            handlerError(error, "Falha ao carregar novas transações!")
        } finally {
            handleLoadings({
                key: "loadMore",
                value: false
            })
        }
    }

    const handleRefreshTransactions = async () => {
        try {
            handleLoadings({
                key: "refresh",
                value: true
            })
            await refreshTransaction()
        } catch (error) {
            handlerError(error, "Falha ao recarregar transações!")
        } finally {
            handleLoadings({
                key: "refresh",
                value: false
            })
        }
    }
    useEffect(() => {
        (async () => {
            await Promise.all([
                handleFetchCategories(),
                handleFetchInitialTransactions()
            ])
        })()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <FlatList
                className="bg-background-secondary"
                ListHeaderComponent={ListHeader}
                data={transactions}
                keyExtractor={({ id }) => `transaction-${id}`}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                onEndReached={handleLoadMoreTransactions}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={loadings.initial ? null : EmptyList}
                ListFooterComponent={
                    loadings.loadMore ?
                        <ActivityIndicator
                            color={colors["accent-brand-light"]}
                            size={"large"} /> : null
                }
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefreshTransactions}
                        refreshing={loadings.refresh}
                    />
                }
            />
        </SafeAreaView>
    )
}
