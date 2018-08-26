/* import apisauce from 'apisauce' */
import axios from 'axios';
import Config from 'react-native-config'
import { AsyncStorage } from "react-native"

/* const apiUrl = Config.API_URL; */

/* const apiUrl = 'http://3.120.104.63/api'; // TODO: set in .env */
const apiUrl = 'http://10.0.3.2:8000/api';

async function setAccessToken() {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  return true;
}

export function apiLogin(data, next) {
  axios.post(`${apiUrl}/user/authenticate`, {
    email: data.email,
    password: data.password
  })
    .then(response => {
      AsyncStorage.setItem('accessToken', response.data.access_token, () => {
        next(false, response);
      });
    })
    .catch(error => {
      next(error);
    });
}

export function apiRegister(data, next) {
  axios.post(`${apiUrl}/user/register`, {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password
  })
    .then(response => {
      AsyncStorage.setItem('accessToken', response.data.access_token, () => {
        next(false, response);
      });
    })
    .catch(error => {
      next(error);
    });
}

export async function apiFetchAttendingEvents(next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/get-attending-events`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiQueryEvents(searchQuery, next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/query-events/${searchQuery}`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiGetEventExtraDetails(type, eventId, next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/eventinfo/${type}/${eventId}`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiGetUserProfile(userId, next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/get-user-profile/${userId}`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiGetSessionSpeakers(sessionId, next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/get-session-speakers/${sessionId}`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}
