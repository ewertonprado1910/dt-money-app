import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"

import { useTransactionContext } from "@/context/transaction.context"
import { formatDate } from "@/shared/utils/formatDate"
import clsx from "clsx"

export const DateFilter = () => {
    const { filters, handleFilters } = useTransactionContext()

    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)

    const onStartCancel = () => {
        setShowStartDatePicker(false)
    }

    const onStartConfirm = (selectedDate: Date) => {
        setShowStartDatePicker(false)
        handleFilters({ key: "from", value: selectedDate })
    }

    const onEndCancel = () => {
        setShowStartDatePicker(false)
    }

    const onEndConfirm = (selectedDate: Date) => {
        setShowEndDatePicker(false)
        handleFilters({ key: "to", value: selectedDate })
    }

    return (
        <>
            <Text className="text-base font-medium mb-5 text-gray-600">Data </Text>

            <View className="flex-row justify-between mb-6">
                <View className="w-[48%] ">
                    <TouchableOpacity
                        onPress={() => setShowStartDatePicker(true)}
                        className="rounded-md p-2 border-b border-gray-800 ">
                        <Text className={clsx(
                            "text-lg",
                            filters.from ? "text-white" : "text-gray-700"
                        )}>
                            {formatDate(filters.from) || "De"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="w-[48%]">
                    <TouchableOpacity
                        onPress={() => setShowEndDatePicker(true)}
                        className="rounded-md p-2 border-b border-gray-800">
                        <Text className={clsx(
                            "text-lg",
                            filters.to ? "text-white" : "text-gray-700"
                        )}>
                            {formatDate(filters.to) || "Até"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DateTimePicker
                    isVisible={showStartDatePicker}
                    date={filters.from}
                    onCancel={onStartCancel}
                    onConfirm={onStartConfirm}
                    mode="date"
                />

                <DateTimePicker
                    isVisible={showEndDatePicker}
                    date={filters.to}
                    onCancel={onEndCancel}
                    onConfirm={onEndConfirm}
                    mode="date"
                />
            </View>
        </>
    )
}