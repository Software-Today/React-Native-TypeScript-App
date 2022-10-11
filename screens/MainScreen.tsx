import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  
import React, { useContext, useState, useEffect } from "react";
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { CredentialsContext } from "../context/CredentialsContext";

import { ROUTES } from '../utility/Routes';

export default function MainScreen({ navigation }: RootStackScreenProps<'Main'>) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  async function logout() {
    setStoredCredentials(); 
    navigation.navigate(ROUTES.HOME, {isAuhenticated: false}); 
  }

  return (
    <>
      <View style={{flex:1}} >  
        <StatusBar backgroundColor='red' barStyle='light-content' />  
        <View style={styles.header}>  
            <Icon name='ios-home' size={28} color='white'
              onPress={() => navigation.navigate(ROUTES.HOME, {isAuhenticated: true})}/>
            <Icon name="ios-log-out" size={28} color='white' 
              onPress={logout}/>  
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Main Screen.</Text>
      </View>
    </>
  );
}

MainScreen.navigationOptions={  
  tabBarIcon:({tintColor, focused})=>(  
  <Icon  
      name={focused ? 'ios-home' : 'md-home'}  
      color={tintColor}  
      size={25}  
  />  
)  
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  },  
  header:{  
      flexDirection: 'row',  
      alignItems: 'center',  
      justifyContent: 'space-between',  
      backgroundColor: 'black',  
      paddingHorizontal: 18,  
      paddingTop: 30,  
  }  
});
