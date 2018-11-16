import {_, moment, IHStyle, util} from './util';
import Cache from './Cache';
import {Carrier} from 'react-native-elastos-carrier';
import QRCode from 'react-native-qrcode';
import { RNCamera } from 'react-native-camera';


const init = (param)=>{
	param = _.extend({
		theme : 'default',
		themeStyle : {}
	}, param||{});


	IHStyle.build(_.merge({}, param.themeStyle));
};
console.log(111, Carrier);
const plugin = {
	Carrier,
	QRCode, // https://github.com/cssivision/react-native-qrcode,
	RNCamera, // https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md
};

export default {
	_,
	moment,
	Cache,
	Style : IHStyle,
	util,
	init,
	plugin
};

const Style = IHStyle;
export {
	_,
	moment,
	Cache,
	init,
	util,
	Style,
	plugin
}