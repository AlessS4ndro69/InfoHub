import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './src/components/Main';
import 'expo-dev-client';


export default function App() {
  
    return <SafeAreaProvider><Main /></SafeAreaProvider>
  
}

