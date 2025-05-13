import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(notification)/notification" options={{ headerShown: false }} />
            <Stack.Screen name="(property-detail)/recommended" options={{ headerShown: false }} />
            <Stack.Screen name="(property-detail)/near-by" options={{ headerShown: false }} />
        </Stack>
    );
}