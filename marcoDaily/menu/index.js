import React, {Component}from 'react';
import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';

export default class Menu extends React.Component{	
	constructor(props) {
		super(props);
	}
	render(){
		const menu = [
			{
				key: 0,
				text: '我的收藏'
			},
			{
				key: 1,
				text: '知乎日报'
			},
			{
				key: 2,
				text: '今日头条'
			},
			{
				key: 3,
				text: '前端资讯'
			}
		];
		return(
			<View style={styles.navContainer}>
				<View style={styles.marco}>
					<Image style={styles.marcoProfile} source={require('../assets/marco.jpg')} />
					<Text style={{color:'white', fontSize: 23}}>marco日报</Text>
				</View>
				<View style={styles.navTitle}>
					<Text style={{color: 'rgba(52,122,183, 1)', fontSize: 20}}>菜单</Text>
				</View>
				<FlatList style={styles.navList}
					data={menu} 
					renderItem={({item}) => {
						return (
							<TouchableOpacity onPress={()=>this.props.process(item.key)}>
								<Text  style={styles.navListItem}>{item.text}</Text>
							</TouchableOpacity>
						)	
					}}
				/>
			</View>

		);
	}
}



const styles = StyleSheet.create({
	navContainer: {
		flexDirection: 'column',
		width: 300
	},
	marco: {
		flexDirection: 'row',
		height: 100,
		backgroundColor: 'rgba(52,122,183, 1)',
		alignItems: 'center',
		paddingLeft: 30
	},
	marcoProfile: {
		borderRadius: 50,
		height: 50,
		width: 50,
		marginRight: 20
	},
	navTitle: {
		backgroundColor: 'lightgrey',
		flexDirection: 'column',
		justifyContent: 'center',
		height: 50,
		paddingLeft: 30
	},
	navList: {
		paddingLeft: 40
	},
	navListItem: {
		padding: 5,
		fontSize: 18,
		marginTop: 10,
		color: 'black'
	}
})