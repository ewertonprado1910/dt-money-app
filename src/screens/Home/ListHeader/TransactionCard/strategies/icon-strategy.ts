import { MaterialIcons } from "@expo/vector-icons"

import { TransactionTypes } from "@/shared/enums/transaction-types"
import { TransactionCardType } from ".."
import { colors } from "@/shared/colors"

export const ICONS: Record<TransactionCardType, IconData> = {
    [TransactionTypes.REVENUE]: {
        color: colors["accent-brand-light"],
        name: "arrow-circle-up"
    },
    [TransactionTypes.EXPENSE]: {
        color: colors["accent-red"],
        name: "arrow-circle-down"
    },
    total: {
        name: "attach-money",
        color: colors.white
    }
}

interface IconData {
    name: keyof typeof MaterialIcons.glyphMap
    color: string
}