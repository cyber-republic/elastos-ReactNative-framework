import React from 'react';
import BasePage from '../common/BasePage';
import {Cache} from 'app/lib';
import {_, Style} from 'CR';
import {NativeModules} from 'react-native';
import InstallAppPage from 'app/module/InstallApp/Container';

import { Container, Header, Content, Button, Text, Grid, Row, Col, View, Thumbnail} from 'native-base';

var AndroidWallet = NativeModules.WalletPlugin;
const sy = Style.create({
  add_box: {
    marginTop : 0
  },
  box : {
    paddingTop : 0,
    paddingBottom : 30
  },
  col : {
    textAlign : 'center',
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'

    },
    walletButton : {
        textAlign : 'center',
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 10,
        height:40,
        backgroundColor: 'green'
    }
})

export default class extends BasePage{
  ord_init(){
    this.state = {
      loading : true,
      messageMnemonic : "",
      messageAddress : "",
      messageDid : "",
      messageSignTxData : "",
      messageCosignTxData : ""
    };
  }
  ord_renderMain(){
    return (
      <Content style={sy.box}>
        {this.renderAppList()}

        {this.renderAddButton()}
      </Content>
    );
  }

  ord_checkLoading(){
    return this.state.loading;
  }

  ord_defineHeaderTitle(){
    return 'DApp List';
  }

  async openApp(item){
    console.log(item);
    await this.props.loadDapp(item.path);
  }
  renderAppList(){
    const list = _.chunk(this.props.list, 3);
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

    return (
      <Grid>
        {
          _.map(list, (l, i)=>{
            return (
              <Row key={i}>
                {
                  _.map((new Array(3)), (x, j)=>{
                    const item = l[j];
                    if(!item){
                      return (
                        <Col key={j}></Col>
                      )
                    }
                    return (
                      <Col onPress={this.openApp.bind(this, item)} style={sy.col} key={j}>
                        <Thumbnail square source={{uri: uri}} />
                        <Text>{item.name}</Text>
                      </Col>
                    )
                  })
                }
              </Row>
            )
          })
        }
      </Grid>
    );
  }

  renderAddButton(){
    return (
      <View padder style={sy.add_box}>
        {/* <Button block success onPress={this.toInstallPage.bind(this)}>
          <Text> Add New DApp </Text>
        </Button> */}
        <Button style={sy.walletButton} onPress={ () => {this.testGenrateMnemonic()} }>
          <Text> GenrateMnemonic </Text>
        </Button>
        <Button style={sy.walletButton} onPress={ () => {this.testHDWalletAddress()} }>
          <Text> HDWalletAddress </Text>
        </Button>
        <Button style={sy.walletButton} onPress={ () => {this.testDid()} }>
          <Text> Did </Text>
        </Button>
        <Button style={sy.walletButton} onPress={ () => {this.testSignTxData()} }>
          <Text> SignTxData </Text>
        </Button>
        <Button style={sy.walletButton} onPress={ () => {this.testCosignTxData()} }>
          <Text> CosignTxData </Text>
        </Button>
        {this.state.messageMnemonic == "" ?
            <View>
            </View>
            :
            <View>
                <Text> {'\n'}{'\n'}testGenrateMnemonic </Text>
                <Text> {this.state.messageMnemonic} </Text>
            </View>
        }
        
        {this.state.messageAddress == "" ?
            <View>
            </View>
            :
            <View>
                <Text> {'\n'}{'\n'}testHDWalletAddress </Text>
                <Text> {this.state.messageAddress} </Text>
            </View>
        }
        
        {this.state.messageDid == "" ?
            <View>
            </View>
            :
            <View>
                <Text> {'\n'}{'\n'}testDid </Text>
                <Text> {this.state.messageDid} </Text>
            </View>
        }
        
        {this.state.messageSignTxData == "" ?
            <View>
            </View>
            :
            <View>
                <Text> {'\n'}{'\n'}testSignTxData </Text>
                <Text> {this.state.messageSignTxData} </Text>
            </View>
        }

        {this.state.messageCosignTxData == "" ?
            <View>
            </View>
            :
            <View>
                <Text> {'\n'}{'\n'}testCosignTxData </Text>
                <Text> {this.state.messageCosignTxData} </Text>
            </View>
        }

      </View>
    );
  }

  toInstallPage(){
    Cache.method.call('modal', 'open', {
      child : InstallAppPage
    })
  }

  testGenrateMnemonic(){
      console.log("WALLET CPP FROM Android")
      AndroidWallet.testGenrateMnemonic((error, message) => { 
        this.setState({messageMnemonic: message});
        this.setState({messageAddress: ""});
        this.setState({messageDid: ""});
        this.setState({messageSignTxData: ""});
        this.setState({messageCosignTxData: ""});
    } )
    // Cache.method.call('goPath', 'install_app', 'modal');
  }

  testHDWalletAddress(){
      console.log("WALLET CPP FROM Android")
      AndroidWallet.testHDWalletAddress((error, message) => { 
        this.setState({messageMnemonic: ""});
        this.setState({messageAddress: message});
        this.setState({messageDid: ""});
        this.setState({messageSignTxData: ""});
        this.setState({messageCosignTxData: ""});
       } )
    // Cache.method.call('goPath', 'install_app', 'modal');
  }

  testDid(){
      console.log("WALLET CPP FROM Android")
      AndroidWallet.testDid((error, message) => { 
        this.setState({messageMnemonic: ""});
        this.setState({messageAddress: ""});
        this.setState({messageDid: message});
        this.setState({messageSignTxData: ""});
        this.setState({messageCosignTxData: ""});
       } )
    // Cache.method.call('goPath', 'install_app', 'modal');
  }

  testSignTxData(){
      console.log("WALLET CPP FROM Android")
      AndroidWallet.testSignTxData((error, message) => { 
        this.setState({messageMnemonic: ""});
        this.setState({messageAddress: ""});
        this.setState({messageDid: ""});
        this.setState({messageSignTxData: message});
        this.setState({messageCosignTxData: ""});
       } )
    // Cache.method.call('goPath', 'install_app', 'modal');
  }

  testCosignTxData(){
      console.log("WALLET CPP FROM Android")
      AndroidWallet.testCosignTxData((error, message) => { 
        this.setState({messageMnemonic: ""});
        this.setState({messageAddress: ""});
        this.setState({messageDid: ""});
        this.setState({messageSignTxData: ""});
        this.setState({messageCosignTxData: message});
       } )
    // Cache.method.call('goPath', 'install_app', 'modal');
  }

  async componentDidMount(){
    await this.props.getDAppList();
    this.setState({loading : false});
  }
}
