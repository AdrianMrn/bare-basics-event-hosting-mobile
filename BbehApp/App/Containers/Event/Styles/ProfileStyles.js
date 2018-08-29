import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../../Themes';

export default StyleSheet.create({
    content: {
        paddingLeft: Metrics.baseMargin,
        paddingRight: Metrics.baseMargin
    },
    mainInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    nameAndDesc: {
        flex: 1,
        marginLeft: Metrics.doubleBaseMargin,
        flexWrap: 'wrap',
    },
    userName: {
        ...Fonts.style.h5,
    },
    userPosition: {
        marginTop: Metrics.baseMargin,
    },
    userDescription: {
        ...Fonts.style.description,
        marginTop: Metrics.doubleBaseMargin,
    },
    socialLinks: {
        marginTop: Metrics.baseMargin,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    sessionSpeakerList: {
        marginTop: Metrics.doubleBaseMargin
    },
    separator: {
        paddingTop: Metrics.doubleBaseMargin,
        paddingBottom: Metrics.doubleBaseMargin
    },

})
