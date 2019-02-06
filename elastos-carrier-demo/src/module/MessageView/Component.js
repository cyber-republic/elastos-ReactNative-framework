import React from 'react';
import StackPage from 'app/module/common/StackPage';
import {_, Style, Cache} from 'CR';
import {Image} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Container, View, Content, Button, Text, 
  Form, Item, Label, Input, Row, Col, Icon, Toast, Thumbnail
} from 'native-base';

const sy = Style.create({
  box : {
    // height: '100%'
    flex: 1
  },
  cont: {
    // flex: 1,
    paddingBottom: 30,
    marginBottom: 0,
    // overflow: 'hidden'
  },
  send_ared: {
    // width: '100%',
    height: 50,
    // position : 'absolute',
    // flex: 1,
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eee',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  send_input: {
    backgroundColor: '#fff',
    borderColor: '#c9c9c9',
    borderRadius: 5,
    borderWidth: 1,
    color: '#333',
    paddingLeft: 5
  },
  send_option: {
    width: 40,
    height: 40,
    left: 10,
    top : 5

  },

  col_l: {
    width : 60,
    // justifyContent : 'center',
    alignItems : 'center'
  },
  col_b: {
    textAlign: 'right',
  },
  col_r: {
    width : 60,
    // justifyContent : 'center',
    alignItems : 'center'
  },
  vt : {
    backgroundColor: '#00ff00',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    maxWidth: '100%'
  },
  vt1 : {
    right: 0
  },
  bt: {
    fontSize : 14
  },
  bt1: {
    fontSize : 14,
    
  },
  row: {
    marginTop: 12,
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default class extends StackPage{

  ord_init(){
    this.state = {
      loading : false,
      text : ''
    };

    this.tmp = this.state.text;

  }

  ord_checkLoading(){
    return this.state.loading;
  }
  
  ord_renderMain(){
    return (
      <Container style={sy.box}>
        {this.renderList()}
        {this.renderSendArea()}
        <KeyboardSpacer />
      </Container>
    );
  }

  renderList(){
    const list = this.props.list;
    const p = {
      style : sy.cont,
      ref : 'scroll',
      onContentSizeChange : (w, h)=>{
        this.refs.scroll._root.scrollToEnd({
          animated: true
        });
      }
    };
    return (
      <Content {...p}>
        {
          _.map(list, (item, i)=>{
            return this.renderEachList(item, i);
          })
        }
        
        
      </Content>
    );
  }

  renderEachList(d, i){
    if(d.type === 'to'){
      return (
        <Row key={i} style={sy.row}>
          <Col style={sy.col_l}><Icon name="user-circle" type="FontAwesome" /></Col>
          <Col style={sy.col_b}>
            <View style={sy.vt}>{this.renderMessageContent(d)}</View>
          </Col>
          <Col style={sy.col_r}></Col>
        </Row>
      );
    }
    else if(d.type === 'from'){
      return (
        <Row key={i} style={sy.row}>
          <Col style={sy.col_l}></Col>
          <Col style={sy.col_b}>
            <View style={[sy.vt, sy.vt1]}>{this.renderMessageContent(d)}</View>
          </Col>
          <Col style={sy.col_r}><Icon name="user-circle" type="FontAwesome" /></Col>
        </Row>
      );
    }
  }

  renderMessageContent(d){
    if(d.contentType === 'text'){
      return (
        <Text style={sy.bt}>{d.content}</Text>
      );
    }
    else if(d.contentType === 'image'){
      return (
        <Image style={{width:'100%', height:120}} source={{uri: d.content}} />
      );
    }
    else{
      return 'invalid stream type : '+d.contentType;
    }
  }

  renderSendArea(){
    const {info} = this.props;
    const p = {
      returnKeyType : 'send',
      // blurOnSubmit : true,
      defaultValue : this.state.text,
      // ref : 'text',
      onSubmitEditing : async ()=>{
        
        try{
          const text = this.tmp;
          this.setState({text});
          await this.props.sendText(info.userId, text);
          this.tmp = '';
          this.setState({text : ''});
          

        }catch(e){
          Toast.show({
            text : e,
            type : 'danger'
          });
        }
      },
      onChangeText : (value)=>{
        // this.state.text = text;
        // value = value.replace(/[^\d/a-zA-Z]/g,'');
        this.tmp = value;
      }
    };
    return (
      <View style={sy.send_ared}>
        <Input {...p} style={sy.send_input} />
        <Button success style={sy.send_option} icon rounded onPress={this.sendImage.bind(this)}>
          <Icon name="ios-add" />
        </Button>
      </View>
    );
  }

  async sendImage(){
    const {info} = this.props;
    this.props.showSelectImageBox(async (flag, data64)=>{
      if(flag){
        await this.props.sendStream(info.userId, 'image', data64);
      }
      
    });
  }

  ord_defineHeaderTitle(){
    const name = this.props.info.name || 'NA';
    return name + ' ['+this.props.info.state+']';
  }

  componentDidMount(){
    this.props.navigation.addListener('didBlur', (payload)=>{
      // remove target
      this.props.removeTarget();
    });

    this.props.navigation.addListener('didFocus', (payload)=>{
      // remove unread
      this.props.removeUnread(this.props.current);
    });

    this.refs.scroll._root.scrollToEnd();
  }

  shouldComponentUpdate(np){
    return true;
  }

  

}