import { format, isValid } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (date?: Date) => {
    if (!date || !isValid(date)) {
        return undefined
    }
    return format(date, "dd/MM/yyyy", {
        locale: ptBR
    })
}

export const formatDayendMonth = (date?: Date) => {
    if (!date || !isValid(date)) {
        return undefined
    }
    return format(date, "d MMMM", {
        locale: ptBR
    })
}
