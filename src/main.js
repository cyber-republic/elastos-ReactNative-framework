import React from 'react';
import {StatusBar} from 'react-native';
import {StyleProvider, Container, Tabs, Tab, Root} from 'native-base';
import { Provider } from 'react-redux';
import {_} from 'CR';
import './boot';

import dm from 'app/data';

import GlobalModal from 'app/module/common/GlobalModal';

import getTheme from '../native-base-theme/components';


const App = class extends React.Component{
	render(){
		const content = <dm.RootNavigator />;
		return (
			<Provider store={dm.store}>
				<StyleProvider style={getTheme()} ><Root>
					<StatusBar
						backgroundColor="blue"
						barStyle="default"
					/>
	
					{content}
					<GlobalModal />
				</Root></StyleProvider>
				
			</Provider>
		);
	}

	
};

export default App;