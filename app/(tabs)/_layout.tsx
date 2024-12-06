import { ProductsContext } from '@/store/store';
import { Tabs } from 'expo-router';
import { useContext, useEffect } from 'react';

export default function TabLayout() {
  const productsStore = useContext(ProductsContext);

  useEffect(() => {
    productsStore.fetchProducts();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Список товаров' }} />
      <Tabs.Screen name="checkout" options={{ title: 'Корзина' }} />
      <Tabs.Screen name="debug" />
    </Tabs>
  )
}
