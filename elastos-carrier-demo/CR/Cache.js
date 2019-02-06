import _ from 'lodash';

const METHOD = {};
const method = {
  METHOD,
  register : (key, func)=>{
    METHOD[key] = func;
  },
  call : (...args)=>{
    const key = args[0];
    return method.apply(key, _.slice(args, 1));
  },
  apply : (key, args)=>{
    const m = _.get(METHOD, key, null);
    if(!m){
      throw('invalid method name : '+key);
    }
    return m.apply(null, args);
  }
};

export default {
  method
};