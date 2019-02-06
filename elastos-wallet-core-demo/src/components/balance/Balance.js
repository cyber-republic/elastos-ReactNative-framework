import React, { Component } from 'react';
import {
    Button,View,Text,FlatList,TextInput,Platform
} from 'react-native';
import RNElastosMainchain from 'react-native-elastos-wallet-core';
import styles from '../balance/Style';

class Balance extends Component {

    constructor(props) {
      super(props);
      console.log('Balance : constructor');
      this.state = {
        data : [],
        address : '',
        amount : '',
        balance : '',
        publicAddress : ''
      }
    }
  
    componentDidMount() {
      console.log('Balance : componentDidMount');

      if (Platform.OS == 'ios'){
        this.setState({balance:parseFloat(this.props.navigation.state.params.balance / 100000000).toFixed(2), publicAddress: this.props.navigation.state.params.publicAddress, data : JSON.parse(this.props.navigation.state.params.txlist)})
      }

      else {
        RNElastosMainchain.getBalance( (err, res) => {
          this.setState({balance: res})
        });
        RNElastosMainchain.getPublicAddress( (err, res) => {
          this.setState({publicAddress: res})
        });
        RNElastosMainchain.getTransactionHistory( (err, res) => {
          var transactionHistory = JSON.parse(res);
          var transactionData, index = 0;
          var transactionData = transactionHistory.map(element => {
            index++;
            var elementDate = new Date(element.Timestamp * 1000).toUTCString();
            var elementFlag, elementAmount, elementAddress;
            if (element.Incoming.Amount != 0) {
              elementFlag = "Received";
              elementAmount = element.Incoming.Amount;
              elementAddress = element.Incoming.ToAddress;
            } else {
              elementFlag = "Sent";
              elementAmount = element.Outcoming.Amount;
              elementAddress = element.Outcoming.ToAddress;
            }
  
            return {
                id : index,
                transaction_id : element.TxHash,
                amount : elementAmount,
                date : elementDate,
                flag : elementFlag,
                address: elementAddress
            }
          });
          this.setState({data : transactionData});
        });
      }
    }
  
    componentWillUnmount() {
      console.log('Balance : componentWillUnmount');
    }

    sendClicked = () => {
      console.log('Balance : sendClicked');
      RNElastosMainchain.sendToAddress(this.state.amount, this.state.address, (err, res) => {
        alert("Success, your transacionId is" + res)
      });
    }

    // keyExtractor = (item, index) => item.id.toString();
  
    render() {
      const { address , amount , data} = this.state;
      const balance = this.props.navigation.getParam('balance', '0');
      return (
        <View style={styles.container}>
            <Text style={styles.elaAmout}>{this.state.balance} ELA</Text>
            <Text style={styles.elaPublicAddress}>"{this.state.publicAddress}"</Text>
            
            <FlatList
              style={styles.list}
              bounces={false}
              data={data}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  { Platform.OS == 'ios' ?
                    <View>
                    <Text>
                    TxHash: {item.Summary.TxHash}
                  </Text>
                  <Text>
                    Amout : {item.Summary.Incoming.Amount}  {'\n'}
                    To : {item.Summary.Incoming.ToAddress}
                    </Text>
                    </View>
                  :
                  <View>
                    <Text>
                    {item.transaction_id}
                  </Text>
                  <Text>
                    {item.flag} {item.amount} {item.date} {item.address}
                    </Text>
                    </View>
                  }
                  
                </View>
              )}
            />

            <TextInput 
            style={styles.textbox} 
            placeholder="Enter amount to send" 
            onChangeText={text => this.setState({ amount: text })} >
              { amount }
            </TextInput>

            <TextInput 
            style={styles.textbox} 
            placeholder="Enter receiver's address" 
            onChangeText={text => this.setState({ address: text })} >
              { address }
            </TextInput>

            <View style={{padding:10}}></View>

            <View style={{marginLeft:100, marginRight:100}}>
              <Button
                onPress={this.sendClicked}
                title="SEND"/>
            </View>
            
            <View style={{padding:10}}></View>
        
        </View>
      );
    }
  }

  export default Balance;