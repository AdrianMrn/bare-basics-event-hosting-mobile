import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../../Themes';

export default StyleSheet.create({
  separator: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin
  },
  separatorText: {
    fontSize: 13
  },
  searchBox: {
    backgroundColor: Colors.snow,
    width: Metrics.screenWidth - (Metrics.screenWidth / 3),
    borderRadius: 5
  }

})
