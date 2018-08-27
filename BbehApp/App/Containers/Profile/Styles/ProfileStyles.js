import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../Themes/'

export default StyleSheet.create({
  authScreen: {
    backgroundColor: Colors.background,
  },
  form: {
  },
  avatar: {
    marginTop: Metrics.doubleBaseMargin,
    borderWidth: 1,
    borderColor: Colors.charcoal,
    borderRadius: 120,
    alignSelf: 'center'
  },
  marginTop: {
    marginTop: Metrics.doubleBaseMargin
  }
})
