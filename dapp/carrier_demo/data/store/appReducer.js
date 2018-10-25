import {_} from 'CR';
import type from './constant';

const DEFAULT = {
  me : {
    profile : {},
    address : '',
    online : false
  },

  friends : {
    all : {},
    wait : {}
  },

  message : {
    all : {
      // userId, type, msg, time
    },
    unread : [
      // userId, num
    ],
      
    
    target : 'NA'
  }
};

export const me = (state=DEFAULT.me, action={})=>{
  switch(action.type){
    case type.me['profile:set']:
      const tmp = _.merge({}, state, {
        profile : action.profile,
        address : action.address,
        online : action.online
      });
      return {
        ...state,
        ...tmp
      };
  }

  return state;
};

export const friends = (state=DEFAULT.friends, action={})=>{
  let tmp;
  switch(action.type){
    case type.friends['all:set']:
      tmp = _.merge({}, state.all, action.all);
      return {
        ...state,
        all : {
          ...tmp
        }
      };
    case type.friends['all:add']:
    case type.friends['all:update']:
      tmp = {};
      tmp[action.param.userId] = action.param.userId;
      return {
        ...state,
        all : {
          ...state.all,
          ...tmp
        }
      };
    case type.friends['all:remove']:
      const userId = action.param;
      delete state.all[userId];
      return {
        ...state,
        all : {
          ...state.all
        }
      }
    case type.friends['wait:set']:
      tmp = _.merge({}, state.wait, action.param);
      return {
        ...state,
        wait : {
          ...tmp
        }
      };
    case type.friends['wait:remove']:
      delete state.wait[action.param];
      return {
        ...state,
        wait : {
          ...state.wait
        }
      }
  }

  return state;
}

const M = {
  processUnread(state, data){
    const {type, userId} = data;
    const isTarget = state.target === userId;
    const old_index = _.findIndex(state.unread, (item)=>{
      return item.userId === userId;
    });
    const tmp = {
      userId : userId
    };
    if(old_index === -1){
      if(type === 'to'){
        if(isTarget){
          tmp.num = 0;
        }
        else{
          tmp.num = 1;
        }
      }
      else if(type === 'from'){
        tmp.num = 0;
      }
      // state.unread.unshift(tmp);
    }
    else{
      const old = state.unread.splice(old_index, 1)[0];

      if(type === 'to'){
        if(isTarget){
          tmp.num = 0;
        }
        else{
          tmp.num = old.num+1;
        }
      }
      else if(type === 'from'){
        tmp.num = 0;
      }
      
    }
    state.unread.unshift(tmp);
    return _.clone(state.unread);
  }
};
export const message = (state=DEFAULT.message, action={})=>{
  switch(action.type){
    case type.message['add']:
      const userId = action.param.userId;
      let tmp = state.all[userId];
      if(!tmp){
        tmp = [];
      }
      tmp.push(action.param);
      state.all[userId] = tmp;

      return {
        ...state,
        all : {
          ...state.all
        },
        unread : M.processUnread(state, action.param)
      };
    case type.message['target']:
      return {
        ...state,
        target : action.param || 'NA'
      };
    case type.message['unread']:
      const unread_list = state.unread;
      const index = _.findIndex(unread_list, (item)=>{
        return item.userId === action.userId;
      });
      if(index === -1){
        break;
      }
      unread_list[index]['num'] = action.num || 0;
      return {
        ...state,
        unread : _.clone(unread_list)
      };
  }

  return state;
}
