import React, {Component}from 'react';
import {StyleSheet, Text, View, FlatList,TouchableNativeFeedback, Image, TouchableOpacity, ToastAndroid, AsyncStorage} from 'react-native';

import {NavigationBar} from 'teaset';
import Banner from 'react-native-banner';
import LoadingAnimation from '../components/loadingAnimation.js';
import CollectionList from '../components/collectionList.js';
import {URL} from '../config'

export default class ZhihuList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			dataSource: [],
			pageType: 'loading'
		}

	}
	static navigationOptions = {
		header: null
	}
	back = () => {
		this.props.navigation.goBack();
	}	
	navToDetail(key, type, url){
		this.props.navigation.navigate('detail', {type: type? type: 'zhihu', id: key? key : '9542062', url: url? url : 'http://www.163.com'})
	}


	requestFromStorage() {
		AsyncStorage.getItem('collections', (err, result)=> {
			if (err || result === null) {
				ToastAndroid.show('没有发现收藏记录', ToastAndroid.SHORT);
			} else {
				this.setState({
					dataSource: JSON.parse(result),
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
						let listItemView = (
							<View style={{padding: 10, backgroundColor: 'white', elevation: 10}}>
								<Text style={{color: 'grey',fontSize: 17}}>{item.date}</Text>
								<CollectionList collectionList={item.data}/>
							</View>
						)
						return listItemView;
					}}
				/>
			)
		}

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

				/>
				{pageView}
			</View>
		)
		
	}
}


const styles = StyleSheet.create({
	homeContainer: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'lightgrey'
	},
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
    }

})