import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache, util, moment} from 'CR';
import dm from '../../data';

import { Container, View, Content, Icon, List, ListItem, Text, Left, Body, Right, Button, Badge} from 'native-base';

const sy = Style.create({
  
});

const Page = class extends BasePage{
  ord_renderMain(){
    return (
      <Content>
        {this.renderList()}
      </Content>
    )
  }
  ord_defineHeaderTitle(){
    return 'CHAT LIST';
  }

  renderList(){
    const {unread} = this.props;
    return (
      <List>
        {
          _.map(unread, (item, i)=>{
            return this.renderEachList(item, i);
          })
        }
      </List>
    );
  }

  renderEachList(d, i){
    const info = this.props.getInfo(d.userId);
    const data = _.last(this.props.message[d.userId]);
    const name = info.name || 'NA';
    const time = moment(data.time).format('YYYY-MM-DD HH:mm:ss');
    return (
      <ListItem style={{position:'relative'}} onPress={this.goto.bind(this, d.userId)} key={i} avatar>
        <Left>
          <Icon type="FontAwesome" style={{color:'#43af92'}} name="user-circle" />
          {d.num > 0 && <View style={{width:6,height:6,backgroundColor:'#f00',borderRadius:3, position:'absolute', right:-2, top:0}} />}
        </Left>
        <Body>
          <Text>{name}</Text>
          <Text note>{data.content}</Text>
        </Body>
        <Right>
          <Text note>{time}</Text>
        </Right>
      </ListItem>
    );
  }

  goto(userId){
    this.props.setTargetUser(userId);
    this.goPath('message_view');
  }
  
}

export default util.createContainer(Page, (state)=>{

  return {
    message : state.message.all,
    unread : state.message.unread,
    friends : state.friends.all
  }
}, ()=>{
  return {
    getInfo(userId=null){
      return dm.method.message.getUserInfo(userId);
    },
    setTargetUser(userId){
      dm.dispatch(dm.action.message_target(userId));
      
    }
  };
})
