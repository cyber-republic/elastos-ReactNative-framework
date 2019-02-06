import {createContainer} from 'app/lib';
import Component from './Component';
import dm from 'app/data';

export default createContainer(Component, (state)=>{
  return {
    list : state.app.dapp_list
  };
}, ()=>{
  return {
    async openDapp(name, url){
      return await dm.method.dapp.open(name, url);
    }
  };
});