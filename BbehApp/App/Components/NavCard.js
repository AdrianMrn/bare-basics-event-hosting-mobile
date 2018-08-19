import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Left, Right, Button, Body, Text, Icon, Card, CardItem } from "native-base";
import moment from 'moment';

import styles from './Styles/NavCardStyles';

export default class NavCard extends Component {
    render() {
        const { title, iconName, navigate } = this.props;
        return (
            <TouchableOpacity style={styles.navCard} onPress={navigate}>
                <Card style={{ flex: 1 }}>
                    <CardItem style={styles.cardItem}>
                        <Body style={styles.cardBody}>
                            <Icon style={styles.cardElement} name={iconName} />
                            <Text style={[styles.cardElement, styles.cardText]}>{title}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
}
