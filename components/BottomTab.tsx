import React, { useContext, useState, useEffect } from 'react';  
import {StyleSheet, Text, View,Button, StatusBar} from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';  

import Main from '../screens/MainScreen';
import Profile from '../screens/ProfileScreen';
import Setting from '../screens/SettingScreen';
import { ROUTES } from '../utility/Routes';
import { CredentialsContext } from "../context/CredentialsContext";
import { RootStackScreenProps } from '../types';

export default function BottomTab({navigation}) {  
    const [currentUser, setCurrentUser] = React.useState(null);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  
    async function logout() {
        setStoredCredentials(); 
        navigation.navigate(ROUTES.HOME, {isAuhenticated: false}); 
    }
    
    return (
    <View style={styles.header}>
      <StatusBar backgroundColor='black' barStyle='light-content' />

        <Icon name='ios-home' size={28} color='white' onPress={() => navigation.navigate(ROUTES.MAIN, {isAuhenticated: true})}/>
        <Icon name='ios-construct' size={28} color='white' onPress={() => navigation.navigate(ROUTES.SETTING, {isAuhenticated: true})}/>
        <Icon name='ios-person' size={28} color='white' onPress={() => navigation.navigate(ROUTES.PROFILE, {isAuhenticated: true})}/>
        <Icon name="ios-log-out" size={28} color='white' 
        onPress={logout}/>
    </View> 
    );  
}  

  const styles = StyleSheet.create({
    header:{  
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',  
        backgroundColor: '#8bc34a',  
        paddingHorizontal: 18,  
        paddingTop: 10,
        paddingBottom: 10  
    }  
  });