import React from 'react';
import { StatusBar,Navigator, StyleSheet, Text, View, Button, TextInput,Picker,TouchableNativeFeedback} from 'react-native';
import { Constants } from 'expo';
import InputButton from './components/InputButton'
import Style from './components/Style'
import SliderInput from './components/SliderInput'
import { Icon ,Grid, Col,Slider} from 'react-native-elements'
const inputButtons = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['.',0, 'Del']
];
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { text: '' , 
    discount:0,
    tax:0,
    inputValue: 0,
    selectedSymbol: null,
    sliderSelector: 'discount',
    stepValue:1,
    sliderColor : '#304FFE',
    sliderValue:0,
    savedMoney:0,
    finalPrice:0};

  }
  /*<View>
  <View style={styles.statusBar} />  
  </View>*/
  render() {
    return (
      
      <View style={styles.container} >

      <StatusBar hidden={true} />
        <View style={Style.displayContainer}>
        <Grid>
          <View style={{flex:1.5}}><Text style={Style.displayText}>{this.state.inputValue}</Text></View>
          <Col style={{flex:1,alignItems:'center'}}> 
            <View style={Style.displayTextContent}>
                  <Text style={{color:'#F44336'}}>You saved</Text>
                  <Text style={{fontSize:16,color:'#F44336'}}>{this.state.savedMoney}</Text>
            </View>
            </Col>
            <Col style={{flex:1,alignItems:'center'}}> 
            <View style={Style.displayTextContent2}>

                  <Text style={{color:'white',paddingTop:5}}>Final price</Text>
               
                  <Text style={{fontSize:38,color:'white'}}>{this.state.finalPrice}</Text>
            </View>
            </Col>
            
          </Grid>
        </View>
        <View style={{flex:1}}>     
        <Grid>
        <TouchableNativeFeedback
          onPress={this._onDiscountButtonPressed}
         background={TouchableNativeFeedback.SelectableBackground()}>
          <Col style={{flex:1,backgroundColor:'#304FFE',alignItems:'center'}}> 
     
          <Text style={{color:'white'}}>Discount</Text> 
          <Text style={{fontSize:24, color:'white'}}>{this.state.discount} %</Text>
      
          </Col>
          </TouchableNativeFeedback>  
          <TouchableNativeFeedback
          onPress={this._onTaxButtonPressed}
           background={TouchableNativeFeedback.SelectableBackground()}>
          <Col style={{flex:1,backgroundColor:'#D500F9',alignItems:'center'}}>
          <Text style={{color:'white'}}>Tax</Text> 
          <Text style={{fontSize:24, color:'white'}}>{this.state.tax} %</Text>
          </Col>
          </TouchableNativeFeedback>  
        </Grid>
        
        </View>
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
          <View style={{padding:10}}>
            <Slider
              value={this.state.sliderValue}
              minimumValue={0}
              maximumValue={100}
              step={this.state.stepValue}
              minimumTrackTintColor	= {this.state.sliderColor}
              maximumTrackTintColor = '#757575'
              thumbTintColor = {this.state.sliderColor}
              onSlidingComplete={
                (tax) => {
                  if(this.state.sliderSelector == "tax"){
                    this.setState({
                      sliderValue:this.state.tax
                    })
                  }else{
                    this.setState({
                      sliderValue:this.state.discount
                    })
                  }
                }
              }
              onValueChange={(tax) => {
                if(this.state.sliderSelector == "tax"){
                  this.setState({
                    tax:tax
                  })
                }else{
                  this.setState({
                    discount:tax
                  })
                }
                this._onPriceProcess()
              }
            } />
          </View>
        </View>
     
        <View style={{flex:5, backgroundColor:'#FFF'}}>
          {this._renderInputButtons()}
        </View>
      </View>
      
    );
  }
  _value(){
    if(this.state.sliderSelector == "tax"){
      return this.state.tax
    }else{    
      return this.state.discount
    }
  }
  _renderInputButtons() {
    let views = [];

    for (var r = 0; r < inputButtons.length; r ++) {
        let row = inputButtons[r];

        let inputRow = [];
        for (var i = 0; i < row.length; i ++) {
            let input = row[i];

          inputRow.push(
            <InputButton
                value={input}
                //highlight={this.state.selectedSymbol === input}
                onPress={this._onInputButtonPressed.bind(this, input)}
                key={r + "-" + i}/>
          );
        }

        views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }

    return views;
    }
    _onPriceProcess(){
      let price = this.state.inputValue
      let discount = this.state.discount
      let tax = this.state.tax
      let priceTax
      let ans = price;
      let ansDiscount
      if(tax != 0){
        priceTax = price + ((price*tax)/100)
        if(discount != 0){
          ansDiscount = (priceTax*discount)/100
          ans = priceTax - ansDiscount
        }
        if(discount == 0){
          ans = price + ((price*tax)/100)
        }
      }
      else if(tax == 0){
        if(discount != 0){
          ansDiscount = (price*discount)/100
          ans = price - ansDiscount
        }
      }
      ansDiscount = Math.round(ansDiscount * 100) / 100
      if(isNaN(ansDiscount)) ansDiscount = 0
      ans = Math.round(ans * 100) / 100
      this.setState({
        savedMoney:ansDiscount,
        finalPrice : ans
      })

    }
    _onInputButtonPressed(input) {
      switch (typeof input) {
          case 'number':
              return this._handleNumberInput(input)
          case 'string':
              return this._handleStringInput(input)
      }
    }
    _handleStringInput(str) {
      switch (str) {
          case 'Del':
             let value = this.state.inputValue;
             value = value.toString();
             value = value.slice(0, -1);
             value = parseFloat(value);
             if(isNaN(value)) value = 0;
              this.setState({
                  selectedSymbol: str,
                  previousInputValue: this.state.inputValue,
                  inputValue: value
              }, function() {
                this._onPriceProcess()
              })
          break;
          case '.':
          let value1 = this.state.inputValue;
          value1 = value1.toString();
          if(value1.indexOf('.') < 0){
            this.setState({
              selectedSymbol: str,
              previousInputValue: this.state.inputValue,
              inputValue: this.state.inputValue+'.'
            }, function() {
              this._onPriceProcess()
            })
          }
          break;
      }
  }
    _handleNumberInput(num) {
      let value = this.state.inputValue;
      value = value.toString();
      let inputValue = (this.state.inputValue * 10) + num;

      if(value.indexOf('.') > -1){
        if(num == 0) {
          inputValue = value + num.toString()
        }else inputValue = value + num
      }
      this.setState({
          inputValue: inputValue
      }, function() {
        this._onPriceProcess()
      })
      
    }
    _onTaxButtonPressed = () => {
      this.setState({
        sliderValue:this.state.tax,
        stepValue:1/2,
        sliderColor : '#D500F9',
        sliderSelector:'tax'
    })
    };
    _onDiscountButtonPressed = () => {
      this.setState({
        stepValue:1,
        sliderColor : '#304FFE',
        sliderSelector:'discount',
        sliderValue:this.state.discount
    })
    };
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    backgroundColor: "#78909C",
    height: Constants.statusBarHeight,
  }
});
