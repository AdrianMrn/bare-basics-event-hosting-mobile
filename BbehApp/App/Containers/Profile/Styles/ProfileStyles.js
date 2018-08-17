import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../Themes/'

export default StyleSheet.create({
  authScreen: {
    backgroundColor: Colors.background,
  },
  authForm: {
    margin: Metrics.doubleBaseMargin,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authInput: {
    backgroundColor: Colors.offWhite,
    paddingLeft: Metrics.doubleBaseMargin,
  },
  authButton: {
    marginTop: Metrics.doubleBaseMargin,
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  registerText: {
    ...Fonts.style.normal,
    color: Colors.facebook,
    marginTop: Metrics.doubleBaseMargin
  }
})
