import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { TextInputProps, View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { TextInput } from "react-native-gesture-handler"

import { clsx } from "clsx"

import { colors } from "@/shared/colors"
import { useRef, useState } from "react"
import { ErrorMessage } from "../ErrorMessage"

interface AppInputParams<T extends FieldValues> extends TextInputProps {
    control: Control<T>,
    name: Path<T>
    leftIconName?: keyof typeof MaterialIcons.glyphMap
    label?: string
}

export const AppInput = <T extends FieldValues>({
    control,
    name,
    leftIconName,
    label,
    secureTextEntry,
    ...rest

}: AppInputParams<T>) => {

    const [isFocused, setFocused] = useState(false)
    const inputRef = useRef<TextInput>(null)
    const [showText, setShowText] = useState(secureTextEntry)

    const checkFocus = () => {
        if (inputRef.current) {
            setFocused(inputRef.current.isFocused())
        }
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {

                return (
                    <View className="w-full mt-10">
                        {label && (
                            <Text
                                className={clsx(
                                    "mb-2 mt-3 text-base",
                                    isFocused ? "text-accent-brand" : "text-gray-600"
                                )}
                            >
                                {label}
                            </Text>
                        )}

                        <TouchableOpacity className="flex-row items-center justify-center border-b-[1px] border-gray-600 px-3 py-2 h-16">
                            {leftIconName && (
                                <MaterialIcons
                                    name={leftIconName}
                                    color={isFocused ? colors["accent-brand"] : colors.gray[600]}
                                    size={25}
                                    className="mr-2"
                                />
                            )}

                            <TextInput
                                className="flex-1 text-base text-gray-500"
                                {...rest}
                                value={value}
                                onChangeText={onChange}
                                placeholderTextColor={colors.gray[700]}
                                onFocus={checkFocus}
                                onEndEditing={checkFocus}
                                ref={inputRef}
                                secureTextEntry={showText}
                            />

                            {secureTextEntry && (
                                <TouchableOpacity
                                    onPress={() => setShowText((value) => !value)}>
                                    <MaterialIcons
                                        color={colors.gray[600]}
                                        size={25}
                                        name={showText ? "visibility" : "visibility-off"}
                                    />
                                </TouchableOpacity>
                            )

                            }
                        </TouchableOpacity>
                        {error && (
                            <ErrorMessage>{error.message}</ErrorMessage>
                        )}
                    </View>
                )
            }}
        />
    )
}