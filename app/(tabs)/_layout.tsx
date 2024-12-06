import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Мои языки программирования' }} />
      <Tabs.Screen name="about" options={{ title: 'Обо мне' }} />
    </Tabs>
  )
}
