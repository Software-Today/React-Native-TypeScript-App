import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Main from '../screens/MainScreen';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import { ROUTES } from '../utility/Routes';
const Tab = createMaterialTopTabNavigator();


export default function TopTab() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={Main}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name={ROUTES.SETTING}
        component={Setting}
        options={{ tabBarLabel: 'Setting' }}
      />
    </Tab.Navigator>
  );
}