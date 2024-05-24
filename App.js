import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error(error);
      } 
    }
    prepare();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      <Routes />
    </NavigationContainer>
  );
}
