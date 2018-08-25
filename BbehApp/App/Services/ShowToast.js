import { Toast } from 'native-base';

export default showToast = error => {
  let errorMessages 
  if (error && error.response && error.response.data) {
    errorMessages = (error.response.data.message ? [error.response.data.message] : error.response.data);
  } else {
    errorMessages = ['Something went wrong, sorry!'];
  }

  Toast.show({
    text: errorMessages[0],
    buttonText: 'Okay',
    type: 'danger',
    duration: 5000
  });
}