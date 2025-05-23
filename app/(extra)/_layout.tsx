import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(notification)/index" options={{ headerShown: false }} />
            <Stack.Screen name="(property-detail)/index" options={{ headerShown: false }} />
            <Stack.Screen name="(property-detail)/recommended" options={{ headerShown: false }} />
            <Stack.Screen name="(property-detail)/near-by" options={{ headerShown: false }} />
            <Stack.Screen name="(bookings)/index" options={{ headerShown: false }} />    
            <Stack.Screen name="(help-&-support)/index" options={{ headerShown: false }} />    
            <Stack.Screen name="(listings)/index" options={{ headerShown: false }} />    
            <Stack.Screen name="(profile)/index" options={{ headerShown: false }} />    
            <Stack.Screen name="(settings)/index" options={{ headerShown: false }} />    
            <Stack.Screen name="(transactions)/index" options={{ headerShown: false }} />
        </Stack>
    );
}
