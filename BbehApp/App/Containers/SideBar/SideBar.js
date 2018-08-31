import React from "react";
import { StatusBar, Linking, Dimensions } from "react-native";
import { Container, Content, Text, List, ListItem, Icon, Left, Right } from "native-base";
import Image from 'react-native-scalable-image';

import styles from './Styles/SideBarStyles';

import images from '../../Themes/Images';

export default class SideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            logoWidth: 20
        }
    }

    measureLogoWidth = event => {
        this.setState({ logoWidth: event.nativeEvent.layout.width });
    }

    render() {
        return (
            <Container onLayout={(event) => this.measureLogoWidth(event)}>
                <Content>
                    <Image
                        width={this.state.logoWidth - 20}
                        source={images.textlogo}
                    />

                    <List>
                        <ListItem // EventOverview
                            button
                            onPress={() => this.props.navigation.navigate('EventOverview')}
                        >
                            <Text>Events Overview</Text>
                        </ListItem>

                        <ListItem // Profile
                            button
                            onPress={() => this.props.navigation.navigate('MyProfile')}
                        >
                            <Left>
                                <Text>My Profile</Text>
                            </Left>
                            <Right>
                                <Icon style={{ color: '#000' }} name="person" />
                            </Right>
                        </ListItem>

                        <ListItem // Sign out
                            button
                            onPress={() => this.props.navigation.navigate('LogOut')}
                        >
                            <Left>
                                <Text>Sign Out</Text>
                            </Left>
                            <Right>
                                <Icon style={{ color: '#000' }} name="exit" />
                            </Right>
                        </ListItem>
                    </List>

                    <ListItem style={styles.cta} // Host your event CTA
                        button
                        onPress={() => Linking.openURL('http://3.120.104.63')}
                    >
                        <Left>
                            <Text style={{ fontSize: 13 }}>Host your Event</Text>
                        </Left>
                        <Right />
                    </ListItem>

                </Content>
            </Container>
        );
    }
}