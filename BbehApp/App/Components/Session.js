import React, { Component } from 'react'
import { Left, Right, Thumbnail, Button, Body, Text, ListItem, Icon } from "native-base";
import { View } from 'react-native';
import moment from 'moment';

export default class Session extends Component {
    render() {
        const data = this.props.data;
        console.log(data);
        return (
            <ListItem style={{ justifyContent: 'space-between', flexDirection: 'row' }} onPress={() => this.props.navigateToDetail(data)} thumbnail>
                <View>
                    <Text style={{ alignSelf: 'flex-start' }} numberOfLines={1}>{data.name}</Text>
                    {!!data.date_start && <Text style={{ alignSelf: 'flex-start' }} note>{`${moment(data.date_start).format('Do MMM, H:mm')} - ${moment(data.date_end).format('H:mm')}`}</Text>}
                </View>

                <View>
                    <Button transparent icon onPress={() => this.props.navigateToDetail(data)}>
                        <Icon name='arrow-forward' />
                    </Button>
                </View>
            </ListItem>
        )
    }
}
