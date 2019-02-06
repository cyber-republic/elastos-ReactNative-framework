import {util} from 'CR';
import Component from './Component';
import dm from '../../data';

export default util.createContainer(Component, (state)=>{
  return {
    profile : state.me.profile
  };
}, ()=>{
  return {
    async changeProfile(info){
      await dm.method.me.changeProfile(info);
    }
  };
});