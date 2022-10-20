import { StyleSheet, StatusBar } from 'react-native';
import React from "react";

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import BottomTab from '../components/BottomTab';

export default function MainScreen({ navigation }: RootStackScreenProps<'Main'>) {
  return (
    <>  
      <View style={styles.container}>
        <Text style={styles.title}>Main Page.</Text>
      </View>
      <BottomTab navigation={navigation}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  wrapper: {  
    flex: 1,  
  }
});
