import { AuthContextProvider } from "@/context/auth.context"
import "./src/styles/global.css"

import NavigationRoutes from "@/routes"
import { SnackbarContextProvider } from "@/context/snackbar.context"
import { SnackBar } from "@/components/SnackBar"

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
        <SnackBar/>
      </AuthContextProvider>
    </SnackbarContextProvider>
  )
}
