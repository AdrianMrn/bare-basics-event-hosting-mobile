import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../Themes/'

export default StyleSheet.create({
  authScreen: {
    backgroundColor: Colors.background,
  },
  form: {
    margin: Metrics.doubleBaseMargin,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
