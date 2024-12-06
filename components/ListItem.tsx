import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { ProductsContext, type ProductData } from '@/store/store';
import { useContext } from 'react';
import { observer } from 'mobx-react';

const text = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

const stylesInner = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    //justifyContent: 'center',
    maxWidth: '70%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const ListItem = observer((props: ProductData) => {
  const {
    id,
    description,
    title,
    image,
    price,
  } = props;

  const productsStore = useContext(ProductsContext);

  const onPress = (id: number) => {
    productsStore.addCheckoutItem(id);
  };

  return (
    <View style={{ padding: 5, flex: 1 }}>
      <View>
        <View style={stylesInner.container}>
          <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
          <Text style={stylesInner.text}>{title}</Text>
        </View>
        <Text style={text.text}>{description}</Text>
      </View>
      <Button title={`Добавить в корзину за ${price}$`} onPress={() => onPress(id)} />
    </View>
  )
});

export default ListItem;
