import React, { Component } from 'react';
import {
    Button,View,TextInput,Text,Platform
} from 'react-native';
import RNElastosMainchain from 'react-native-elastos-wallet-core';
import styles from '../import/Style';

class Import extends Component {

    constructor(props) {
      super(props);
      console.log('Import : constructor');
      this.state = {
        seed : '',
        pwd: ''
      }
    }
  
    componentDidMount() {
      console.log('Import : componentDidMount');
    }
  
    componentWillUnmount() {
      console.log('Import : componentWillUnmount');
    }

    importClicked = () => {

      if (Platform.OS === 'ios'){
        RNElastosMainchain.importWalletWithMnemonic( (err, res, publicAddress, balance, txlist) => {
          // if successful import
          if (res == "success"){
            console.log('Import : importClicked');
            const { navigation } = this.props;
            navigation.navigate('Balance', {"publicAddress": publicAddress, "balance": balance, "txlist": txlist });
          }
          else {
            console.log('Start : Error occurred while importing');
          }
        });
      }
      else {
        console.log('Import : importClicked');
        const { navigation } = this.props;
        RNElastosMainchain.importWalletWithMnemonic(this.state.seedText , (err, res) => {
        });
        navigation.navigate('Balance');
      }
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.topText}>
            IMPORT SEED
          </Text>
          <Text style={styles.descText}>
            Enter your 12 words seed here
          </Text>

          <TextInput 
            style={styles.textbox} 
            placeholder="maximum farm someone leg music federal pyramid lounge scrap bomb skin mystery" 
            multiline
            maxLength={120}
            onChangeText={text => this.setState({ seedText: text })} >
          </TextInput>

          <TextInput 
            style={styles.textbox} 
            placeholder="Password" 
            multiline
            maxLength={120}
            onChangeText={text => this.setState({ pwd: text })} >
          </TextInput>

          <Button
            style={[styles.importButton]} 
            onPress={this.importClicked}
            title="Import"/>

        </View>
      );
    }
  }

  export default Import;