import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { ProductsContext, type ProductData } from '@/store/store';
import { useContext } from 'react';

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

const ListItem = (props: ProductData) => {
  const {
    id,
    description,
    rating,
    title,
    image,
    price,
    category
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
          <Text style={{ fontSize: 14 }}>{`${rating.rate} (${rating.count})`}</Text>
        </View>
        <Text style={text.text}>{description}</Text>
      </View>
      <Button title={`Checkout ${price}$`} onPress={() => onPress(id)} />
    </View>
  )
};

export default ListItem;
