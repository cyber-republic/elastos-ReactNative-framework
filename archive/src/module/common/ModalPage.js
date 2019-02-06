import React from 'react';
import {Container, Header, Left, Body, Title, Right, Icon, Button} from 'native-base';
import {Cache} from 'app/lib';
import BasePage from './BasePage';

export default class extends BasePage{

  ord_renderHeaderRight(){
    return (
      <Right>
        <Button transparent onPress={this.close.bind(this)}>
          <Icon name='close' type="FontAwesome" />
        </Button>
      </Right>
    );
  }

  close(){
    Cache.method.call('modal', 'close');
  }
};