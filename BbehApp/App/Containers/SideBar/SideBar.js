import React from "react";
import { Image, StatusBar, Linking } from "react-native";
import { Container, Content, Text, List, ListItem, Icon, Left, Right } from "native-base";

import styles from './Styles/SideBarStyles';

export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    {/* TODO: BBEvents Logo goes here */}
                    {/* <Image
                        source={{
                        uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
                        }}
                        style={{
                        height: 120,
                        alignSelf: "stretch",
                        justifyContent: "center",
                        alignItems: "center"
                        }}>
                        <Image
                        square
                        style={{ height: 80, width: 70 }}
                        source={{
                            uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
                        }}
                        />
                    </Image> */}

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