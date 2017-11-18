import React, { Component } from 'react'

import {Slider} from 'react-native-elements'
export default class SliderInput extends Component {
  render() {
    return (
      <Slider
          value={this.props.value}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor	='#304FFE'
          maximumTrackTintColor = '#757575'
          thumbTintColor = '#304FFE'
          onValueChange={(discount) => props.setState({discount})} 
          />
    )
  }
}
