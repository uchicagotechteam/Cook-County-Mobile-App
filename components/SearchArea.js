import * as React from 'react';
import { View, Animated, Button, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
});

// Class showing the search capabilities of a screen
// Props include
//   active : Bool               - Boolean controlling if the search area is active
//   updateSearch : Func(String) - Function that tells the parent to update the search text when the search is changed
//   updateDates : Func(Object)  - Function that tells the parent to update the date restrictions when the date search is changed {dateRestriction : String, afterDate : Date, beforeDate : Date}
class SearchArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationValue : new Animated.Value(0),
      modalVisible: false,
      beforeDate : null,
      afterDate : null,
      dateRestriction : "Anytime",
      showBeforePicker : false,
      showAfterPicker : false,
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  fadeIn = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver : true
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver : true
    }).start();
  };

  componentDidUpdate(){
    if(this.props.active){
      this.fadeIn();
    } else{
      this.fadeOut();
    }
  }

  restrictionToString(){
    let restriction = this.state.dateRestriction;
    let afterNull = this.state.afterDate == null;
    let beforeNull = this.state.beforeDate == null;
    if(restriction == "Anytime"){
      return "Videos from any date";
    }
    if(restriction == "Between" && afterNull && beforeNull){
      return "Select two dates"
    }
    if(restriction == "Between" && afterNull){
      return "Select a date for the videos to come after"
    }
    if(restriction == "Between" && beforeNull){
      return "Select a date for the video to come before"
    }
    if(restriction == "After" && afterNull){
      return "Select a date for the video to come after"
    }
    if(restriction == "Before" && beforeNull){
      return "Select a date for the video to come before"
    }
    if(restriction == "On" && afterNull){
      return "Select a day"
    }
    let afterDateString = (!afterNull ? 
      this.state.afterDate.toLocaleDateString("en-US")
      : "");
    let beforeDateString = (!beforeNull ? 
      this.state.beforeDate.toLocaleDateString("en-US")
      : "");
    if(restriction == "On"){
      return ("Videos from " + afterDateString);
    }
    if(restriction == "Before"){
      return ("Videos from before " + beforeDateString);
    }
    if(restriction == "After"){
      return ("Videos from after " + afterDateString);
    }
    if(restriction == "Between"){
      return ("Videos from after " + afterDateString + " but before " + beforeDateString);
    }
  }

  getDateButtons(){
    let restriction = this.state.dateRestriction;
    let afterNull = this.state.afterDate == null;
    let beforeNull = this.state.beforeDate == null;
    if(restriction == "On" || restriction == "Before" || restriction == "After"){
      return (<Button
        title={(afterNull && beforeNull) ? "Select date" : "Change date"}
        onPress={() => restriction == "Before" ?
          this.setState({showBeforePicker : true})
          : this.setState({showAfterPicker : true}) }
        style={{paddingLeft : 10, paddingRight : 10}}
      />)
    }
    if(restriction == "Between"){
      return (<View style={{ flexDirection : "row", justifyContent: 'space-evenly', }}>
          <Button
            title={afterNull ? "Select after date" : "Change after date"}
            onPress={() => this.setState({showAfterPicker : true})}
          />
          <Button
            title={beforeNull ? "Select before date" : "Change before date"}
            onPress={() => this.setState({showBeforePicker : true})}
          />
        </View>)
    }
    return null;
  }

  render(){
    return (!this.props.active ? null :
      <View>
        { this.state.showAfterPicker ? <DateTimePicker
          value={this.state.afterDate == null ? new Date() : this.state.afterDate}
          mode={'date'}
          display={"calendar"}
          maximumDate={this.state.beforeDate != null && this.state.dateRestriction == "Between"
            ? this.state.beforeDate : new Date() }
          onChange={(event, newDate) => {
            this.setState({showAfterPicker : false, showBeforePicker : false});
            if(newDate != undefined && newDate != null){
              this.setState({afterDate : newDate, showafterPicker : false})
              var nextDay = null;
              if(this.state.dateRestriction == "On"){
                nextDay = new Date(newDate);
                nextDay.setDate(newDate.getDate() + 1);
                this.setState({beforeDate : nextDay, showafterPicker : false})
                this.props.updateDates("Between", newDate, nextDay)
              } else {
                this.props.updateDates(this.state.dateRestriction, newDate, this.state.beforeDate)
              }
            }
          }}
        /> : null }
        { this.state.showBeforePicker ? <DateTimePicker
          value={this.state.beforeDate == null ? new Date() : this.state.beforeDate}
          mode={'date'}
          display={"calendar"}
          maximumDate={new Date()}
          minimumDate={this.state.afterDate != null && this.state.dateRestriction == "Between"
            ? this.state.afterDate : null }
          onChange={(event, newDate) => {
            this.setState({showAfterPicker : false, showBeforePicker : false});
            if(newDate != undefined && newDate != null){
              this.setState({beforeDate : newDate, showBeforePicker : false});
              this.props.updateDates(this.state.dateRestriction, this.state.afterDate, newDate);
            }
          }}
        /> : null }
        <Animated.View style={[{top:0, width:"100%", zIndex: 1, backgroundColor: "#1390A0"}, {
                opacity: this.state.animationValue
              }]} >
          <View style={{paddingBottom : 5}}>
          <SearchBar
            placeholder="Search title"
            onChangeText={this.props.updateSearch}
            value={this.props.searchText}
            platform={"android"}
            round={true}
          />
          <Text style={styles.textStyle}> {this.restrictionToString()}</Text>
          <Picker
            selectedValue={this.state.dateRestriction}
            style={{...styles.textStyle, height: 30, width: "100%"}}
            onValueChange={(itemValue, itemIndex) => {
                this.setState({dateRestriction: itemValue, afterDate : null, beforeDate : null,
                  showBeforePicker : false, showAfterPicker : false})
                this.props.updateDates(itemValue, null, null);
                console.log(itemValue);
              }
            }>
            <Picker.Item label="Anytime" value="Anytime" />
            <Picker.Item label="A single day" value="On" />
            <Picker.Item label="After" value="After" />
            <Picker.Item label="Before" value="Before" />
            <Picker.Item label="Between" value="Between" />
          </Picker>
          { this.getDateButtons() }
          </View>
        </Animated.View>
      </View>
      )
  }

}

export default SearchArea;