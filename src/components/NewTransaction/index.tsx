import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import CurrencyInput from "react-native-currency-input"
import { MaterialIcons } from "@expo/vector-icons"

import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { TransactionTypeSelector } from "../SelectType"

import { colors } from "@/shared/colors"



export const NewTransaction = () => {
    const { closeBottomSheet } = useBottomSheetContext()

    const [transaction, setTransaction] =
        useState<CreateTransactionInterface>({
            description: "",
            typeId: 0,
            categoryId: 0,
            value: 0
        })


    const setTransactionData = (key: keyof
        CreateTransactionInterface, value: string | number) => {
        setTransaction((prevData) => ({ ...prevData, [key]: value }))
    }

    return (
        <View className="px-5 py-3">
            <TouchableOpacity
                onPress={closeBottomSheet}
                className="w-full flex-row  items-center justify-between">
                <Text className="text-white text-xl font-bold">
                    Nova transação
                </Text>
                <MaterialIcons
                    name="close"
                    size={20}
                    color={colors.gray[700]}
                />
            </TouchableOpacity>

            <View className="flex-1 my-5 mb-5">
                <TextInput
                    onChangeText={(text) => setTransactionData("description", text)}
                    placeholder="Descrição"
                    placeholderTextColor={colors.gray[700]}
                    value={transaction.description}
                    className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6]"
                />
                <CurrencyInput
                    value={transaction.value}
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    onChangeValue={(value) => setTransactionData("value", value ?? 0)}
                    className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6]"
                />
                <TransactionTypeSelector
                    typeId={transaction.typeId}
                    setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
                />
            </View>

        </View>
    )
}