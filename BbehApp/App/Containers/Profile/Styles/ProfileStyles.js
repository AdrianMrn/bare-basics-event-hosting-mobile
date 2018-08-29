import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../../Themes/'

export default StyleSheet.create({
  authScreen: {
    backgroundColor: Colors.background,
  },
  form: {
  },
  avatar: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center'
  },
  marginTop: {
    marginTop: Metrics.doubleBaseMargin
  },
  textarea: {
    width: '100%'
  },
  thumbnail: {
    height: 150,
    width: 150,
    borderRadius: 20,
    borderColor: Colors.charcoal,
    borderWidth: 1,
  }
})
