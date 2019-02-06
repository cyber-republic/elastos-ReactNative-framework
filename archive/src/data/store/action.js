import type from './constant';


export default {
  dapp_list(list){
    return {
      type : type.app.dapp_list,
      list
    };
  }

};