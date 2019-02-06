import {NativeModules} from 'react-native';

const TEST = NativeModules.Test;

export default {
  async load(url){
    await TEST.load(url);
  }
};