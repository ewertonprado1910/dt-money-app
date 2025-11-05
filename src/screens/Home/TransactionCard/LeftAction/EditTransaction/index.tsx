import { FC, useState } from "react"
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import CurrencyInput from "react-native-currency-input"
import { MaterialIcons } from "@expo/vector-icons"
import * as Yup from "yup"


import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { colors } from "@/shared/colors"

import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"
import { ErrorMessage } from "@/components/ErrorMessage"
import { SelectCategoryModal } from "@/components/SelectCategoryModal"
import { TransactionTypeSelector } from "@/components/SelectType"
import { AppButton } from "@/components/AppButton"
import { TransactionSchema } from "./schema"
import { Transaction } from "@/shared/interfaces/transaction"
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request copy"

type ValidationErrorsTypes = Record<keyof UpdateTransactionInterface, string>

interface Params {
    transaction: Transaction
}

export const EditTransactionForm: FC<Params> = (
    { transaction: transactionToUpdate }) => {

    const { closeBottomSheet } = useBottomSheetContext()
    const { updateTransaction } = useTransactionContext()
    const { handlerError } = useErrorHandler()

    const [loading, setLoading] = useState(false)

    const [transaction, setTransaction] =
        useState<UpdateTransactionInterface>({
            categoryId: transactionToUpdate.categoryId,
            description: transactionToUpdate.description,
            id: transactionToUpdate.id,
            typeId: transactionToUpdate.typeId,
            value: transactionToUpdate.value
        })
    const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>()


    const handleUpdateTransaction = async () => {
        try {
            setLoading(true)
            await TransactionSchema.validate(transaction, {
                abortEarly: false
            })
            await updateTransaction(transaction)
            closeBottomSheet()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {} as ValidationErrorsTypes

                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path as keyof UpdateTransactionInterface] = err.message
                    }
                })
                setValidationErrors(errors)
            } else {
                handlerError(error, "Falha ao atualizar transação")
            }
        } finally {
            setLoading(false)
        }
    }

    const setTransactionData = (key: keyof
        UpdateTransactionInterface, value: string | number) => {
        setTransaction((prevData) => ({ ...prevData, [key]: value }))
    }

    return (
        <View className="px-5 py-3" >
            <TouchableOpacity
                onPress={closeBottomSheet}
                className="w-full flex-row items-center justify-between">
                <Text className="text-white text-xl font-bold">
                    Editar transação
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
                {validationErrors?.description && (
                    <ErrorMessage>{validationErrors.description}</ErrorMessage>
                )}
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
                {validationErrors?.value && (
                    <ErrorMessage>{validationErrors.value}</ErrorMessage>
                )}
                <SelectCategoryModal
                    selectedCategory={transaction.categoryId}
                    onSelect={(categoryId) =>
                        setTransactionData("categoryId", categoryId)
                    }
                />
                {validationErrors?.categoryId && (
                    <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
                )}

                <TransactionTypeSelector
                    typeId={transaction.typeId}
                    setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
                />
                {validationErrors?.typeId && (
                    <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
                )}
                <View className="my-4">
                    <AppButton onPress={handleUpdateTransaction}>
                        {loading
                            ? <ActivityIndicator color={colors.white} />
                            : "Atualizar"
                        }
                    </AppButton>
                </View>
            </View>

        </View>
    )
}