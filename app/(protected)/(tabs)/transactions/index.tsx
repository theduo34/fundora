import ScreenLayout from "@/components/layout/screen-layout";
import { Text } from "react-native";

export default function TransactionsScreen() {
  return (
    <ScreenLayout screen={"transactions"}>
      <Text className={"text-red-500"}>
        Transactions screen
      </Text>
    </ScreenLayout>
  );
}
