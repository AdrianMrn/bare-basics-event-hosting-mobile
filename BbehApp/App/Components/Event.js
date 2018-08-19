import React, { Component } from 'react'
import { Left, Right, Thumbnail, Button, Body, Text, ListItem, Icon } from "native-base";
import moment from 'moment';

export default class Event extends Component {
    render() {
        const data = this.props.data;
        return (
            <ListItem onPress={() => this.props.navigateToEvent(data.id)} thumbnail>
                <Left>
                    {/* TODO: get this from media */}
                    <Thumbnail square source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />
                </Left>

                <Body>
                    <Text>{data.name}</Text>
                    <Text note>{data.date_start ? `${moment(data.date_start).format('Do MMM')} - ${moment(data.date_end).format('Do MMM')}` : ''}</Text>
                </Body>

                <Right>
                    <Button transparent icon onPress={() => this.props.navigateToEvent(data.id)}>
                        <Icon name='arrow-forward' />
                    </Button>
                </Right>
            </ListItem>
        )
    }
}