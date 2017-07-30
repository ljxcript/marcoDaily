import React, {Component}from 'react';
import {WebView, StyleSheet, Text, View, FlatList, Image, DrawerLayoutAndroid, TouchableOpacity,ToastAndroid} from 'react-native';

import { NavigationBar, Input, Overlay, Label} from 'teaset';
import { NavigationActions} from 'react-navigation';
import LoadingAnimation from '../components/loadingAnimation.js';

var BGWASH = 'rgba(255,255,255,0.8)';
var scripts = {
	zhihu: 'window.onload = function(){(document.querySelector && document.body.removeChild(document.querySelector(".dudu-head"))) || (document.getElementsByClassName && document.body.removeChild(document.getElementsByClassName("dudu-head")[0]));'
		+'(document.querySelector && document.querySelector(".bottom-download").parentNode.removeChild(document.querySelector(".bottom-download"))) || (document.getElementsByClassName && document.getElementsByClassName("bottom-download")[0].parentNode.removeChild(document.getElementsByClassName("bottom-download")[0]))}',
	web: '',
	type: 'zhihu'
};


export default class Detail extends React.Component{
	static navigationOptions = {
		header: null
	}
	state = {
		backButtonEnabled: false,
		forwardButtonEnabled: false,
		scalesPageToFit: false,
		like: false,
		showCommentInput: false
	}

	back = () => {
		this.props.navigation.goBack();
	}

	getLoadingAnimation(){
		return (
			   <LoadingAnimation shouldMargin={false}/>
		)
	}

	addToCollection(){
		this.setState({showCommentInput: false, like: true});
		ToastAndroid.show('已加入收藏列表', ToastAndroid.SHORT);
	}

	componentDidMount() {
		this.injectJS();
	}

	injectJS() {
		let script = scripts[scripts.type]
		if (this.webview){
			this.webview.injectJavaScript(script)
		}
	}

	render() {
		const {state} = this.props.navigation;

		let WEB_URL = state.params.type == 'zhihu' ? `http://news-at.zhihu.com/story/${state.params.id}` : state.params.url;
		scripts.type = state.params.type;



		return (
			<View style={styles.detailContainer}>

				<NavigationBar  style={{height: 50}}
				leftView={
					<TouchableOpacity onPress={this.back} >
						<View style={styles.back}>
						  <Text style={styles.backText}>返回</Text>
						</View>
					</TouchableOpacity>
				}
				rightView={
					<TouchableOpacity onPress={()=>this.addToCollection()} style={styles.back} >
						<View >
						  <Text style={styles.backText}>{this.state.like? '已收藏':'收藏'}</Text>
						</View>
					</TouchableOpacity>
				}
				/>
				
				<WebView
					ref={webview => {this.webview = webview}}
					automaticallyAdjustContentInsets={false}
					style={styles.webview}
					source={{uri:WEB_URL}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					startInLoadingState={true}
					scalesPageToFit={this.state.scalesPageToFit}
					renderLoading={this.getLoadingAnimation}
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	detailContainer: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'lightgrey'
	},
	back: {
		padding: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		height: 50,
		alignItems: 'center',
		width: 100
	},
	backText: {
		color: 'white',
		fontSize: 14
	},
	webview: {
	   marginTop: 50,
	   backgroundColor: BGWASH
	},
	buttons: {
	  flexDirection: 'row',
	  height: 30,
	  backgroundColor: 'black',
	  alignItems: 'center',
	  justifyContent: 'space-between'
	}
})