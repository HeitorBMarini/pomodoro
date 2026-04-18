import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import React from 'react';

type TScreenDefinitions = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<TScreenDefinitions>();

export function AppRoutes() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TNavigationScreenProps = NavigationProp<TScreenDefinitions>;