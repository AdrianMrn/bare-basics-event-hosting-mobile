import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Label, Text, Thumbnail, Toast } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import Store from '../../Services/Store';
import { apiGetMyProfile, apiSaveProfile, apiUpdateProfileImage } from '../../Services/Api';
import showToast from '../../Services/ShowToast';
import { mediaUrl } from '../../Services/config';

import images from '../../Themes/Images';

import styles from './Styles/ProfileStyles';

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      company: '',
      position: '',
      description: '',
      linkedin: '',
      facebook: '',
      website: '',
      twitter: '',
      imageUrl: '',

      loading: true,
    }
  }

  componentDidMount = () => {
    this.fetchProfile();
  }

  fetchProfile = () => {
    apiGetMyProfile((error, response) => {
      if (error) {
        showToast(error);
      } else {
        this.setState({ loading: false, ...response.data });
      }
    });
  }

  onInputChange = (field, text) => {
    this.setState({
      [field]: text
    })
  }

  pickImage = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',

    }).then(image => {
      this.setState({ loading: true });
      apiUpdateProfileImage(image, (error, response) => {
        if (error) {
          showToast(error);
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, imageUrl: image.path });
          Toast.show({
            text: 'Image saved!',
            buttonText: 'Okay',
            duration: 5000
          });
        }
      });
    });
  }

  saveProfile = () => {
    console.log(this.state);
    this.setState({ loading: true });
    apiSaveProfile(this.state, (error, response) => {
      if (error) {
        showToast(error);
        this.setState({ loading: false });
      } else {
        console.log(response.data.user);
        this.setState({ loading: false });
        Toast.show({
          text: 'Profile saved!',
          buttonText: 'Okay',
          duration: 5000
        });
      }
    });
  }

  render() {
    const state = this.state;
    const { loading } = state;
    const localImage = ({ uri: state.imageUrl } || images.user);
    return (
      <Container style={styles.authScreen}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>My Profile</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.saveProfile} disabled={loading ? true : false}>
              <Icon name="checkmark" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Form style={styles.form}>

            <TouchableOpacity style={styles.avatar} onPress={this.pickImage}>
              <Thumbnail style={{ height: 150, width: 150 }} large source={
                this.state.imageUrl ? { uri: mediaUrl + this.state.imageUrl } : localImage
              } />
            </TouchableOpacity>

            <Item stackedLabel>
              <Label>First name</Label>
              <Input
                onChangeText={text => { this.onInputChange('first_name', text) }}
                value={state.first_name}
                disabled={loading}
              />
            </Item>

            <Item stackedLabel>
              <Label>Last name</Label>
              <Input
                onChangeText={text => { this.onInputChange('last_name', text) }}
                value={state.last_name}
                disabled={loading}
              />
            </Item>

            <Item stackedLabel style={styles.marginTop}>
              <Label>Company</Label>
              <Input
                onChangeText={text => { this.onInputChange('company', text) }}
                value={state.company}
                disabled={loading}
              />
            </Item>

            <Item stackedLabel>
              <Label>Position</Label>
              <Input
                onChangeText={text => { this.onInputChange('position', text) }}
                value={state.position}
                disabled={loading}
              />
            </Item>

            <Item stackedLabel style={styles.marginTop}>
              <Label>Bio</Label>
              {/* TODO: textarea */}
              <Input
                onChangeText={text => { this.onInputChange('description', text) }}
                value={state.description}
                disabled={loading}
              />
            </Item>

            <Item stackedLabel style={styles.marginTop}>
              <Label>Facebook URL</Label>
              <Input
                onChangeText={text => { this.onInputChange('facebook', text) }}
                value={state.facebook}
                disabled={loading}
                placeholder={'http://...'}
              />
            </Item>
            <Item stackedLabel>
              <Label>Twitter URL</Label>
              <Input
                onChangeText={text => { this.onInputChange('twitter', text) }}
                value={state.twitter}
                disabled={loading}
                placeholder={'http://...'}
              />
            </Item>
            <Item stackedLabel>
              <Label>LinkedIn URL</Label>
              <Input
                onChangeText={text => { this.onInputChange('linkedin', text) }}
                value={state.linkedin}
                disabled={loading}
                placeholder={'http://...'}
              />
            </Item>
            <Item stackedLabel>
              <Label>Website URL</Label>
              <Input
                onChangeText={text => { this.onInputChange('website', text) }}
                value={state.website}
                disabled={loading}
                placeholder={'http://...'}
              />
            </Item>

          </Form>
        </Content>
      </Container>
    );
  }
}

export default Store.withStore(ProfileScreen);
