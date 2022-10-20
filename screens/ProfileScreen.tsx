import Icon from 'react-native-vector-icons/Ionicons';  
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { ROUTES } from '../utility/Routes';

export default function ProfileScreen({ navigation }: RootStackScreenProps<'Profile'>) {
  return (
    <>
      <View style={{flex:1}} >  
        <StatusBar backgroundColor='red' barStyle='light-content' />  
        <View style={styles.header}>  
            <Icon 
              name='ios-home' size={28} color='white'
              onPress={() => navigation.navigate(ROUTES.HOME, {isAuhenticated: true})}/>
            <Icon 
              name='ios-person' 
              size={28} color='white' 
              onPress={() => navigation.navigate(ROUTES.PROFILE, {isAuhenticated: true})}/>  
        </View>  
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Profile Screen.</Text>
      </View>
  </>
  );
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
