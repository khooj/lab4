import { ProductsContext } from "@/store/store";
import { observer } from "mobx-react";
import { useContext } from "react";
import { View, Button } from "react-native";

export default observer(() => {
  const productsStore = useContext(ProductsContext);

  return <View>
    <Button onPress={() => productsStore.dropDatabase()} title='Drop database' />
  </View>
});
