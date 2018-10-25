import {util} from 'CR';
import Component from './Component';
import dm from '../../data';

export default util.createContainer(Component, (state, props)=>{
  const unread_total = dm.method.message.getTotalUnreadNumber();
  return {
    unread_total
  };
}, ()=>{
  return {
    
  };
});