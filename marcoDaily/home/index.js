import React, {Component}from 'react';
import {StyleSheet, Text, View, FlatList,TouchableNativeFeedback, Image, DrawerLayoutAndroid, TouchableOpacity, ToastAndroid} from 'react-native';

import {NavigationBar} from 'teaset';
import cheerio from 'cheerio-without-node-native';
import Banner from 'react-native-banner';

import Menu from '../menu';
import LoadingAnimation from '../components/loadingAnimation.js';
import ZhihuList from '../components/zhihuList.js';
import WebList from '../components/webList.js';


export default class Home extends React.Component{




	constructor(props){
		super(props);
		this.state = {
			pageType: 'loading'
		}

	}

	static navigationOptions = {
		header: null
	}
	openDrawer(){		
		this.refs.drawerLayout.openDrawer()
	}
	closeDrawer(){
		this.refs.drawerLayout.closeDrawer()
	}

	menuProccessing(pageId) {

		if (pageId == 0) {
			this.props.navigation.navigate('collection', {type: 'zhihu', id: key? key : '9542062', info: {},url: url? url : 'http://www.163.com' })

		}
		if (pageId == 1){
			this.setState({pageType: 'zhihu'})
		}
		if (pageId == 3){
			this.setState({pageType: 'web'})
		}
		this.closeDrawer()
	}

	componentDidMount() {

	}

	render() {
		let navigationView = <Menu process={this.menuProccessing.bind(this)}/>;  //菜单只是一个view, 真正的跳转逻辑在home界面中

		let pageView = <LoadingAnimation shouldMargin={true}/>;

		if (this.state.pageType == 'zhihu') {
			pageView = <ZhihuList navigation = {this.props.navigation}/>;
		}
		if (this.state.pageType == 'web') {
			pageView = <WebList navigation = {this.props.navigation}/>;
		} 

		return (
			<View style={styles.homeContainer}>
				<DrawerLayoutAndroid
				  ref={'drawerLayout'}
				  drawerBackgroundColor="rgba(255,255,255,0.8)" //指定抽屉的背景颜色。默认值为白色。如果要设置抽屉的不透明度，请使用rgba。
			      drawerWidth={250} 	//指定抽屉的宽度，也就是从屏幕边缘拖进的视图的宽度。
			      drawerPosition={DrawerLayoutAndroid.positions.Left} 	//指定抽屉可以从屏幕的哪一边滑入。Right|Left		     
			      renderNavigationView={() => navigationView}  			//用于渲染一个可以从屏幕一边拖入的导航视图。

			      >

				<NavigationBar title='Marco日报' style={{height: 50}}
				leftView={
					<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>this.openDrawer()} style={{height:30,width:35}}>
						<View style={styles.menu}>
							<View style={styles.menuLine}></View>
							<View style={styles.menuLine}></View>
							<View style={styles.menuLine}></View>
						</View>
					</TouchableNativeFeedback>
					}
				 />
				 {pageView}


			    </DrawerLayoutAndroid>			
			</View>
		);
	}
}


const styles = StyleSheet.create({
	homeContainer: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'lightgrey'
	},
	menu: {
		padding: 5,
		flexDirection: 'column',
		justifyContent: 'space-around',
		height: 30,
		width: 35
	},
	menuLine: {
		backgroundColor: 'rgba(255,255,255, 1)',
		height: 3
	}


})