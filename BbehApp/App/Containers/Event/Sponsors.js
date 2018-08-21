import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Right, Form, Item, Input, Button, Text, List, Toast, Separator } from 'native-base';
import _ from 'lodash';

import Store from '../../Services/Store';
import { apiGetEventExtraDetails } from '../../Services/Api';

import ListItemDetail from '../../Components/ListItemDetail';

import styles from './Styles/EventStyles';

class Sponsors extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      groupedSponsors: {}
    }
  }

  componentDidMount() {
    const store = this.props.store;
    const selectedEvent = store.get('selectedEvent');
    apiGetEventExtraDetails('sponsors', selectedEvent.id, (error, response) => {
      if (error) {
        Toast.show({
          text: 'Something went wrong, sorry!',
          buttonText: 'Okay',
          type: 'danger',
          duration: 5000
        });
        console.log(error);
      } else {
        const groupedSponsors = _.groupBy(response.data, (sponsor) => sponsor.tier);
        this.setState({ groupedSponsors });
      }
      this.setState({ loading: false });
    });
  }

  navigateToDetail = data => {
    this.props.store.set('selectedSponsor')(data);
    this.props.navigation.navigate('SponsorProfile');
  }

  render() {
    const groupedSponsors = this.state.groupedSponsors;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('GeneralInfo')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sponsors</Title>
          </Body>
          <Right />
        </Header>

        {this.state.loading &&
          <Content padder>
            <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" />
          </Content>
        }

        {!this.state.loading &&
          <Content>
            <List>
              <View>
                <Separator style={styles.separator} bordered>
                  <Text style={styles.separatorText}>GOLD SPONSORS</Text>
                </Separator>
                {groupedSponsors.gold.map(data => {
                  return (
                    <ListItemDetail square={true} data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
                  )
                })}
              </View>

              <View>
                <Separator style={styles.separator} bordered>
                  <Text style={styles.separatorText}>SILVER SPONSORS</Text>
                </Separator>
                {groupedSponsors.silver.map(data => {
                  return (
                    <ListItemDetail square={true} data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
                  )
                })}
              </View>

              <View>
                <Separator style={styles.separator} bordered>
                  <Text style={styles.separatorText}>BRONZE SPONSORS</Text>
                </Separator>
                {groupedSponsors.bronze.map(data => {
                  return (
                    <ListItemDetail square={true} data={data} navigateToDetail={this.navigateToDetail} key={data.id} />
                  )
                })}
              </View>
            </List>
          </Content>
        }
      </Container>
    );
  }
}

export default Store.withStore(Sponsors);
