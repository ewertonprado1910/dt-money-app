import { FC } from "react"
import { Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { TransactionTypes } from "@/shared/enums/transaction-types"
import { useTransactionContext } from "@/context/transaction.context"
import { ICONS } from "./strategies/icon-strategy"
import { CARD_DATA } from "./strategies/card-date-strategy"
import { moneyMapper } from "@/shared/utils/money-mapper"
import clsx from "clsx"
import { formatDate, formatDayendMonth } from "@/shared/utils/formatDate"

export type TransactionCardType = TransactionTypes | "total"

interface Props {
    type: TransactionCardType
    amount: number
}

export const TransactionCard: FC<Props> = ({ amount, type }) => {
    const iconData = ICONS[type]
    const cardData = CARD_DATA[type]

    const { transactions, filters } = useTransactionContext()

    const lastTransaction = transactions.find(
        ({ type: transactionType }) => transactionType.id === type
    )

    const renderDateInfo = () => {
        if (type === "total") {
            return (
                <Text className="text-white text-base">
                    {
                        filters.from && filters.to ? (
                            `${formatDayendMonth(filters.from)} até ${formatDayendMonth(filters.to)}`
                        ) : "Todo Periodo"
                    }

                </Text>
            )
        } else {
            return (
                <Text className="text-gray-700">
                    {lastTransaction?.createdAt ?
                        format(
                            lastTransaction?.createdAt,
                            `'Ultima ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                            { locale: ptBR }
                        ) : "Nenhuma transação encontrada"
                    }
                </Text>
            )
        }
    }

    return (
        <View
            className={clsx(
                `bg-${cardData.bgColor} 
                 min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`,
                type === "total" && "mr-12"
            )}>
            <View className="flex-row justify-between items-center ">
                <Text className={`text-base ${cardData.color}`}>
                    {cardData.label}
                </Text>
                <MaterialIcons
                    name={iconData.name}
                    color={iconData.color}
                    size={25} />
            </View>
            <View>
                <Text className="text-2xl text-gray-400 font-bold">
                    R$ {moneyMapper(amount)}
                </Text>
                {renderDateInfo()}
            </View>
        </View>

    )
}