import {Text} from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";

const TransactionsScreen = () => {
  return(
    <ScreenLayout screen={"transactions"}>
      <Text className={"text-muted-foreground"}>
        Transactions screen
      </Text>
    </ScreenLayout>
  )
}
export default TransactionsScreen;