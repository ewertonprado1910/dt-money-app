import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react"
import {
  Modal,
  View,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native"
import { colors } from "@/shared/colors"

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, snapIndex?: number) => void
  closeBottomSheet: () => void
}

export const BottomSheetContext = createContext({} as BottomSheetContextType)

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const screenHeight = Dimensions.get("window").height
  const translateY = useRef(new Animated.Value(screenHeight)).current

  const snapPoints = [screenHeight * 0.9, screenHeight * 0.9]

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, snapIndex: number = 0) => {
      setContent(newContent)
      setIsOpen(true)

      Animated.timing(translateY, {
        toValue: screenHeight - snapPoints[snapIndex],
        duration: 250,
        useNativeDriver: true,
      }).start()
    },
    [screenHeight, snapPoints]
  )

  const closeBottomSheet = useCallback(() => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false)
      setContent(null)
    })
  }, [screenHeight])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(
            screenHeight - snapPoints[0] + gestureState.dy
          )
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > screenHeight * 0.25) {
          closeBottomSheet()
        } else {
          Animated.spring(translateY, {
            toValue: screenHeight - snapPoints[0],
            useNativeDriver: true,
          }).start()
        }
      },
    })
  ).current

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}

      <Modal visible={isOpen} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className="flex-1 bg-black/70 justify-end" />
        </TouchableWithoutFeedback>

        <Animated.View
          {...panResponder.panHandlers}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            transform: [{ translateY }],
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: colors["background-secondary"],
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                elevation: 9,
                shadowColor: colors["accent-brand"],
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                padding: 20,
                maxHeight: "90%",
            
              }}
            >
              {content}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </Modal>
    </BottomSheetContext.Provider>
  )
}

export const useBottomSheetContext = () => useContext(BottomSheetContext)

