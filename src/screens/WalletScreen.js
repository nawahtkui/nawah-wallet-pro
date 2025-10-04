import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import web3Service from '../services/web3Service';

export default function WalletScreen() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      const b = await web3Service.getBalance('0xYourAddressHere');
      setBalance(b);
    }
    fetchBalance();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>رصيد المحفظة:</Text>
      <Text style={styles.balance}>{balance} NWTK</Text>
      <Button title="إرسال رموز" onPress={() => alert('Send functionality coming soon')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 20, marginBottom: 10 },
  balance: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
