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
    width: Metrics.screenWidth - (Metrics.screenWidth / 4),
  },
  disclaimerText: {
    ...Fonts.style.description,
    marginTop: Metrics.baseMargin,
    flex: 1,
    alignSelf: 'center',
  }

})
