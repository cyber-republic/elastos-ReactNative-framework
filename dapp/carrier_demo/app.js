import React from 'react';
import {StatusBar} from 'react-native';
import {StyleProvider, Container, Tabs, Tab, Root, View} from 'native-base';
import { Provider } from 'react-redux';
import {_, Cache} from 'CR';
import './boot';

import dm from './data';
import dapp from '../shared/dapp';

import GlobalModal from 'app/module/common/GlobalModal';


const App = class extends React.Component{
	render(){
		const content = <dm.RootNavigator />;
		return (
			<Provider store={dm.store}>
				<Root>
					<StatusBar
						backgroundColor="blue"
						barStyle="default"
					/>
	
					{content}
					<GlobalModal />
				</Root>
				
			</Provider>
		);
	}

	
};

dapp.start(App);