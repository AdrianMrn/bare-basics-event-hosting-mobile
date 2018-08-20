import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Thumbnail, Button, Body, Content, Text, Card, CardItem, List, ListItem, Separator } from "native-base";

import Store from '../Services/Store';
import { apiFetchAttendingEvents } from '../Services/Api';

import Event from '../Components/Event';

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
                // TODO: toast error
            } else {
                const store = this.props.store;
                store.set('attendingUpcomingEvents')(response.data.upcomingEvents);
                store.set('attendingPastEvents')(response.data.pastEvents);
            }
            this.setState({ loading: false });
        });
    }

    navigateToEvent = eventData => {
        console.log(eventData);
        this.props.store.set('selectedEvent')(eventData);
        this.props.navigation.navigate('GeneralInfo');
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
                        <Separator style={styles.separator} bordered>
                            <Text style={styles.separatorText}>UPCOMING EVENTS</Text>
                        </Separator>

                        {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
                        {!this.state.loading && attendingUpcomingEvents.map(data => {
                            return (
                                <Event data={data} navigateToEvent={this.navigateToEvent} key={data.id} />
                            )
                        })}
                    </List>

                    <Button style={styles.exploreButton} transparent block onPress={this.navigateToExploreEvents}>
                        <Text>Find more events to attend!</Text>
                    </Button>

                    <List style={styles.pastEvents}>
                        <Separator style={styles.separator} bordered>
                            <Text style={styles.separatorText}>PAST EVENTS</Text>
                        </Separator>

                        {this.state.loading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />}
                        {!this.state.loading && attendingPastEvents.map(data => {
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
