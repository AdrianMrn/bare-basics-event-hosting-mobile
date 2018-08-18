import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
} from 'react-native';
import moment from 'moment';
import { Container, Header, Title, Left, Icon, Right, Thumbnail, Button, Body, Content, Text, Card, CardItem, List, ListItem, Separator } from "native-base";

import Store from '../../Services/Store';
import { apiFetchAttendingEvents } from '../../../App/Services/Api';

import styles from './Styles/EventOverviewStyles';

class EventOverview extends React.Component {
    componentDidMount = () => {
        this.fetchAttendingEvents();
    }

    fetchAttendingEvents = () => {
        apiFetchAttendingEvents((error, response) => {
            if (error) {
                console.log(error);
            } else {
                const store = this.props.store;
                store.set('attendingUpcomingEvents')(response.data.upcomingEvents);
                store.set('attendingPastEvents')(response.data.pastEvents);
            }
        });
    }

    navigateToEvent = eventId => {
        console.log(eventId);
        // TODO: navigate to event home (general info)
    }

    navigateToExploreEvents = () => {
        console.log("exploring");
        // TODO: navigate to explore events page
    }

    render() {
        /* upcomingEvents = [
            { id: 1, name: 'hm', date_start: '2018-08-10 00:00:00', date_end: '2018-09-04 00:00:00' },
            { id: 2, name: 'event 2', date_start: '2018-08-10 00:00:00', date_end: '2018-09-04 00:00:00' },
            { id: 3, name: 'event 3', date_start: '2018-08-10 00:00:00', date_end: '2018-09-04 00:00:00' },
        ] */
        const store = this.props.store;
        const attendingUpcomingEvents = store.get('attendingUpcomingEvents');
        const attendingPastEvents = store.get('attendingPastEvents');

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
                        <Title>Events Overview</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>

                    <List>
                        <Separator bordered>
                            <Text>Upcoming Events</Text>
                        </Separator>

                        {/* TODO: get this from store */}
                        {attendingUpcomingEvents.map(data => {
                            return (
                                <ListItem onPress={() => this.navigateToEvent(data.id)} thumbnail key={data.id}>
                                    <Left>
                                        {/* TODO: get this from media */}
                                        <Thumbnail square source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />
                                    </Left>

                                    <Body>
                                        <Text>{data.name}</Text>
                                        <Text note>{data.date_start ? `${data.date_start} - ${data.date_end}` : ''}</Text>
                                    </Body>

                                    <Right>
                                        <Button transparent icon onPress={() => this.navigateToEvent(data.id)}>
                                            <Icon name='arrow-forward' />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </List>

                    <Button style={styles.exploreButton} transparent block onPress={this.navigateToExploreEvents}>
                        <Text>Find more events to attend!</Text>
                    </Button>

                    <List style={styles.pastEvents}>
                        <Separator bordered>
                            <Text>Past Events</Text>
                        </Separator>

                        {attendingPastEvents.map(data => {
                            return (
                                <ListItem onPress={() => this.navigateToEvent(data.id)} thumbnail key={data.id}>
                                    <Left>
                                        {/* TODO: get this from media */}
                                        <Thumbnail square source={{ uri: 'https://www.telegraph.co.uk/content/dam/news/2017/11/22/TELEMMGLPICT000147365976_trans_NvBQzQNjv4Bq3XmyF3YIL3K1caQxZsZv2Ssm-UOV8_Q90I8_c5Af0yY.jpeg?imwidth=450' }} />
                                    </Left>

                                    <Body>
                                        <Text>{data.name}</Text>
                                        <Text note>{data.date_start ? `${data.date_start} - ${data.date_end}` : ''}</Text>
                                    </Body>

                                    <Right>
                                        <Button transparent icon onPress={() => this.navigateToEvent(data.id)}>
                                            <Icon name='arrow-forward' />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </List>

                </Content>
            </Container>
        );
    }
}

export default Store.withStore(EventOverview);
