import * as Yup from "yup"

export const TransactionSchema = Yup.object().shape({
    description: Yup.string().required("Descrição é obrigatória"),
    value: Yup.number()
        .min(0.01, "Deve ser no mínimo 0.01")
        .required("Valor é obrigatório"),
    typeId: Yup.number()
        .min(1, "Selecione um tipo de transação")
        .required("Tipo de transação é obrigatório"),
    categoryId: Yup.number()
        .min(1, "Selecione uma categoria")
        .required("Categoria de transação é obrigatória"),
})