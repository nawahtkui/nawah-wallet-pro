import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'محفظة نواة' }} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} options={{ title: 'محفظتي' }} />
        <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} options={{ title: 'سجل المعاملات' }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'الإعدادات' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
