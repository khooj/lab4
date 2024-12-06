import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import ListItem from '@/components/ListItem';
import type { ListItemProps } from '@/components/ListItem';

type ListItemPropsKey = ListItemProps & {
  key: string,
};

const data: ListItemPropsKey[] = [
  {
    key: '0',
    langName: 'Rust',
    desc: 'Начал изучать в 2019 году как язык для пет-проектов. Очень понравился проработанной семантикой.',
    imageUrl: 'https://files.mastodon.social/accounts/avatars/109/356/701/975/573/606/original/fc413d3a921a2d09.jpeg'
  },
  {
    key: '1',
    langName: 'Elixir',
    desc: 'Изучаю для освоения других парадигм программирования (функциональной) и принципов построения приложений на основе акторной модели.',
    imageUrl: 'https://vectorseek.com/wp-content/uploads/2023/10/Elixir-Logo-Vector.svg-.png'
  },
  {
    key: '2',
    langName: 'Golang',
    desc: 'Основной язык для профессиональной деятельности. Хорош своей простотой, этим же и плох.',
    imageUrl: 'https://cdn.vectorstock.com/i/1000v/77/94/golang-emblem-blue-gopher-vector-27827794.jpg'
  },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setUserData(data);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={item => (
          <ListItem
            langName={item.item.langName}
            desc={item.item.desc}
            imageUrl={item.item.imageUrl}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
