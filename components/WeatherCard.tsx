import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

export default function WeatherCard({data}) {
    let time;
    var date = new Date(data.detail.dt*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    time = hours + ':' + minutes.substr(-2);

    return (
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
    )
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:0,
		borderRadius:20
	},
	time:{
		fontSize:38,
		color:'#fff'
	},
	notes: {
		fontSize: 18,
		color:'#fff',
		textTransform:'capitalize'
	}
});