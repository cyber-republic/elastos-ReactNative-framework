import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache} from 'CR';

import { Container, Header, Content, Button, Text, Grid, Row, Col, View, Thumbnail} from 'native-base';

const sy = Style.create({
  box : {
    paddingTop : 30,
    paddingBottom : 30,
    paddingLeft : 20,
    paddingRight : 20
  },
  btn : {
    marginTop : 100
  }
});

export default class extends BasePage{
  ord_init(){
    this.state = {
      loading : false
    };
  }
  ord_renderMain(){
    return (
      <Container style={sy.box}>
        <Button style={sy.btn} success block onPress={this.goto.bind(this)}>
          <Text>Start Chat</Text>
        </Button>
      </Container>
    );
  }

  ord_checkLoading(){
    return this.state.loading;
  }

  async goto(){
    this.setState({loading : true});

    await this.props.startCarrier();

    _.delay(()=>{
      this.setState({loading : false});
      this.goPath('tab', 'replace');
    }, 10);
    
    
  }

  ord_defineHeaderTitle(){
    return 'CHAT DEMO';
  }

}