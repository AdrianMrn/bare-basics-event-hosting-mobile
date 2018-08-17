import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
} from 'react-native';
import moment from 'moment';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem, List, ListItem, Separator } from "native-base";

import Store from '../../Services/Store';
/* import { } from '../../../App/Services/Api'; */

import styles from '../Styles/RootContainerStyles'

class EventOverview extends React.Component {

    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        upcomingEvents = [
            {id: 1, name: 'event 1', date_start: '2018-08-10 00:00:00', date_end: '2018-09-04 00:00:00'},
            {id: 2, name: 'event 2', date_start: '2018-08-10 00:00:00', date_end: '2018-09-04 00:00:00'},
            {id: 3, name: 'event 3', date_start: '2018-08-10 00:00:00', date_end: '2018-09-04 00:00:00'},
        ]

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Event Overview</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>

                    <List>
                        <Separator bordered>
                            <Text>Upcoming Events</Text>
                        </Separator>

                        {/* TODO: get this from store */}
                        {upcomingEvents.map(data => {
                            return (
                                <ListItem key="data.id">
                                    <Left>
                                        <Text>icon</Text>
                                    </Left>
                                    <Body>
                                        <Text>{data.title}</Text>
                                        <Text note>{data.description}</Text>
                                        {/* dates in Text note instead of Right */}
                                    </Body>
                                    <Right>
                                        {/* Detail */}
                                        <Text note>{data.date_start ? `${data.date_start} - ${data.date_end}` : ''}</Text>
                                    </Right>
                                </ListItem>
                            )
                        })}

                    </List>


                    <List>
                        <Separator bordered>
                            <Text>Past Events</Text>
                        </Separator>
                    </List>

                </Content>
            </Container>
        );
    }
}

export default Store.withStore(EventOverview);
