import React, { Component } from 'react'
import { Left, Right, Thumbnail, Button, Body, Text, ListItem, Icon } from "native-base";
import moment from 'moment';

export default class ListItemDetail extends Component {
    render() {
        const data = this.props.data;
        return (
            <ListItem style={{ paddingLeft: 0, marginLeft: 10 }} onPress={() => this.props.navigateToDetail(data)} avatar>
                <Left>
                    {/* TODO: make sure image works on prod */}
                    <Thumbnail square={this.props.square} source={{ uri: data.imageUrl }} />
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
