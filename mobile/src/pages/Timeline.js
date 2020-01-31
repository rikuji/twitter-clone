import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  
    //Propriedade estática que acessa o menu de navegação (ActionBar)
    static navigationOptions = ({ navigation }) => ({
        title: "Início",
        headerRight: (
            <TouchableOpacity onPress={() =>  navigation.navigate("New") }>
                <Icon
                    style={{ marginRight: 20 }}
                    name="add-circle-outline"
                    size={24}
                    color="#4bb0ee"
                />
            </TouchableOpacity>
        ),
    });
  
    state = {
        tweets: [],
    };

    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    };

    subscribeToEvents = () => {
        const io = socket("http://10.0.2.2:3000");
    
        io.on("tweet", data => {
          this.setState({
            tweets: [data, ...this.state.tweets]
          });
        });
    
        io.on("like", data => {
          this.setState({
            tweets: this.state.tweets.map(tweet =>
              tweet._id === data._id ? data : tweet
            )
          })
        });
    };

    render() {
    return (
        <View style={styles.container}>
            <FlatList 
                data={this.state.tweets}
                keyExtractor={tweet => tweet._id }
                renderItem={({ item }) => <Tweet tweet={item} />}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });
  