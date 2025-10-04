import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import web3Service from '../services/web3Service';

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const txs = await web3Service.getTransactionHistory();
        setTransactions(txs);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
    fetchTransactions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Hash: {item.hash}</Text>
      <Text>Value: {item.value} NWTK</Text>
      <Text>From: {item.from}</Text>
      <Text>To: {item.to}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سجل المعاملات</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.hash}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
