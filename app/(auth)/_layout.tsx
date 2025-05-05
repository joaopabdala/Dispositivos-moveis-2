import { Drawer } from 'expo-router/drawer';

export default function HomeLayout() {
  return (
    <Drawer screenOptions={{
      headerStyle :{
        backgroundColor: 'red'
      },
      headerTintColor: 'black',
    }}>
      <Drawer.Screen name="profile" options={{ title: 'Perfil' }} />
      <Drawer.Screen name="tags" options={{ title: 'Suas Tags' }} />
      <Drawer.Screen name="home" options={{ title: 'Home' }} />
      <Drawer.Screen name="logout" options={{ title: 'Logout' }} />
    </Drawer>
  );
}
