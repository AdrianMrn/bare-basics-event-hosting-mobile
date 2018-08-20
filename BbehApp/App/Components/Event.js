import React, { Component } from 'react'
import { Left, Right, Thumbnail, Button, Body, Text, ListItem, Icon } from "native-base";
import moment from 'moment';

export default class Event extends Component {
    render() {
        const data = this.props.data;
        return (
            <ListItem onPress={() => this.props.navigateToEvent(data)} thumbnail>
                {/* TODO: turn these into cards for aesthetic? */}
                <Left>
                    {/* TODO: get this from media */}
                    <Thumbnail square source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />
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
