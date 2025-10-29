import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TransactionCardType } from "..";

export const CARD_DATA: Record<TransactionCardType, CardData> = {
    [TransactionTypes.EXPENSE]: {
        label: "Saida",
        bgColor: "background-tertiary",
        color: "text-red-400"
    },
    [TransactionTypes.REVENUE]: {
        label: "Entrada",
        bgColor: "background-tertiary",
        color: "text-green-500"
    },
    total: {
        label: "Total",
        bgColor: "accent-brand-background-primary",
        color: "text-white"
    }
}

type TextColor = "text-white" | "text-red-400" | "text-green-500"

interface CardData {
    label: string
    bgColor: string
    color: TextColor
}