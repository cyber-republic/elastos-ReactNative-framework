import type from './constant';
import {_} from 'CR';


export default {
  me_set(param){
    const rs = {
      type : type.me['profile:set'],
    };
    if(param.profile){
      rs.profile = param.profile;
    }
    if(param.address){
      rs.address = param.address;
    }
    if(!_.isUndefined(param.online)){
      rs.online = param.online;
    }

    return rs;
  },

  friends_all_set(param){
    return {
      type : type.friends['all:set'],
      all : param
    };
  },

  friends_wait_set(param){
    return {
      type : type.friends['wait:set'],
      param
    };
  },
  friends_wait_remove(friendId){
    return {
      type : type.friends['wait:remove'],
      param : friendId
    };
  },

  message_add(param){
    return {
      type : type.message['add'],
      param
    };
  },

  message_target(userId){
    return {
      type : type.message['target'],
      param : userId
    }
  },
  message_unread(userId, num){
    return {
      type : type.message['unread'],
      userId,
      num
    }
  }

};