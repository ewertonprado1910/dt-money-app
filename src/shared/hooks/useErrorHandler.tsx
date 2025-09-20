import { useSnackbarContext } from "@/context/snackbar.context"
import { AppError } from "../helpers/AppError"


export const useErrorHandler = () => {

    const { notify } = useSnackbarContext()

    const handlerError = (error: unknown, defaulMessage?: string) => {
        const isAppError = error instanceof AppError

        const message = isAppError ? error.messsage : defaulMessage ?? "Falha na requisição"

        notify({
            message,
            messageType: "ERROR"
        })
    }
    return {
        handlerError
    }
}