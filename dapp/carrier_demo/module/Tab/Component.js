import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache} from 'CR';

import { Container, Content, View, Tab, Tabs, List, ListItem, Text, Badge, Footer} from 'native-base';

import ME_PAGE from './ME_PAGE';
import FRIEND_LIST_PAGE from './FRIEND_LIST_PAGE';
import CHAT_LIST_PAGE from './CHAT_LIST_PAGE';

const sy = Style.create({
  tab_style: {
    backgroundColor: '#eee',
    borderTopColor: '#dfdfdf',
    borderTopWidth: 1
  },
  active_tab_style: {
    borderTopColor: '#dfdfdf',
    borderTopWidth: 1
  },
  tab_border : {
    borderLeftColor: '#dfdfdf',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf'
  }
});

export default class extends BasePage{
  ord_renderMain(){
    const p = {
      navigation : this.props.navigation,
    };
    return (
      <Container>
        <Tabs tabBarPosition="bottom">
          <Tab tabStyle={sy.tab_style} activeTabStyle={sy.active_tab_style} heading={this.getChatHeader()}>
            <CHAT_LIST_PAGE {...p} />
          </Tab>
          <Tab tabStyle={[sy.tab_style, sy.tab_border]} activeTabStyle={[sy.active_tab_style, sy.tab_border]} heading="FRIENDS">
            <FRIEND_LIST_PAGE {...p} />
          </Tab>
          <Tab tabStyle={sy.tab_style} activeTabStyle={sy.active_tab_style} heading="ME">
            <ME_PAGE {...p} />
          </Tab>
        </Tabs>
        
      </Container>
    );
  }

  getChatHeader(){
    const {unread_total} = this.props;
    let num = null;
    if(unread_total > 0){
      num = unread_total;
    }
    if(num > 99){
      num = '99+';
    }
    return (
      <View>
        <Text>CHAT</Text>
        {num && (
          <Badge>
            <Text>{num}</Text>
          </Badge>
        )}
      </View>
    );
  }

  ord_renderHeader(){
    return null;
  }

}