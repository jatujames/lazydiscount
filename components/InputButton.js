import React, { Component } from 'react'

import {View , Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
export default class InputButton extends Component {
  render() {
    return (
       /* <TouchableHighlight style={[Style.inputButton,  this.props.highlight ? Style.inputButtonHighlighted : null]}
                            underlayColor="#193441"
                            onPress={this.props.onPress}>
                            
            <Text style={Style.inputButtonText}>{this.props.value}</Text>
        </TouchableHighlight>*/
        <TouchableNativeFeedback
        style={[Style.inputButton,  this.props.highlight ? Style.inputButtonHighlighted : null]}
        onPress={this.props.onPress}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={Style.inputButtonText}>
            <Text style={{fontSize:21,color:'#212121'}}>{this.props.value}</Text>
        </View>
       
    </TouchableNativeFeedback>  
    )
  }
}
const Style = StyleSheet.create({    
    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

   /* inputButtonText: {
        fontSize: 22,
        fontWeight: 'normal',
        color: '#212121'
    }*/
    inputButtonText: {
        backgroundColor:'#ECEFF1',
        flex:1 ,
        borderWidth:0.2,
        borderLeftWidth:0.5,
        borderColor:'#546E7A',
        justifyContent: 'center',
        alignItems:'center'
    }
});
