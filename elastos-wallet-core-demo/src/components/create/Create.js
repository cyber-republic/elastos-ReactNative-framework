import React, { Component } from 'react';
import {
    Button,View, Text
} from 'react-native';
import RNElastosMainchain from 'react-native-elastos-wallet-core';
import styles from '../create/Style';

class Create extends Component {

    constructor(props) {
      super(props);
      console.log('Create : constructor');
      this.state = {
        seedText: this.props.navigation.state.params.mnemonic
        // seedText: 'lion cloud dragon kid easily cloth sail eject thumb town odor diamond month'
      };
    }
  
    componentDidMount() {
      console.log('Create : componentDidMount');
      RNElastosMainchain.generateMnemonic( (err, res) => {
        this.setState({seedText: res})
      });
    }
  
    componentWillUnmount() {
      console.log('Create : componentWillUnmount');
    }

    submitClicked = () => {
      console.log('Create : createClicked');
      const { navigation } = this.props;
      // navigation.navigate('Balance', {"publicAddress": this.props.navigation.state.params.publicAddress});
      RNElastosMainchain.createWallet(this.state.seedText , (err, res) => {
      });
      navigation.navigate('Balance');
    }
  
    render() {
      const { seedText } = this.state;
      console.log(seedText);
      return (
        <View style={styles.container}>
          <Text style={styles.seedTxtStyle}>
            {seedText}
          </Text>
          <Button
            onPress={this.submitClicked}
            title="OK GOT IT"/>
        </View>
      );
    }
  }

  export default Create;