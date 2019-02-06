import {util, _} from 'CR';
import Component from './Component';
import dm from '../../data';

export default util.createContainer(Component, (state, ownProps)=>{
  const id = ownProps.navigation.state.params.userId;
  return {
    friends : state.friends.all,
    userId : id
  };
}, ()=>{
  return {
    async changeLabel(friendId, label){
      return await dm.method.friends.setLabel(friendId, label);
    },

    setTargetUser(userId){
      dm.dispatch(dm.action.message_target(userId));
    },

    async createSession(userId){
      await dm.method.session.createSession(userId);
    }
  };
});