import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../../Themes';

export default StyleSheet.create({
    content: {
        paddingLeft: Metrics.baseMargin,
        paddingRight: Metrics.baseMargin
    },
    eventName: {
        ...Fonts.style.h5,
    },
    eventDescription: {
        ...Fonts.style.normal,
        marginTop: Metrics.doubleBaseMargin,
    },
    navCardContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Metrics.doubleBaseMargin,
    },
    renderViewText: {
        ...Fonts.style.norma,
        color: Colors.blueish
    }

})
