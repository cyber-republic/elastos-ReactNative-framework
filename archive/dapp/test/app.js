import React, {Component} from 'react';

import {AppRegistry, StyleSheet, View, Image, ActionSheetIOS, NativeModules} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

import dapp from '../shared/dapp';

global.confirm = function(title){
  ActionSheetIOS.showActionSheetWithOptions({
    title : title,
    options: ['Cancel', 'Remove'],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 0,
  },
  (buttonIndex) => {
    if (buttonIndex === 1) { /* destructive action */ }
  });
}


class App extends Component{
    constructor(){
        super();
    
        this.state = {
          info : 'aaaa',
          image : null
        };
      }
      render() {
        return (
          <Content style={styles.container}>
            {this.renderImage()}
            <Text style={{fontSize:14, color:'#333', width:"100%"}}>{this.state.info}</Text>

            <Button style={styles.btn} success block onPress={this.click.bind(this)}><Text>alert</Text></Button>
            <Button style={styles.btn} success block onPress={this.http_remote.bind(this)} title=""><Text>http -> www.baidu.com</Text></Button>
            <Button style={styles.btn} success block onPress={this.http_local.bind(this)} title="">
              <Text>http -> 127.0.0.1:3000</Text>
            </Button>
            <Button style={styles.btn} success block onPress={this.click_image.bind(this)} title="image">
              <Text>Image</Text>
            </Button>
          </Content>
        );
      }
    
      renderImage(){
        if(!this.state.image){
          return null;
        }
        return (
          <Image style={{width:"100%", height:200}} source={{uri : this.state.image}} />
        );
      }
    
      async click(){
        cr_alert("I am alert");
      }
      http_local(){
        // var xhr = new XMLHttpRequest();
    
        // xhr.open('GET', 'http://127.0.0.1:3000');
        // xhr.send(null);
        // xhr.onreadystatechange = function () {
        //     this.setState({
        //         info : "http status : 200"
        //     });
        // }
        // xhr.onerror = ()=>{
        //   const err = xhr._response;
      
        //   this.setState({
        //     info : err
        //   })
        // }
        fetch('http://127.0.0.1:3000').then((res)=>{
          const info = res.status;
          this.setState({
            info : "http status : "+JSON.stringify(res)
          })
        }).catch((e)=>{
          const err = e.toString(); //JSON.stringify(e)
      
          this.setState({
            info : err
          })
        })
      }
      http_remote(){
        
        var xhr = new XMLHttpRequest();
    
        xhr.open('GET', 'https://www.baidu.com');
        xhr.send(null);
        xhr.onreadystatechange = function () {
            
        }
        xhr.onerror = ()=>{
          const err = xhr._response;
      
          this.setState({
            info : err
          })
        }
        
      }
    
      click_image(){
        this.setState({
          info : 'Image url : '+'https://www.cyberrepublic.org/assets/images/cr_seal_white.png',
          image : 'https://www.cyberrepublic.org/assets/images/cr_seal_white.png'
        })
        
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 50
    },
    btn : {
      marginTop: 12
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

// export default App;
dapp.start(App);