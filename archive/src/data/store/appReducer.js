import {_} from 'CR';
import type from './constant';

const DEFAULT = {
  dapp_list : []
};

export default (state=DEFAULT, action={})=>{
  switch(action.type){
    case type.app.dapp_list:
      return {
        dapp_list : action.list
      };
  }

  return state;
};