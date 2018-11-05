import {createContainer} from 'app/lib';
import HomeComponent from './HomeComponent';
import dm from 'app/data';

export default createContainer(HomeComponent, (state)=>{
  return {
    list : state.app.dapp_list
  };
}, ()=>{
  return {
    async getDAppList(){
      //await dm.method.dapp.list();
    },
    async loadDapp(url){
      await dm.method.dapp.loadByUrl(url);
    }
  };
});