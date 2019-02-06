import React from 'react';
import BasePage from '../common/BasePage';
import {Cache} from 'app/lib';
import {_, Style} from 'CR';
import InstallAppPage from 'app/module/InstallApp/Container';

import { Container, Header, Content, Button, Text, Grid, Row, Col, View, Thumbnail} from 'native-base';

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
    
  }
})

export default class extends BasePage{
  ord_init(){
    this.state = {
      loading : true
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
      </View>
    );
  }

  toInstallPage(){
    Cache.method.call('modal', 'open', {
      child : InstallAppPage
    })
  }

  async componentDidMount(){
    await this.props.getDAppList();
    this.setState({loading : false});
  }
}