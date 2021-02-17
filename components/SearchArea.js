import * as React from 'react';
import { View, Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RoundedButton from '../components/RoundedButton.js'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { styles } from '../scripts/constants.js';

// Class showing the search capabilities of a screen
// Props include
//   active : Bool               - Boolean controlling if the search area is active
//   searchText : String         - String with the latest searched value
//   updateSearch : Func(String) - Function that tells the parent to update the search text when the search is changed
//   updateDates : Func(Object)  - Function that tells the parent to update the date restrictions when the date search is changed {dateRestriction : String, afterDate : Date, beforeDate : Date}
class SearchArea extends React.Component {
  constructor(props) {
    super(props);
    // State includes
    //   animationValue : Animated.Value - Animated value used to control fading in and out with opacity
    //   beforeDate : Date?              - Either null (unset) or the date which we are filtering videos to come before
    //   afterDate  : Date?              - Either null (unset) or the date which we are filtering videos to come after 
    //   dateRestriction : String        - String controlling what sort of restriction we're applying to the date filter. Either "Anytime", "On", "After", "Before", or "Between".
    //   showBeforePicker : Bool         - Boolean controlling if we should show the date picker for the before date filter
    //   showAfterPicker : Bool          - Boolean controlling if we should show the date picker for the after date filter
    this.state = {
      animationValue : new Animated.Value(0),
      beforeDate : null,
      afterDate : null,
      dateRestriction : "Anytime",
      showBeforePicker : false,
      showAfterPicker : false,
    };

    this.roundDateDown = this.roundDateDown.bind(this);
    this.roundDateUp = this.roundDateUp.bind(this);
  }

  // Function to make a component's opacity fade in
  fadeIn = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver : true
    }).start();
  };

  // Function to make a component's opacity fade out
  fadeOut = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver : true
    }).start();
  };

  // Whenever the props update, either fade in or out depending on if the search area is active
  componentDidUpdate(){
    if(this.props.active){
      this.fadeIn();
    } else{
      this.fadeOut();
    }
  }

  // Returns the string which the search bar should display based on how the date has been set.
  // Either instructions on what to do to set a date if the search is incomplete, or info on
  // what is getting searched
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
  
  // Shows the appropriate buttons depending on what type of search the user is trying to make
  getDateButtons(){
    let restriction = this.state.dateRestriction;
    let afterNull = this.state.afterDate == null;
    let beforeNull = this.state.beforeDate == null;
    
    // Single button if only one date is required
    if(restriction == "On" || restriction == "Before" || restriction == "After"){
      return (
        <RoundedButton
          onPress={() => restriction == "Before" ?
            this.setState({showBeforePicker : true})
            : this.setState({showAfterPicker : true})}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text={(afterNull && beforeNull) ? "Select date" : "Change date"}
        />)
    }
    
    // Two buttons if multiple dates required for between query
    if(restriction == "Between"){
      return (<View style={{ flexDirection : "row", justifyContent: 'space-evenly', }}>
        <RoundedButton
          onPress={() => this.setState({showAfterPicker : true})}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text={afterNull ? "Select after date" : "Change after date"}
        />
        <RoundedButton
          onPress={() => this.setState({showBeforePicker : true})}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.baseText}
          text={beforeNull ? "Select before date" : "Change before date"}
        />
      </View>)
    }
    return null;
  }

  // Rounds a date up to the end of the day for inclusive searches
  roundDateUp(d){
    let timeStamp = d.getTime();
    timeStamp -= timeStamp % (24 * 60 * 60 * 1000); //subtract amount of time since midnight
    timeStamp += new Date().getTimezoneOffset() * 60 * 1000; //add on the timezone offset
    timeStamp += 86399990;
    console.log(new Date(timeStamp));
    return new Date(timeStamp);
  }

  // Rounds a date down to the beginning of the day for inclusive searches
  roundDateDown(d){
    let timeStamp = d.getTime();
    timeStamp -= timeStamp % (24 * 60 * 60 * 1000); //subtract amount of time since midnight
    timeStamp += new Date().getTimezoneOffset() * 60 * 1000; //add on the timezone offset
    console.log(new Date(timeStamp));
    return new Date(timeStamp);
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
            // Updates the after date restriction when a date is picked
            // Also, converts an "On" search into a "Between" search with the beforeDate being one day ahead of the selected afterDate
            this.setState({showAfterPicker : false, showBeforePicker : false});
            if(newDate != undefined && newDate != null){
              let newDateInc = this.roundDateDown(newDate);
              this.setState({afterDate : newDateInc, showafterPicker : false})
              var nextDay = null;
              if(this.state.dateRestriction == "On"){
                nextDay = new Date(newDateInc);
                nextDay.setDate(newDateInc.getDate() + 1);
                this.setState({beforeDate : nextDay, showafterPicker : false})
                this.props.updateDates("Between", newDateInc, nextDay)
              } else {
                this.props.updateDates(this.state.dateRestriction, newDateInc, this.state.beforeDate)
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
            // Updates the before date restriction when a date is picked
            this.setState({showAfterPicker : false, showBeforePicker : false});
            if(newDate != undefined && newDate != null){
              let newDateInc = this.roundDateUp(newDate);
              this.setState({beforeDate : newDateInc, showBeforePicker : false});
              this.props.updateDates(this.state.dateRestriction, this.state.afterDate, newDateInc);
            }
          }}
        /> : null }
        <Animated.View style={[{top:0, width:"100%", zIndex: 1, ...styles.searchColor, elevation: 3}, {
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
            <Text style={styles.baseText}> {this.restrictionToString()}</Text>
            <View style={{height: 45}}>
              <View style={styles.centerColumn}>
                <Picker
                  selectedValue={this.state.dateRestriction}
                  style={{...styles.baseText, transform: [
                     { scaleX: 1.5 }, 
                     { scaleY: 1.5 },
                    ], 
                    height: 30, width: "66%"}}
                  onValueChange={(itemValue, itemIndex) => {
                      // Clears the date search when a different type of search is picked
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
              </View>
            </View>
            { this.getDateButtons() }
          </View>
        </Animated.View>
      </View>
      )
  }

}

export default SearchArea;