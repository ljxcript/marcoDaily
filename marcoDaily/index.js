import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import Detail from './detail';
import Home from './home';
import Collection from './collection';
const MarcoDaily = StackNavigator({
	home: {
		screen: Home
	},
	detail: {
		screen: Detail,
		path: ':type/:id/:url/:info'
	},
	collection: {
		screen: Collection
	}
	
})

export default MarcoDaily