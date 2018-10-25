import React from 'react';
import StackPage from 'app/module/common/StackPage';
import {_, Style, Cache} from 'CR';

import { Container, View, Content, Button, Text, Form, Item, Label, Input} from 'native-base';

const sy = Style.create({
  btn: {},
});

export default class extends StackPage{

  ord_init(){
    this.param = {};

    this.state = {
      loading : false
    };
  }

  ord_checkLoading(){
    return this.state.loading;
  }
  
  ord_renderMain(){
    return (
      <Content>
        {this.renderForm()}
        {this.renderButton()}
      </Content>
    );
  }

  renderForm(){
    const profile = this.props.profile;
    return (
      <Form>
        {_.map(['name', 'email', 'description', 'phone', 'gender', 'region'], (key, i)=>{
          this.param[key] = profile[key] || '';
          const p = {
            value : this.param[key],
            onChangeText : (t)=>{
              this.param[key] = t;
            }
          };
          return (
            <Item key={i} inlineLabel>
              <Label>{_.capitalize(key)}</Label>
              <Input {...p} />
            </Item>
          )
        })}
      </Form>
    );
  }

  renderButton(){
    return (
      <View style={{paddingLeft:15, paddingRight:15, marginTop:40}}>
        <Button style={sy.btn} success block onPress={this.change.bind(this)}>
          <Text>Change Profile</Text>
        </Button>
      </View>
    );
  }

  async change(){
    this.setState({loading : true});
    await this.props.changeProfile(this.param);
    this.setState({loading : false});
    this.goBack();
  }

  ord_defineHeaderTitle(){
    return 'EDIT PROFILE';
  }

}