import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function Setting({ navigation }: RootStackScreenProps<'Setting'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
    </View>
  );
}

Setting.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>(  
        <Icon  
            name={focused ? 'ios-settings' : 'md-settings'}  
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
});
