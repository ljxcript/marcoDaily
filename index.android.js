/**
 * marcoDaily React Native App
 * 
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import MarcoDaily from './marcoDaily';

AppRegistry.registerComponent('AwesomeProject', () => MarcoDaily);

// import {Label} from 'teaset';
// import {NavigationBar, Drawer, Theme, Input} from 'teaset';

// Theme.set(Theme.themes.black);

// class PizzaTranslator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {text: ''};
//   }

//   render() {
//     let pic = {
//           uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//         };
//     return (
//       <View style={{padding: 10}}>
//           <Input style={{width: 250}}
//             size='lg'
//             value={this.state.value}
//             onChangeText={text => this.setState({value: text})}
//             />
//           <Input style={{width: 250}}
//             size='lg'
//             value={this.state.value}
//             onChangeText={text => this.setState({value: text})}
//             />          

//       </View>
//     );
//   }
// }
// class Blink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { showText: true };


//   }

//   render() {
//     // 根据当前showText的值决定是否显示text内容
//     let display = this.state.showText ? this.props.text : ' ';
//     return (
//       <Text>{display}</Text>
//     );
//   }
// }



// export default class AwesomeProject extends Component {
//   render() {
//     let view = (
//       <View style={{backgroundColor: Theme.defaultColor, height: 260}}>
//         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//           <Label type='detail' size='xl' text='Drawer' />
//         </View>
//       </View>
//     );
//     return (
//       <View style={styles.container}>
//         <NavigationBar title='书柜' leftView={<NavigationBar.BackButton title='返回' onPress={()=>{let drawer = Drawer.show(view, 'bottom');
// }}/>}/>
//         <PizzaTranslator style={{flex:1}} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1


//     // backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
