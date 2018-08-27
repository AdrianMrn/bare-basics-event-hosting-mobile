import React, { Component } from 'react'
import { Left, Right, Thumbnail, Button, Body, Text, ListItem, Icon } from "native-base";
import moment from 'moment';

import { mediaUrl } from '../Services/config';

export default class Event extends Component {
    render() {
        const data = this.props.data;
        return (
            <ListItem onPress={() => this.props.navigateToEvent(data)} thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: mediaUrl + data.imageUrl }} />
                </Left>

                <Body>
                    <Text numberOfLines={1}>{data.name}</Text>
                    {!!data.date_start && <Text note>{`${moment(data.date_start).format('Do MMM')} - ${moment(data.date_end).format('Do MMM YYYY')}`}</Text>}
                </Body>

                <Right>
                    <Button transparent icon onPress={() => this.props.navigateToEvent(data)}>
                        <Icon name='arrow-forward' />
                    </Button>
                </Right>
            </ListItem>
        )
    }
}
