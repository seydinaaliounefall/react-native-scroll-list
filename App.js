import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
  Container, Header, Item, Input, Icon, Button, Text,
  Content, List, ListItem, Left, Body, Right, Thumbnail
} from "native-base";

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      fullData : [],
      loading : false,
      error: null
    }
  }

  componentDidMount() {
    this.requestAPIPhotos()
  }
  requestAPIPhotos = () =>{
    this.setState({loading: true})
    const apiURL = "https://jsonplaceholder.typicode.com/users"//Importing a json file
    fetch(apiURL).then((res) => res.json())//Loading file
    .then((resJson) => {
      this.setState({
        loading: false,
        data: resJson,
        fullData: resJson
      })
    }).catch(error => {
      this.setState({error, loading: false})
    })
  }

  _renderItem = ({ item, index }) => {
    return (
      <ListItem avatar style={styles.ListItem} >
      <Left>
        <Thumbnail source={{ uri:'data:image/jpeg;base64,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' }} />
      </Left>
      <Body>
        <Text>{ item.name }</Text>
      </Body>
      <Right>
      <Thumbnail small source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5jb-u22d6kgIAIewYdPnX6JibCfaCShxTqTPCpL7f8lsWGQ0G&usqp=CAU'}} />
      </Right>
    </ListItem>
    )
}
render(){
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
      </Header>
      <List>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

      </List>
    </Container>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListItem:{
    borderEndWidth: 2,
    borderColor: "#FF80AB"
  }
});
