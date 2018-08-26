import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../../Themes';

export default StyleSheet.create({
    content: {
        paddingLeft: Metrics.baseMargin,
        paddingRight: Metrics.baseMargin
    },
    eventName: {
        ...Fonts.style.h5,
        marginLeft: Metrics.baseMargin,
        flex: 1,
        flexWrap: 'wrap',
    },
    eventDate: {
        marginTop: Metrics.baseMargin,
    },
    mainInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    eventDescription: {
        ...Fonts.style.description,
        marginTop: Metrics.doubleBaseMargin,
    },
    navCardContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Metrics.doubleBaseMargin,
    },
    renderViewText: {
        ...Fonts.style.description,
        color: Colors.blueish
    },
    separator: {
        paddingTop: Metrics.doubleBaseMargin,
        paddingBottom: Metrics.doubleBaseMargin
    },
    address: {
        ...Fonts.style.description
    }

})
