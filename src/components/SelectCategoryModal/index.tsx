import { useTransactionContext } from "@/context/transaction.context"
import clsx from "clsx"
import { useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

export const SelectCategoryModal = () => {
    const [showModal, setShowModal] = useState(false)

    const { categories } = useTransactionContext()
    console.log(categories)
    
    const handleModal = () => setShowModal((prevState) => !prevState)

    return (
        <>
            <TouchableOpacity
                onPress={handleModal}
                className="h-[50] bg-background-primary my-2 rounded-[6] pl-4 justify-center"
            >
                <Text className={clsx("text-gray-700 text-lg")}>
                    Categoria
                </Text>
            </TouchableOpacity>

            <Modal
                visible={showModal}
                transparent
                animationType="slide">
                <TouchableWithoutFeedback
                    onPress={handleModal}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
                            <Text className="text-white text-lg mb-4">
                                Selecione uma categoria
                            </Text>
                            <FlatList
                                data={categories}
                                renderItem={({ item }) => (
                                    <TouchableOpacity>
                                        <Text>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </>
    )
}