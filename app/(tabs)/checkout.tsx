import { RefreshControl, FlatList, View, Text, Image, Button } from 'react-native';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import { ProductData, ProductsContext } from '@/store/store';


const CheckoutListItem = observer((props: ProductData & { count: number, checkoutId: number }) => {
  const productsStore = useContext(ProductsContext);

  const { image, title, checkoutId, count } = props;
  return (<View>
    <View>
      <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
      <Text>{`${title} (x${count})`}</Text>
    </View>
    <View>
      <Button title='+' onPress={() => productsStore.increaseCheckoutItem(checkoutId)} />
      <Button title='-' onPress={() => productsStore.decreaseCheckoutItem(checkoutId)} />
      <Button title='Удалить' onPress={() => productsStore.removeCheckoutItem(checkoutId)} />
    </View>
  </View>);
});

export default observer(function Checkout() {
  const productsStore = useContext(ProductsContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    productsStore.fetchCheckout();
  }, []);

  const loadCheckout = () => {
    setRefreshing(true);
    productsStore.fetchCheckout();
    setRefreshing(false);
  };

  return (
    <View>
      <FlatList
        data={productsStore.checkout}
        keyExtractor={el => el.id.toString()}
        renderItem={({ item }) => {
          const productItem = productsStore.products.find(el => el.id === item.item_id)!;
          return <CheckoutListItem {...productItem} count={item.count} checkoutId={item.id} />
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadCheckout} />}
      />
    </View>
  );
})
