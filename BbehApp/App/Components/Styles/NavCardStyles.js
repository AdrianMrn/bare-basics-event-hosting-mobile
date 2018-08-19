import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
    navCard: {
        width: (Metrics.screenWidth / 2) - (Metrics.doubleBaseMargin * 2),
        height: (Metrics.screenWidth / 2) - (Metrics.doubleBaseMargin * 2),
        marginBottom: Metrics.doubleBaseMargin
    },
    cardItem: {
        flex: 1, backgroundColor: Colors.blueish
    },
    cardBody: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardElement: {
        marginVertical: Metrics.baseMargin / 2,
        color: Colors.offWhite
    },
    cardText: {
        ...Fonts.style.h6,
    }
})
