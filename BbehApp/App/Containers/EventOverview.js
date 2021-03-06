import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Thumbnail, Button, Body, Content, Text, Card, CardItem, List, ListItem, Separator, Toast } from "native-base";

import Store from '../Services/Store';
import { apiFetchAttendingEvents, apiGetMyProfile } from '../Services/Api';
import showToast from '../Services/ShowToast';

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
        this.checkIfProfileIsComplete();
    }

    checkIfProfileIsComplete = () => {
        const store = this.props.store;
        if (!store.get('infoToastDisplayed')) {
            apiGetMyProfile((error, response) => {
                if (error) {
                    showToast(error);
                } else {
                    if (!response.data.imageUrl) {
                        Toast.show({
                            text: 'Complete your profile by accessing it through the menu!',
                            buttonText: 'Ok',
                            duration: 5000
                        });
                        store.set('infoToastDisplayed')(true);
                    }
                }
            });
        }
    }

    fetchAttendingEvents = () => {
        apiFetchAttendingEvents((error, response) => {
            if (error) {
                showToast(error);
            } else {
                const store = this.props.store;
                store.set('attendingUpcomingEvents')(response.data.upcomingEvents);
                store.set('attendingPastEvents')(response.data.pastEvents);
            }
            this.setState({ loading: false });
        });
    }

    navigateToEvent = eventData => {
        this.props.store.set('selectedEvent')(eventData);
        this.props.navigation.navigate('GeneralInfo');
    }

    navigateToExploreEvents = () => {
        this.props.navigation.navigate('ExploreEvents');
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
