import { createContext, FC, PropsWithChildren, useContext, useState } from "react"

export type SnackbarMessageType = "ERROR" | "SUCCESS"

interface NotifyMessageParams {
    message: string
    messageType: SnackbarMessageType
}

export type SnackbarContextType = {
    message: string | null
    type: SnackbarMessageType | null
    notify: (params: NotifyMessageParams) => void
}

const SnackbarContext = createContext({} as SnackbarContextType)

export const SnackbarContextProvider: FC<PropsWithChildren> = ({
    children
}) => {

    const [message, setMessagr] = useState<string | null>(null)
    const [type, setType] = useState<SnackbarMessageType | null>(null)

    const notify = ({ message, messageType }: NotifyMessageParams) => {
        setMessagr(message)
        setType(messageType)

        setTimeout(() => {
            setMessagr(null)
            setType(null)
        }, 3000)
    }

    return (
        <SnackbarContext.Provider
            value={{
                message,
                type,
                notify
            }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext)
    
    return context
}