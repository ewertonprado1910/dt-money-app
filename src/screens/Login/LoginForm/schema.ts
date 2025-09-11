import * as yup from "yup"

export const schema = yup.object().shape({
    email: yup.
        string()
        .email("E-mail é obrigatóri")
        .required("E-mail inválido"),
    password: yup.
        string()
        .min(6, "A senha é obrigatória ")
        .required("A senha deve ter no minímo 6 caracteres")
})

