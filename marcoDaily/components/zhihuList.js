import React, {Component}from 'react';
import {StyleSheet, Text, View, FlatList,TouchableNativeFeedback, Image, TouchableOpacity, ToastAndroid} from 'react-native';

import {NavigationBar} from 'teaset';
import Banner from 'react-native-banner';
import LoadingAnimation from '../components/loadingAnimation.js';

import {URL} from '../config'

export default class ZhihuList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			dataSource: [],
			pageType: 'loading',
			banners: []
		}

	}

	navToDetail(key, type, url){
		this.props.navigation.navigate('detail', {type: 'zhihu', id: key? key : '9542062', url: url? url : 'http://www.163.com'})
	}


	requestZhiHuList() {
		fetch(URL.zhihu)
			.then(res => res.json()
			)
			.then(res => {
				this.setState({
					dataSource: res.stories, 
					banners: res.top_stories,
					pageType: 'zhihu'
				})
			})
			.catch(err=>{
				ToastAndroid.show('网络出了一点问题', ToastAndroid.SHORT);
			})
	}


	componentDidMount() {
		this.requestZhiHuList();
	}

	render() {

		let newsArray = this.state.dataSource? this.state.dataSource:[];
		newsArray = newsArray.map((ele, index)=>{
			return Object.assign(ele, {key: ele.id || index}); //keys...
		})
		newsArray.unshift({key:-1}); // 脕么脪禄赂枚脭陋脣脴脫脙脌麓路脜banner

		let banners = this.state.banners? this.state.banners:[];

		let pageView = <LoadingAnimation shouldMargin={true}/>;

		if (this.state.pageType == 'zhihu') {
			pageView = (
				<FlatList style={styles.list}
					data={newsArray} 
					renderItem={({item}) => {
						let listItemView;
						if (item.key == -1) {
							listItemView = (
								<View style={{height:180}}>
									<Banner 
										style = {{flex:1}}
									    banners={banners}
									    defaultIndex={0}
									/>	
								</View>		
							
							)
						} else {
							listItemView = (
								<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>this.navToDetail(item.id, 'zhihu')}>
									<View key={item.key}  style={styles.listItem}>
										<Text  style={styles.listItemText}>{item.title}</Text>
										<Image source={{uri: (item.images)[0]}} style={styles.listItemImg} />
									</View>
								</TouchableNativeFeedback>
							)
						}
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
    	flex: 3,
    	fontSize: 17,
    	marginRight: 5,
    	color: 'black'
    },
    listItemImg: {
    	flex: 1,
    	height: 80,
    	width: 80
    }

})