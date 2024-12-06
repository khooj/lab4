import { StyleSheet, View, Text, Image } from 'react-native';

export type ListItemProps = {
  imageUrl: string,
  desc: string,
  langName: string,
};

const text = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

const stylesInner = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    //justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
})

const ListItem = ({ imageUrl, desc, langName }: ListItemProps) => {
  return (
    <View>
      <View style={stylesInner.container}>
        <Image source={{ uri: imageUrl }} style={{ width: 50, height: 50 }} />
        <Text style={stylesInner.text}>{langName}</Text>
      </View>
      <Text style={text.text}>{desc}</Text>
    </View>
  )
};

export default ListItem;
