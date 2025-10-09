import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { TransactionTypes } from "@/shared/enums/transaction-types"
import clsx from "clsx"
import { colors } from "@/shared/colors"

interface Props {
    setTransactionType: (type: TransactionTypes) => void
    typeId: number
}


export const TransactionTypeSelector: FC<Props> = ({
    setTransactionType,
    typeId
}) => {

    return (
        <View className="flex-row justify-between gap-2 mt-2">
            <TouchableOpacity
                onPress={() => setTransactionType(TransactionTypes.REVENUE)}
                className={clsx(
                    "flex-row items-center p-2 flex-1 justify-center h-[55] rounded-lg",
                    typeId === TransactionTypes.REVENUE
                        ? "bg-accent-brand" : "bg-background-tertiary"
                )}>
                <MaterialIcons
                    name="arrow-circle-up"
                    size={25}
                    color={typeId === TransactionTypes.REVENUE
                        ? colors.white
                        : colors["accent-brand-light"]}
                    className="mr-2"
                />
                <Text className="text-white font-bold">
                    Entrada
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
                className={clsx(
                    "flex-row items-center p-2 flex-1 justify-center h-[55] rounded-lg",
                    typeId === TransactionTypes.EXPENSE
                        ? "bg-accent-red" : "bg-background-tertiary"
                )}>

                <MaterialIcons
                    name="arrow-circle-down"
                    size={25}
                    color={typeId === TransactionTypes.EXPENSE
                        ? colors.white
                        : colors["accent-red"]}
                    className="mr-2"
                />
                <Text className="text-white font-bold">
                    Saida
                </Text>
            </TouchableOpacity>
        </View >
    )
}