import React from 'react';
import Parent from 'app/module/common/StackPage';
import {_, Style, Cache, util} from 'CR';
import { Content, Icon, Text, List, ListItem, View, Form, Item, Left, Body, Right, Button, Toast, Label, Input} from 'native-base';


const sy = Style.create({
  box : {
    paddingLeft : 15,
    paddingRight : 15
  }
});

export default class extends Parent{
  ord_init(){
    this.param = {};
  }

  ord_defineHeaderTitle(){
    return 'FRIEND INFO'
  }

  ord_renderMain(){
    return (
      <Content>
        {this.renderList()}

        {this.renderForm()}
        {this.renderButton()}
      </Content>
    );
  }

  renderList(){
    const {userId, friends} = this.props;
    const info = _.get(friends, userId, {});
    return (
      <List>
        <ListItem itemHeader first>
          <Text>Base Info</Text>
        </ListItem>
        {_.map(['name', 'gender', 'phone', 'region', 'email'], (key, i)=>{
          return (
            <ListItem key={i}>
              <Left>
                <Text>{key}</Text>
              </Left>
              <Text>{info[key]}</Text>
            </ListItem>
          )
        })}
      </List>
    );
  }

  renderForm(){
    const {userId, friends} = this.props;
    const info = _.get(friends, userId, {});
    return (
      <Form style={{marginTop:25}}>
        {_.map(['label'], (key, i)=>{
          this.param[key] = info.label || '';
          const p = {
            defaultValue : this.param[key],
            onChangeText : (t)=>{
              this.param[key] = t;
            }
          };
          return (
            <Item key={i} inlineLabel>
              <Label>{key}</Label>
              <Input {...p} style={{textAlign:'right'}} />

              <Button transparent onPress={this.changeLabel.bind(this)}>
                <Icon name="edit" type="FontAwesome" style={{marginLeft:8,color:'#43af92'}} />
              </Button>
              
            </Item>
          )
        })}
      </Form>
    );
  }

  renderButton(){
    return (
      <View style={{paddingLeft:15, paddingRight:15, marginTop:40}}>
        <Button style={sy.btn} success block onPress={this.toSendPage.bind(this)}>
          <Text>Send Message</Text>
        </Button>
      </View>
    );
  }

  async changeLabel(){

    try{
      await this.props.changeLabel(this.props.userId, this.param.label);
      
      Toast.show({
        text : 'change label success',
        type : 'success'
      });
    }catch(e){
      Toast.show({
        text : e,
        type : 'danger'
      });
    }
  }

  toSendPage(){
    this.props.setTargetUser(this.props.userId);
    
    this.goPath('message_view');
  }
}