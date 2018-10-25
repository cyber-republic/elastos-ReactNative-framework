import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStackNavigator, withNavigation } from 'react-navigation';
import { createReactNavigationReduxMiddleware, createNavigationReducer, reduxifyNavigator } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import {me, friends, message} from './appReducer';
import router from '../../config/router';
import {Cache} from 'CR';

const r = _.omit(router, ['init']);
const RootNavigatorView = createStackNavigator(r, {
	headerMode : 'none',
	initialRouteName : router.init
});
const navReducer = createNavigationReducer(RootNavigatorView);
const reactNavigation_middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const ReduxView = (reduxifyNavigator(RootNavigatorView, "root"));

const AppView = class extends ReduxView{};
const mapStateToProps = (state) => ({
  state: state.nav,
});
export const RootNavigator = connect(mapStateToProps)(AppView);

export const initStore = ()=>{
	const reducers = {
		nav: navReducer,
		me,
		friends,
		message
	};

	const middleware = [thunk, reactNavigation_middleware];
	return createStore(
		combineReducers(reducers),
		applyMiddleware(...middleware),
	);
};