/* import apisauce from 'apisauce' */
import axios from 'axios';
import Config from 'react-native-config'
import { AsyncStorage } from "react-native"

import { apiUrl } from './config';

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

export async function apiCheckIfAttending(eventId, next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/check-if-attending-event/${eventId}`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiUnattendEvent(attendeeId, next) {
  const accessToken = await setAccessToken();
  axios.delete(`${apiUrl}/attendees/${attendeeId}`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}
export async function apiAttendEvent(eventId, next) {
  const accessToken = await setAccessToken();
  axios.put(`${apiUrl}/attendees/${eventId}`)
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

export async function apiGetMyProfile(next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/get-my-profile`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiSaveProfile(data, next) {
  const accessToken = await setAccessToken();
  // 1 as user id because in the back-end we get the user id from the access token in the request.
  axios.put(`${apiUrl}/users/1`, data)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiUpdateProfileImage(image, next) {
  const accessToken = await setAccessToken();

  const formData = new FormData();
  const pathParts = image.path.split('/');
  formData.append("image", {
    uri: image.path,
    type: image.mime,
    name: pathParts[pathParts.length - 1]
  });

  axios.post(`${apiUrl}/update-profile-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
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

export async function apiGetUserSessions(userId, eventId, next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/get-user-sessions/${userId}/${eventId}`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}

export async function apiGetNextTenEvents(next) {
  const accessToken = await setAccessToken();

  axios.get(`${apiUrl}/get-next-ten-events`)
    .then(response => {
      next(false, response);
    })
    .catch(error => {
      next(error);
    });
}
