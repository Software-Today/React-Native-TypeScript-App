import axios from 'axios';
import NetworkInfo from 'react-native-network-info';
import Constant from '../constants/apiConstant';

export const post = async (param, url) => {
    var api_url = Constant.SERVER_URL + url;
    try {
        const response = await axios.post(api_url, param);
        if(response.data.success)  return { status: true, user: response.data.user };
        else return { status: false, msg: response.data.message }
      } catch (error) {
        return { status: false, msg: error};
      }
}

export const get = async(url) => {
  var api_url = Constant.SERVER_URL + url;
  console.log(api_url);
  try{
    const response = await axios.get(api_url);
    return response.data;
  } catch(error) {
    return {status: false, msg: error};
  }
}

export const get_weather = async() => {
  // https://api.ip2location.com/v2/?ip=188.43.136.41&key=MOHEUZUJXT&package=WS25
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  const myIP = await (await axios.get(Constant.IP_API)).data.ip;
  const location_url = Constant.LOCATION_API + myIP + Constant.LOCATION_KEY;
  console.log(myIP);
  try {
    const location = await axios.get(location_url);
    var latitude = location.data.latitude;
    var longitude = location.data.longitude;
    const weather_url = Constant.WEATHER_API + latitude + '&lon=' + longitude + '&appid=' + Constant.WEATHER_KEY;
    console.log(weather_url);
    const weather_data = await axios.get(weather_url);
    console.log(weather_data.data);
    return weather_data.data;
  } catch(error) {

  }
}