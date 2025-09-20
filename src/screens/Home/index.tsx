import { SafeAreaView } from "react-native-safe-area-context"

import { useAuthContext } from "@/context/auth.context"

import { AppHeader } from "@/components/AppHeader"


export const Home = () => {
    const { handleLogout } = useAuthContext()
    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <AppHeader/>
        </SafeAreaView>
    )
}