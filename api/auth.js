import axios from 'axios';
import Constant from '../constants/apiConstant';

export const post = async (param, url) => {
    var api_url = Constant.SERVER_URL + url;
    console.log(param, api_url);
    try {
        const response = await axios.post(api_url, param);
        if(response.data.success)  return { status: true, user: response.data.user };
        else return { status: false, msg: response.data.message }
      } catch (error) {
        return { status: false, msg: error};
      }
}