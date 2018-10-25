import {initStore, RootNavigator} from './store';
import {Cache} from 'CR';
// import ReducerType from './store/constant';
import action from './store/action';

import method from './method';

const F = {
	init(){
		F.RootNavigator = RootNavigator;
		F.store = initStore();
		F.dispatch = F.store.dispatch;
		// F.redux = {
		// 	type : ReducerType
		// };
		F.action = action;

		//method;
		F.method = method(F);
		Cache.method.register('_dm-method_', F.method);
		F.method.call = async (...args)=>{
			const key = args[0];
			const fn = _.get(Cache.method['METHOD'], '_dm-method_.'+key, null);
			if(!fn){
				throw (`dm.method.${key} is not a valid method name`);
			}

	    return await fn.apply(null, _.slice(args, 1));
		};
	}
};

export default F;