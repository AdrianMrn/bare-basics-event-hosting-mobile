/* import apisauce from 'apisauce' */
import axios from 'axios';
import Config from 'react-native-config'
import { AsyncStorage } from "react-native"

/* const apiUrl = Config.API_URL; */

const apiUrl = 'http://10.0.3.2:8000/api';

function setAccessToken() {
  /* if (accesToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accesToken}`;
  } */
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

export function apiLogin(data, next) {
  setAccessToken();
  axios.post(`${apiUrl}/user/authenticate`, {
    email: data.email,
    password: data.password
  })
    .then(response => {
      AsyncStorage.setItem('userToken', response.data.access_token, () => {
        next(false, response);
      });
    })
    .catch(error => {
      next(error);
    });
}

export function apiRegister(data, next) {
  setAccessToken();
  axios.post(`${apiUrl}/user/register`, {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password
  })
    .then(response => {
      AsyncStorage.setItem('userToken', response.data.access_token, () => {
        next(false, response);
      });
    })
    .catch(error => {
      next(error);
    });
}
