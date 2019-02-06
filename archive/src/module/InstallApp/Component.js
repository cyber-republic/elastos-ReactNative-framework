import React from 'react';
import ModalPage from '../common/ModalPage';
import { Container, Header, Content, Button, Text, List, ListItem, Toast } from 'native-base';
import config from 'app/config';


export default class extends ModalPage{
  ord_renderMain(){
    return (
      <Content>
        <List>
          <ListItem onPress={this.clickItem.bind(this, 'example')}>
            <Text>NativeBase example</Text>
          </ListItem>
          <ListItem>
            <Text onPress={this.clickItem.bind(this, 'test')}>Http example</Text>
          </ListItem>
          <ListItem>
            <Text onPress={this.clickItem.bind(this, 'carrier_demo')}>Carrier DEMO</Text>
          </ListItem>
        </List>
      </Content>
    );  
  }

  ord_defineHeaderTitle(){
    return 'Install page';
  }

  async clickItem(dapp_name){
    const url = `http://${config.DAPP_SERVER_URL}/${dapp_name}.js`;
    

    try{
      await this.props.openDapp(dapp_name, url);
    }catch(e){
      alert(e);
    }
    
  }
}