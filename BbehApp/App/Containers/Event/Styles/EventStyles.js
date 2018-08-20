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
    eventDate: {
        marginTop: Metrics.baseMargin
    },
    eventDescription: {
        ...Fonts.style.description,
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
        ...Fonts.style.description,
        color: Colors.blueish
    }

})
