import {util} from 'CR';
import Component from './Component';
import dm from '../../data';

export default util.createContainer(Component, (state)=>{
  const current = state.message.target;
  const info = dm.method.message.getUserInfo(current);
  return {
    all : state.message.all,
    current,
    info,
    list : state.message.all[current]
  };
}, ()=>{
  return {
    async sendText(userId, text){
      await dm.method.message.sendTextMessage(userId, text);
    },
    removeTarget(){
      dm.dispatch(dm.action.message_target(null));
    },
    removeUnread(userId){
      dm.dispatch(dm.action.message_unread(userId));
    }
  };
});