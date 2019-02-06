import _ from 'lodash';
import Error from 'app/lib/Error';
import Log from 'app/lib/Log';

const _log = Log.create('lib/Cache');

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
      Error.create('valid method name');
    }
    return m.apply(null, args);
  }
};

export default {
  method
};