import * as yup from "yup"

export const schema = yup.object().shape({
    email: yup
        .string()
        .email("Digite um e-mail válido")
        .required("E-mail é obrigatório"),
    password: yup
        .string()
        .min(6, "A senha é obrigatória ")
        .required("A senha deve ter no minímo 6 caracteres"),
    name: yup.
        string().required("Nome é obrigatório"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas devem ser iguais")
        .required("Confirmação de senha é obrigatória")
})
