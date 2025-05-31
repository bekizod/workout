 import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden={false} />

      <Stack>
         <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
          />
          </View>
         
      </Stack>
   </GestureHandlerRootView>
  );
}