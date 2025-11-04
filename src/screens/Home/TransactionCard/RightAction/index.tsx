import { TouchableOpacity } from "react-native"
import { FC, useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"



import { colors } from "@/shared/colors"
import { DeleteModal } from "./DeleteModal"
import * as transactionService from "@/shared/services/dt-money-app/transaction.service"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"
import { useSnackbarContext } from "@/context/snackbar.context"

interface Params {
    transactionId: number
}

export const RightAction: FC<Params> = ({
    transactionId
}) => {
    const [modalVisile, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const { notify } = useSnackbarContext()

    const showModal = () => setModalVisible(true)

    const hideModal = () => setModalVisible(false)

    const { handlerError } = useErrorHandler()

    const handleDeleteTransaction = async () => {
        try {
            setLoading(true)
            await transactionService.deleteTransaction(transactionId)
            notify({
                message: "Transação apagada com sucesso!",
                messageType: "SUCCESS"
            })
            hideModal()
        } catch (error) {
            handlerError(error, "Falha ao apagar a transação!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TouchableOpacity
                className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
                onPress={showModal}
            >

                <MaterialIcons
                    name="delete-outline"
                    color={colors.white}
                    size={30}
                />
            </TouchableOpacity>
            <DeleteModal
                visible={modalVisile}
                hideModal={hideModal}
                handleDeleteTransaction={handleDeleteTransaction}
                loading={loading}
            />
        </>
    )
}