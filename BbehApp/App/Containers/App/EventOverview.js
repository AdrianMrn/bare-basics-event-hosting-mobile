import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Thumbnail, Button, Body, Content, Text, Card, CardItem, List, ListItem, Separator } from "native-base";

import Store from '../../Services/Store';
import { apiFetchAttendingEvents } from '../../../App/Services/Api';

import Event from '../../Components/Event';

import styles from './Styles/EventOverviewStyles';

class EventOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        }
    }

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

                <Content>

                    <List>
                        <Separator bordered>
                            <Text style={{ fontSize: 17 }}>Upcoming Events</Text>
                        </Separator>

                        {!attendingUpcomingEvents.length && <ActivityIndicator size="large" />}
                        {!!attendingUpcomingEvents && attendingUpcomingEvents.map(data => {
                            return (
                                <Event data={data} navigateToEvent={this.navigateToEvent} key={data.id} />
                            )
                        })}
                    </List>

                    <Button style={styles.exploreButton} transparent block onPress={this.navigateToExploreEvents}>
                        <Text>Find more events to attend!</Text>
                    </Button>

                    <List style={styles.pastEvents}>
                        <Separator bordered>
                            <Text style={{ fontSize: 17 }}>Past Events</Text>
                        </Separator>

                        {!attendingPastEvents.length && <ActivityIndicator size="large" />}
                        {!!attendingPastEvents && attendingPastEvents.map(data => {
                            return (
                                <Event data={data} navigateToEvent={this.navigateToEvent} key={data.id} />
                            )
                        })}
                    </List>

                </Content>
            </Container>
        );
    }
}

export default Store.withStore(EventOverview);
