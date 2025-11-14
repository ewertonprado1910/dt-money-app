import { useEffect, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { useTransactionContext } from "@/context/transaction.context"
import { colors } from "@/shared/colors"


export const FilterInputTransaction = () => {
    const { pagination,
        setSearchText,
        searchText,
        fetchTransactions
    } = useTransactionContext()
    const [text, setText] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchText(text)
        }, 800)

        return () => clearTimeout(handler)
    }, [text])

    useEffect(() => {
        (async () => {
            try {
               fetchTransactions({ page: 1 })
              
            } catch (error) {

            }
        })()
    }, [searchText])

    return (
        <View className="mb-4 w-[90%] self-center">
            <View className="w-full flex-row justify-between items-center">
                <Text className="text-white text-xl font-bold">
                    Transações
                </Text>
                <Text className="text-gray-700 text-base">
                    {pagination.totalRows}
                    {pagination.totalRows === 1 ? " Item" : " Items"}
                </Text>
            </View>

            <TouchableOpacity className="flex-row items-center justify-between h-16">
                <TextInput
                    value={text}
                    onChangeText={setText}
                    className="h-[50] text-white w-full bg-background-primary text-lg pl-4"
                    placeholder="Busque uma transação"
                    placeholderTextColor={colors.gray[700]}

                />
                <TouchableOpacity className="absolute right-0">
                    <MaterialIcons
                        name="filter-list"
                        size={25}
                        color={colors["accent-brand-light"]}
                        className="mr-3"
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}