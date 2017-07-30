import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import Detail from './detail';
import Home from './home';
import Menu from './menu';

const MarcoDaily = StackNavigator({
	home: {
		screen: Home
	},
	detail: {
		screen: Detail,
		path: ':type/:id/:url'
	}
	
})

export default MarcoDaily