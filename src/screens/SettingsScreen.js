import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>الإعدادات</Text>
      <Button title="تغيير كلمة المرور" onPress={() => alert('Coming soon')} />
      <Button title="نسخ الاسترجاع" onPress={() => alert('Coming soon')} />
      <Button title="تسجيل الخروج" onPress={() => alert('Coming soon')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
