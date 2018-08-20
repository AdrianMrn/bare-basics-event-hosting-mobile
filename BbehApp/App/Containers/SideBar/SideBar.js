import React from "react";
import { Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";

export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    {/* TODO: BBEvents Logo goes here? */}
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

                        {/* TODO: Render upcoming events from store */}

                        <ListItem // Profile
                            button
                            onPress={() => this.props.navigation.navigate('MyProfile')}
                        >
                            <Text>My Profile</Text>
                            {/* TODO: profile icon */}
                        </ListItem>

                        <ListItem // Sign out
                            button
                            onPress={() => this.props.navigation.navigate('LogOut')}
                        >
                            <Text>Sign Out</Text>
                            {/* TODO: sign out icon */}
                        </ListItem>
                    </List>

                    {/* TODO: Create list manually so we can use icons & have "My Profile" and "Log Out" stickied at the bottom? (flex end or whatever) */}
                    {/* <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    /> */}
                </Content>
            </Container>
        );
    }
}