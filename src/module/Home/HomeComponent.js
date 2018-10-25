import React from 'react';
import BasePage from '../common/BasePage';
import {Cache} from 'app/lib';
import {_, Style} from 'CR';
import {NativeModules} from 'react-native';
import { Container, Header, Content, Button, Text, Grid, Row, Col, View, Thumbnail} from 'native-base';

var IosWallet = NativeModules.testWallet;
const sy = Style.create({
  add_box: {
    marginTop : 20
  },
  box : {
    paddingTop : 30,
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
        marginTop: 100,
        height:50,
        backgroundColor: 'red'
    }
})

export default class extends BasePage{
  ord_init(){
    this.state = {
      loading : true,
      mnemonic : ""
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
        <Button block success onPress={this.toInstallPage.bind(this)}>
          <Text> Add New DApp </Text>
        </Button>
        <Button style={sy.walletButton} onPress={ () => {this.testWalletResult()} }>
          <Text> Generate Wallet </Text>
        </Button>
        {this.state.mnemonic == "" ?
            <View>
            </View>
            :
            <View>
                <Text> {'\n'}{'\n'}MNEMONIC </Text>
                <Text> {this.state.mnemonic} </Text>
                <Text> {'\n'}{'\n'}PUBLIC KEY </Text>
                <Text> {this.state.publickey} </Text>
                <Text> {'\n'}{'\n'}PRIVATE KEY </Text>
                <Text> {this.state.privatekey} </Text>
            </View>

        }

      </View>
    );
  }

  toInstallPage(){
    Cache.method.call('goPath', 'install_app', 'modal');
  }

  testWalletResult(){
      console.log("WALLET CPP FROM IOS")
      IosWallet.testWalletIos((error, mnemonic, publickey, privatekey) => { this.setState({mnemonic: mnemonic, publickey: publickey, privatekey : privatekey}) } )
    // Cache.method.call('goPath', 'install_app', 'modal');
  }

  async componentDidMount(){
    await this.props.getDAppList();
    this.setState({loading : false});
  }
}
