import { StyleSheet, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from "react";

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import BottomTab from '../components/BottomTab';
import { get, post, get_weather } from '../api/auth';

export default function MainScreen({ navigation }: RootStackScreenProps<'Main'>) {

  const [weatherData, setWeatherData] = React.useState([])
  useEffect( () => {
    const fetchWeather =  async() => {
      return get_weather();
    };
    fetchWeather().then((res) => {
      console.log(res);
      
    })
  });

  return (
    <>  
      <View style={styles.container}>
        <View style={styles.weather} >
          <Text style={styles.weather_text}>Weather</Text>
        </View>  
      </View>
      <BottomTab navigation={navigation}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',  
    backgroundColor: '#f2f2f2',
    paddingTop: 32
  },
  weather: {
    backgroundColor: '#00b4d8',
    flex: 1,
    height: '40%',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
    padding: 25
  }, 
  weather_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25
  }

});
