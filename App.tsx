import { GestureHandlerRootView } from "react-native-gesture-handler"
import { AuthContextProvider } from "@/context/auth.context"
import "./src/styles/global.css"

import NavigationRoutes from "@/routes"
import { SnackbarContextProvider } from "@/context/snackbar.context"
import { SnackBar } from "@/components/SnackBar"
import { BottomSheetProvider } from "@/context/bottomsheet.context"
import { TransactionContextProvider } from "@/context/transaction.context"


export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigationRoutes />
              <SnackBar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  )
}
