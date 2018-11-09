# How to run dapps with plugin
[templary verison]

## Code structure
[./structure.md]

## Run your dapp

### Put your dapp code under /dapp
Just like carrier_demo, put your whole dapp code here.

### change entrance file

```
import {AppRegistry} from 'react-native';

// put your entrance here
import './dapp/carrier_demo/app';

// import App from './src/main';
// AppRegistry.registerComponent('ELASTOS_RN_FRAMEWORK', () => App);
```

