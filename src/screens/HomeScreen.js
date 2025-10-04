import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>مرحبا بكم في محفظة نواة!</Text>
      <Button title="محفظتي" onPress={() => navigation.navigate('WalletScreen')} />
      <Button title="سجل المعاملات" onPress={() => navigation.navigate('TransactionHistoryScreen')} />
      <Button title="الإعدادات" onPress={() => navigation.navigate('SettingsScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
