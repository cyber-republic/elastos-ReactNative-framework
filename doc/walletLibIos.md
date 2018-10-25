How to build and use the ELA wallet library on React-Native.

To be able to access the ELA wallet library from a React-Native app, follow these steps:

1. Build the wallet lib for iOS as explained here https://github.com/elastos/Elastos.ORG.Wallet.Lib.C#build-for-ios-simulator. This will generate a libElastos.Wallet.Utility.dylib file under Elastos.ORG.Wallet.Lib.C/build/ios/src
2. clone https://github.com/cyber-republic/elastos-ReactNative-framework
3. cd elastos-ReactNative-framework
4. npm i
5. react-native link
6. cd ios/
7. pod install
8. open the ELASTOS_RN_FRAMEWORK.xcworkspace with Xcode
9. Add the .dylib to Build Phases (drag&drop)
10. Add the .dylib to General/Embedded Binaries
11. Edit [Build Settings/Library Search Path] section (double click) and add the full path to your .dylib file, make it recursive
12. Edit [Build Settings/Headers search Path] section and add the full path to Elastos.ORG.Wallet.Lib.C/src, make it recursive
-> You can now use the C library in your iOS app

Now, let's create our bridge to access the wallet functionalities from React-Native

1. create a new .mm and .h file on Xcode, call them testWallet.mm (take care of the extension) and testWallet.h
2. Add the following code to the different scripts

testWallet.h
```cpp
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface testWallet : NSObject <RCTBridgeModule>
@end
```
testWallet.mm
```cpp
#import "testWallet.h"
#import <Foundation/Foundation.h>
#import <React/RCTLog.h>
#import "Elastos.Wallet.Utility.h"

@implementation testWallet
RCT_EXPORT_MODULE();

char* readMnemonicFile(const char* path)
{
  FILE* file = fopen(path, "r");
  if (!file) {
    return nullptr;
  }
  char* buf = (char*)malloc(1024 * 10);
  if (!buf) {
    fclose(file);
    return nullptr;
  }
  int count = 0;
  char c;
  
  while ( (c = fgetc(file)) != EOF) {
    buf[count++] = c;
  }
  
  buf[count] = '\0';
  fclose(file);
  
  return buf;
}

RCT_EXPORT_METHOD(testWalletIos: (RCTResponseSenderBlock)callback)
{
  NSLog(@"testing Wallet ios");
  
  const char* path = "/$PATHTOMNEMONIC/Elastos.ORG.Wallet.Lib.C/src/Data/mnemonic_chinese.txt";
  char* words = readMnemonicFile(path);
  char* mnemonic = generateMnemonic("chinese", words);
  
  NSLog(@"Mnemonic IS : %s", mnemonic);
  
  void* seed;
  int seedLen = getSeedFromMnemonic(&seed, mnemonic, "chinese", words, "");
  char* privateKey = getSinglePrivateKey(seed, seedLen);
  char* publicKey = getSinglePublicKey(seed, seedLen);
  
  NSLog(@"PRIVATEKEY IS : %s", privateKey);
  NSLog(@"PUBLICKEY IS : %s", publicKey);
  
  NSString* mnemonicStr = [NSString stringWithUTF8String:mnemonic];
  NSString* publicKeyStr = [NSString stringWithUTF8String:publicKey];
  NSString* privateKeyStr = [NSString stringWithUTF8String:privateKey];
  callback(@[[NSNull null], mnemonicStr, publicKeyStr, privateKeyStr ]);
}
@end
```
3. Update the $PATHTOMNEMONIC parameter in testWallet.mm
4. open the elastos-ReactNative-framework/src/module/Home/HomeComponent.js file and change it to the following code
```javascript
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
```
4. Run your app from Xcode

This is how it looks like 

<img src="https://ademcan.net/images/elaWalletIos.png" width="600">

PS: I also needed to comment ElastosCarrier import in ios/carrier/Carrier.swift
