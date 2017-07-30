import React, {Component}from 'react';
import {StyleSheet, Text, View, FlatList,TouchableNativeFeedback, Image, TouchableOpacity, ToastAndroid, AsyncStorage} from 'react-native';

import {NavigationBar} from 'teaset';
import Banner from 'react-native-banner';
import LoadingAnimation from '../components/loadingAnimation.js';

import {URL} from '../config'

export default class ZhihuList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			dataSource: [],
			pageType: 'loading'
		}

	}

	navToDetail(key, type, url){
		this.props.navigation.navigate('detail', {type: type? type: 'zhihu', id: key? key : '9542062', url: url? url : 'http://www.163.com'})
	}


	requestFromStorage() {
		AsyncStorage.getItem('collections', (err, result)=> {
			if (err) {
				ToastAndroid.show('没有发现收藏记录', ToastAndroid.SHORT);
			} else {
				this.setState({
					dataSource: result,
					pageType: 'collections'
				})
			}	
		})
	}


	componentDidMount() {
		this.requestFromStorage();
	}

	render() {

		 let dtSrc= this.state.dataSource? this.state.dataSource:[];
		 let dataArray = [];
		for (key in dtSrc) {
			let arr = dtSrc[key];
			let result = [];
			let subArr = [];
			for (let i = 0, l = arr.length; i < l; i++) {
				subArr.push(arr[i])
				if(i % 2 != 0)  {
					result.push(subArr);
					subArr = new Array();
				}
			}
			if (subArr.length != 0) {
				result.push(subArr)
			}
			dataArray.push({date:key, data: result});
			
		}

		dataArray = dataArray.map((ele, index)=>{
			return Object.assign(ele, {key: ele.id || index}); //keys...
		})



		let pageView = <LoadingAnimation shouldMargin={true}/>;

		if (this.state.pageType == 'collections') {
			pageView = (
				<FlatList style={styles.list}
					data={dataArray} 
					renderItem={({item}) => {
						let listItemView;
						listItemView = (
							<View>
							<Text style={{color: 'grey',fontSize: 17}}>{item.date}</Text>
							<FlatList 
								data={item.data}
								renderItem={({it}) => {
									if (it.length > 1) {
										return (
											<View style={{margin: 5, padding: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
												<View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', flexDirection: 'column'}}>
													<Image source={{uri: it[0].image}} style={styles.listItemImg} />
													<Text  style={styles.listItemText}>{it[0].title}</Text>
													<Text>{'来自知乎日报'}</Text>
												</View>
												<View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', flexDirection: 'column'}}>
													<Image source={{uri: it[1].image}} style={styles.listItemImg} />
													<Text  style={styles.listItemText}>{it[1].title}</Text>
													<Text>{'来自知乎日报'}</Text>
												</View>											
											</View>
										) 
									} else {
										return (
											<View style={{padding: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
												<View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)',flexDirection: 'column'}}>
													<Image source={{uri: it[0].image}} style={styles.listItemImg} />
													<Text  style={styles.listItemText}>{it[0].title}</Text>
													<Text >{'来自知乎日报'}</Text>
												</View>
												<View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)',flexDirection: 'column'}}>
												</View>											
											</View>
										)
									}	
								}}
						)
						return listItemView;
					}}
				/>
			)
		}

		return pageView;
	}
}


const styles = StyleSheet.create({

	list: {
		marginTop: 50
	},
    listItem: {
    	height: 100, 
    	backgroundColor: 'white',
    	borderRadius: 5,
    	flex: 1,
    	margin: 5,
    	padding: 10,
    	flexDirection: 'row'
    },
    listItemText: {
    	flex: 1,
    	fontSize: 15,
    	color: 'black'
    },
    listItemImg: {
    	flex: 2,
    	height: 80,
    	width: 80
    }

})