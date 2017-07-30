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



export default class CollectionList extends React.Component{

	constructor(props){
		super(props);
		this.state = {

		}

	}

	componentDidMount() {

	}

	render() {
		let data = this.props.collectionList;
		let collection_View = (
			<FlatList 
				data={data}
				renderItem={({item}) => {
					if (item.length && item.length > 1) {
						return (
							<View style={styles.collectionRow}>
								<View style={styles.collectionItem}>
									<Image source={{uri: item[0].image}} style={styles.listItemImg} />
									<Text  style={styles.listItemText}>{item[0].title}</Text>
									<Text style={{marginTop: 5}}>{'来自知乎日报'}</Text>
								</View>
								<View style={{flex:1}}></View>
								<View style={styles.collectionItem}>
									<Image source={{uri: item[1].image}} style={styles.listItemImg} />
									<Text  style={styles.listItemText}>{item[1].title}</Text>
									<Text style={{marginTop: 5}}>{'来自知乎日报'}</Text>
								</View>											
							</View>
						) 
					} else {
						return (
							<View style={styles.collectionRow}>
								<View style={styles.collectionItem}>
									<Image source={{uri: item[0].image}} style={styles.listItemImg} />
									<Text  style={styles.listItemText}>{item[0].title}</Text>
									<Text  style={{marginTop: 5}}>{'来自知乎日报'}</Text>
								</View>
								<View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)',flexDirection: 'column'}}>
								</View>											
							</View>
						)
					}	
			}}/>
		)
		return collection_View;
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
    listItemText: {
    	flex: 1,
    	fontSize: 15,
    	color: 'black',
    	marginTop: 15
    },    
    listItemImg: {
    	flex: 1,
    	height: 80,
    	width: 80
    },
    collectionRow: {
    	margin: 5,
     	padding: 10,
     	flex: 1,
     	flexDirection: 'row',
     	justifyContent: 'space-around',
     	alignItems: 'center'
 	},
    collectionItem: {
    	elevation: 10,
    	alignItems: 'center',
        flex: 5,
     	backgroundColor: 'white', 
     	flexDirection: 'column', 
     	padding: 15}

})
