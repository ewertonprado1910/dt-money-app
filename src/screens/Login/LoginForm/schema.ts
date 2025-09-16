import * as yup from "yup"

export const schema = yup.object().shape({
    email: yup.
        string()
        .email("Digite um e-mail válido!")
        .required("O e-mail é obrigatório"),
    password: yup.
        string()
        .min(6, "A senha é obrigatória ")
        .required("A senha deve ter no minímo 6 caracteres")
})

