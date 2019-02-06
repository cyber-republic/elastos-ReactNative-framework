import {util} from 'CR';
import Component from './Component';
import dm from '../../data';

export default util.createContainer(Component, (state)=>{
  return {
    
  };
}, ()=>{
  return {
    async addFriend(address, msg){
      await dm.method.friends.sendAddRequest(address, msg);
    }
  };
});