import React, { Component } from 'react'
import { Button, Text } from "native-base";
import moment from 'moment';

import styles from './Styles/DayButtonStyles';

export default class DayButton extends Component {
    render() {
        const { day, setActiveDay, dayIndex, active } = this.props;
        return (
            <Button onPress={() => setActiveDay(day, dayIndex)} style={styles.dateButton} transparent={!active} primary={active}>
                <Text style={styles.dayText}>{day.format('ddd')}</Text>
                <Text>{day.format('D')}</Text>
            </Button>
        )
    }
}
