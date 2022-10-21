import { StyleSheet, StatusBar, Image } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, Card, Divider } from 'react-native-elements';

import { get, post, get_weather } from '../api/auth';
import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import BottomTab from '../components/BottomTab';
import WeatherCard from '../components/WeatherCard';

export default function MainScreen({ navigation }: RootStackScreenProps<'Main'>) {

  // const [weatherData, setWeatherData] = useState({});
  
  var weather = get_weather();
  console.log('weather', weather);
  var data = {
              "detail": {
                "dt": 1666367904, 
                "main": {"temp":2.99,"feels_like":-1.18,"temp_min":2.99,"temp_max":2.99,"pressure":1021,"humidity":70}, 
                "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}]
              }, 
              "location": "Voronezh"
            }
  // useEffect( () => {
    // setWeatherData(data);
  // }, [data]);
  // console.log(weatherData);
  let time;
  var date = new Date(data.detail.dt*1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  time = hours + ':' + minutes.substr(-2);

  return (
    <>  
      <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.notes}>{data.location}</Text>
            
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Image style={{width:100, height:100}} source={{uri:"https://openweathermap.org/img/w/" + data.detail.weather[0].icon + ".png"}} />
                <Text style={styles.time}>{time}</Text>
            </View>

            <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
            
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.notes}>{data.detail.weather[0].description}</Text>
                <Text style={styles.notes}>{Math.round( data.detail.main.temp * 10) / 10 }&#8451;</Text>
            </View>
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
  },
  card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
    flex: 1,
    height: '40%',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
    padding: 25
	},
	time:{
		fontSize:38,
		color:'black'
	},
	notes: {
		fontSize: 18,
		color:'black',
		textTransform:'capitalize'
	}


});
