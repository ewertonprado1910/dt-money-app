import { useState } from "react"
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import CurrencyInput from "react-native-currency-input"
import { MaterialIcons } from "@expo/vector-icons"
import * as Yup from "yup"

import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { TransactionTypeSelector } from "../SelectType"

import { colors } from "@/shared/colors"
import { SelectCategoryModal } from "../SelectCategoryModal"
import { TransactionSchema } from "./schema"
import { AppButton } from "../AppButton"
import { ErrorMessage } from "../ErrorMessage"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"

type ValidationErrorsTypes = Record<keyof CreateTransactionInterface, string>

export const NewTransaction = () => {
    const { closeBottomSheet } = useBottomSheetContext()
    const { createTransaction } = useTransactionContext()
    const { handlerError } = useErrorHandler()

    const [loading, setLoading] = useState(false)

    const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>()
    const [transaction, setTransaction] =
        useState<CreateTransactionInterface>({
            description: "",
            typeId: 0,
            categoryId: 0,
            value: 0
        })

    const handleCreateTransaction = async () => {
        try {
            setLoading(true)
            await TransactionSchema.validate(transaction, {
                abortEarly: false
            })
            await createTransaction(transaction)
            closeBottomSheet()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {} as ValidationErrorsTypes

                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path as keyof CreateTransactionInterface] = err.message
                    }
                })
                setValidationErrors(errors)
            } else {
                handlerError(error, "Falha ao criar trasação")
            }
        } finally {
            setLoading(false)
        }
    }

    const setTransactionData = (key: keyof
        CreateTransactionInterface, value: string | number) => {
        setTransaction((prevData) => ({ ...prevData, [key]: value }))
    }

    return (
        <View className="  px-5 py-3" >
            <TouchableOpacity
                onPress={closeBottomSheet}
                className="w-full flex-row items-center justify-between">
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
                    <AppButton onPress={handleCreateTransaction}>
                        {loading
                            ? <ActivityIndicator color={colors.white} />
                            : "Registrar"
                        }
                    </AppButton>
                </View>
            </View>

        </View>
    )
}