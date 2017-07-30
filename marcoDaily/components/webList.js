import React, {Component}from 'react';
import {StyleSheet,
        Text,
        View,
        FlatList,
        TouchableNativeFeedback,
        Image,
        DrawerLayoutAndroid,
        TouchableOpacity,
        ToastAndroid,
        AsyncStorage } from 'react-native';

import cheerio from 'cheerio-without-node-native';


import Menu from '../menu';
import Banner from 'react-native-banner';
import LoadingAnimation from '../components/loadingAnimation.js';

import {URL, webBanners} from '../config'



export default class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			dataSource: [],
			pageType: 'loading',
			banners: webBanners
		}

	}
	navToDetail(key, type, url){
		this.props.navigation.navigate('detail', {type: 'web', id: key? key : '9542062', url: url? url : 'http://www.163.com'})
	}

	clickListener(ele) {
		this.navToDetail(-1, 'other', this.state.banners[ele].url);
	}

	requestWebList() {
		fetch(URL.web)
			.then(res => {
				return res.text();
			})
			.then(res => {
				let links = [];
				let $ = cheerio.load(res)
				$('#content article').each(function () {
				    var title = $(this).find('.entry-title span').text();
				    var description = $(this).find('.entry-content p').text();
				    var href = $(this).find('.read-more').attr('href') || $(this).find('.read-more').attr('data-href');
				    var date = $(this).find('.entry-date').text();
				    var tmp = {
				        title: title,
				        id:parseInt(title),
				        description: description,
				        date: date,
				        url: href
				    };
				    console.log(tmp)
				    links.push(tmp);
				});
				this.setState({
					dataSource: links,
					pageType: 'web'
				});
			})
			.catch(err=>{
				ToastAndroid.show('网络出了一点问题', ToastAndroid.SHORT);
			})
	}


	componentDidMount() {
		this.requestWebList();
	}

	render() {
		AsyncStorage.clear();
		let newsArray = this.state.dataSource? this.state.dataSource:[];
		newsArray = newsArray.map((ele, index)=>{
			return Object.assign(ele, {key: ele.id || index}); //keys...
		})
		newsArray.unshift({key:-1}); // 留一个元素用来放banner

		let banners = this.state.banners? this.state.banners:[];

		let pageView = <LoadingAnimation shouldMargin={true}/>;
		if (this.state.pageType == 'web') {
			let web_View = (
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
									    intent={this.clickListener.bind(this)}
									/>	
								</View>		
							
							)
						} else {
							listItemView = (
								<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>this.navToDetail(item.id, 'web', item.url)}>
									<View key={item.key}  style={styles.listItem_web}>
										<Text  style={styles.listItemText_web}>{item.title}</Text>
										<Text style={{fontSize: 15, flex: 3}}>{item.description}</Text>
									</View>
								</TouchableNativeFeedback>
							)	
						}
						return listItemView;
					}}
				/>			
				)
			pageView = web_View;
		} 

		return pageView;
	}
}


const styles = StyleSheet.create({
	list: {
		marginTop: 50
	},
    listItem_web: {
    	height: 150,
    	backgroundColor: 'white',
    	borderRadius: 5,
    	flex: 1,
    	flexDirection: 'column',
    	padding: 15,
    	margin: 5
    },
    listItemText_web: {
    	flex: 1,
    	fontSize: 18,
    	color: 'black'
    },
    listItemImg: {
    	flex: 1,
    	height: 80,
    	width: 80
    }

})