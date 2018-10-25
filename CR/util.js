import _ from 'lodash';
import moment from 'moment';
import IHStyle from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

// _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;


const util = {
	constants(moduleName, namespace, constants){
		return Object.freeze(
			constants.reduce((obj, constant) => {
				return {
					...obj,
					[constant]: `${moduleName}/${namespace}/${constant}`
				};
			}, {})
		);
	},
	
	createContainer(container, mapState, mapDispatch){
		return connect(mapState, mapDispatch)(container);
	}
};

const IHSTYLE = {};
_.set(IHStyle, 'set', (key, value)=>{
	IHSTYLE[key] = (value);
});
_.set(IHStyle, 'get', (key)=>{
	return IHSTYLE[key] || {};
});

export {
	_,
	moment,
	IHStyle,
	util
};