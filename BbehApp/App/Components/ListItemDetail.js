import React, { Component } from 'react'
import { Left, Right, Thumbnail, Button, Body, Text, ListItem, Icon } from "native-base";
import moment from 'moment';

export default class ListItemDetail extends Component {
    render() {
        const data = this.props.data;
        return (
            <ListItem onPress={() => this.props.navigateToDetail(data)} avatar>
                <Left>
                    {/* TODO: get this from media */}
                    <Thumbnail source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />
                </Left>

                <Body>
                    <Text>{data.name || data.speakerName}</Text>
                </Body>

                <Right>
                    <Button transparent icon onPress={() => this.props.navigateToDetail(data)}>
                        <Icon name='arrow-forward' />
                    </Button>
                </Right>
            </ListItem>
        )
    }
}
