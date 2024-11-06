import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
export default function Layout() {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#009dff",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </UserProvider>
  );
}
