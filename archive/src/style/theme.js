import CR, {_} from 'CR';
import {Platform} from 'react-native';

const common = {
  $statusBarHeight : Platform.OS === 'ios' ? 20 : 0,
  $gap : 15,

  $drawerBG : '#454545',
  $mainBG : '#eee',

  $primary_color : 'rgb(255, 82, 0)',
  $primary_font_color : '#fff'
};

const _class = {
  
};

_.each(_class, (value, key)=>{
  CR.Style.set(key, value);
});

export default {
  ...common,
};