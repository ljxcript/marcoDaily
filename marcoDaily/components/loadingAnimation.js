import React, {Component}from 'react';
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';

export default class Menu extends React.Component{	
	constructor(props){
		super(props);
		this.state = {
			opacity: new Animated.Value(0),
			rotation: [1,2,3,4].map( () => new Animated.Value(0) )
		}

	}

	startAnimation() {
		this.state.rotation.forEach(ele=>ele.setValue(0))

		Animated.stagger(80, this.state.rotation.map(
			rot => {
				return Animated.parallel([
					Animated.timing(this.state.opacity, {
						toValue: 1,
						duration: 20
					}),

					Animated.timing(rot, {
					toValue: 1,
					duration: 800,
					easing: Easing.out(Easing.exp)
				})])
			}
		)).start(() => this.startAnimation());
	}

	componentDidMount(){
		this.startAnimation();
	}
	render(){
		let op = this.state.opacity;
		let Colors = ['rgb(255,206,67)','rgb(25,161,95)','rgb(221,80,68)', 'rgb(76,139,245)'];
		let Views = this.state.rotation.map( (value, i) =>{
			return (
				<Animated.View key={i} style={{position: 'absolute', left: 17, top: 0, width: 6, height: 40, 
					opacity: op.interpolate({
						inputRange: [0,1],
						outputRange: [0,1]
					}),
					transform: [
						{rotateZ: value.interpolate({
							inputRange: [0, 1],
							outputRange: ['0deg', '-360deg']
						})}
					]}}>
					<Animated.View style={{
						width: 6, height: 6, borderRadius: 6, backgroundColor: Colors[i], zIndex:i
					}}></Animated.View>
				</Animated.View>

			)
		})
		return(
			<View style={{marginTop: this.props.shouldMargin? 50:0, flex: 1, backgroundColor: 'white', flexDirection: 'column', alignItems: 'center'}}>
				<View style={{flex: 1}}></View>
				<View style={{height:40, width: 40, flex: 1, marginTop: -100}}>
				{Views}	
				</View>											
			</View>	

		);
	}
}
