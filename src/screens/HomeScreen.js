import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet,
          ScrollView, Animated, Dimensions, StatusBar
      } from 'react-native';
import { styles, theme, PALETTE } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'

// The components used in the Homescreen
import SponsorBanner  from '../components/SponsorBanner.js'
import FeaturedBanner from '../components/FeaturedBanner.js'
import { SearchBar } from 'react-native-elements';
import ChannelCollection from "../components/ChannelCollection.js";

function HomeScreen({ navigation }) {
  // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};

  // Logic to maintain state of search text
  const [searchText, setSearchText] = useState("");
  const [dateInfo, setDateInfo] = useState({
    dateRestriction : "Anytime",
    afterDate : null,
    beforeDate : null
  });

  // Function to update the search results
  const updateSearch = useCallback((search) => {
    setSearchText(search);
  }, []);

  // Array of objects containing the information needed to populate a channel (TODO: figure out if this is okay to hardcode)
  const channels = [
    { channelTitle : "WTTW Chicago",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
    { channelTitle : "Negaunee Music",
      channelImage : "music",
      playlistId : "1WHN_VDbOesXyuRlGc6Qv3TSG96XW5MNV",
    },
    { channelTitle : "Chicago Children's Museum",
      channelImage : "music",
      playlistId : "PL8GKxgb3LyNfoqt77eaW6N6smu75evr5Q",
    },
    { channelTitle : "Test Channel 4",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
    { channelTitle : "Test Channel 5",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
    { channelTitle : "Test Channel 6",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
  ];

  // Set the height of the header when expanded and when collapsed
  const HEADER_EXP_HEIGHT = 180;
  const HEADER_COL_HEIGHT = 50;

  // Create a new variable that will track how far the user has scrolled
  const scroll_y = new Animated.Value(0);

  // Get the range of values between when the header is expanded and collapsed
  // This is the range we will interpolate the animated values on
  // i.e. once the screen has scrolled this much, the header is completely closed
  const range = HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT;

  // Animate the height of the header
  const headerHeight = scroll_y.interpolate({
    inputRange:  [0, range],
    outputRange: [HEADER_EXP_HEIGHT, HEADER_COL_HEIGHT],
    extrapolate: 'clamp'
  });

  // Set the collapsed header to start becoming visible halfway into the scroll
  const headerColOpacity = scroll_y.interpolate({
    inputRange:  [range/2, range],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  // Set the expanded header to become invisible halfway into the scroll
  const headerExpOpacity = scroll_y.interpolate({
    inputRange:  [0, range/2],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  // Get the dimensions of the screen
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  // return (
  //   <View style={{flex: 1}}>
  //     <Animated.View style={{
  //       height: headerHeight, width: SCREEN_WIDTH,
  //       position: 'absolute', top: 0, left: 0
  //     }}/>
  //       <ScrollView
  //         contentContainerStyle={{ padding: 16, paddingTop: HEADER_EXP_HEIGHT }}
  //         onScroll={Animated.event(
  //           [{ nativeEvent: { contentOffset: { y: scroll_y } } }],
  //           { useNativeDriver: false }
  //         )}
  //         scrollEventThrottle={16}
  //       >
  //         <Text style={{fontSize: 24, marginVertical: 16}}>This is Title</Text>
  //         <Text>
  //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id purus nec sapien semper bibendum vel commodo nulla. Integer vel fermentum mi. Nullam rutrum elit et nisi scelerisque, at dictum sem sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare dui in nunc pretium, ut elementum est porta. Proin et mollis tortor, vel pulvinar mauris. Nam fringilla, erat sit amet lobortis euismod, purus magna faucibus erat, a bibendum dui neque sit amet magna. Aenean ultricies, ipsum ac tincidunt mattis, augue libero vestibulum urna, et dignissim urna mauris ac tellus. Suspendisse luctus risus sed accumsan porttitor. Cras pretium scelerisque nibh vel aliquet.
  //           In hac habitasse platea dictumst. Quisque tempor ut nibh quis elementum. Mauris dignissim purus ut luctus mattis. Nulla facilisi. Praesent convallis ornare eros, a aliquam magna facilisis a. Vivamus a ligula velit. Pellentesque bibendum nunc vel urna rutrum rhoncus. Aliquam blandit, purus quis suscipit euismod, ipsum arcu egestas nunc, ut lacinia massa dolor sed leo. Donec eget tincidunt odio. Nunc convallis sem dui, nec ullamcorper tellus sodales non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris cursus convallis urna, id tempus magna pretium nec.
  //           Aliquam non lorem leo. Curabitur molestie non sapien ac facilisis. Donec eleifend porttitor viverra. Proin ut porttitor erat. Vivamus dapibus nunc eget ipsum euismod, facilisis porta enim vulputate. Aenean et purus sit amet mi tincidunt lacinia. Aliquam erat volutpat. Integer a purus ullamcorper dui auctor fermentum. Suspendisse porta, quam at iaculis gravida, mauris dui pretium erat, quis volutpat purus risus ac nisl. Integer quam nibh, lacinia sit amet risus ultrices, bibendum faucibus arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut porta et neque a varius. Nunc sed facilisis mi, quis molestie felis. Nunc vel massa at quam pretium posuere ac sit amet quam. Proin ullamcorper gravida ante sed fringilla. Nullam maximus dui quis velit lobortis, ac molestie mauris pulvinar.
  //           Maecenas scelerisque laoreet purus ac sodales. In fermentum quam et lectus ultricies, vel pulvinar magna molestie. Integer porttitor velit nulla. Vestibulum dapibus consectetur enim ac placerat. Etiam aliquet, libero et feugiat commodo, leo quam accumsan magna, in vulputate justo ex eu quam. Proin in diam non eros facilisis sodales sed sit amet odio. Donec in viverra est. Curabitur lacus urna, tincidunt ac augue vel, molestie efficitur dui.
  //           Duis cursus ante id placerat tincidunt. In vel orci velit. Donec iaculis ac elit ut interdum. Fusce non tristique nisi, vitae laoreet augue. Praesent semper, ex sit amet tincidunt tristique, nunc massa condimentum libero, vitae interdum ex lorem ac augue. Maecenas porta non diam in elementum. Quisque mattis efficitur libero, in pulvinar tellus posuere non. Nunc turpis mi, eleifend at felis non, placerat volutpat arcu. Quisque bibendum in velit a pharetra. Nulla facilisi. Fusce convallis felis massa.
  //         </Text>
  //       </ScrollView>
  //   </View>
  // );




  // return (
  //   <View style={[ styles.centerColumn ]}>

  //     {/* The collapsing header component */}
  //     <View style={{ height: 300 }}>

  //       {/* TODO: Featured videos banner */}

  //       {/* The banner showing the logo for each sponsor */}
  //       <SponsorBanner
  //         // image_ids={[ "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE" ]}
  //         image_ids={[
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //           "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
  //         ]}
  //         navigation={navigation}
  //         shuffle={true}
  //         style={{ marginVertical: 40 }}
  //       />

  //     </View>

  //     { The shelf view for the Rainbow Channels }
  //     <ScrollView
  //       style={{ width: "100%", height: 300 }}
  //       contentContainerStyle={{  }}
  //       onScroll={Animated.event(
  //         [{ nativeEvent: { contentOffset: { y: scroll_y } } }],
  //         { useNativeDriver: false }
  //       )}
  //       scrollEventThrottle={16}
  //       stickyHeaderIndices={[0]}
  //     >

  //       {/* The search bar for the channels */}
  //       <SearchBar
  //         placeholder="Search title or date"
  //         onChangeText={updateSearch}
  //         value={searchText}
  //         platform={"android"}
  //         round={true}
  //       />

  //       {/* The list of channels themselves */}
  //       <ChannelCollection
  //         navigation={navigation}
  //         channels={channels}
  //         searchText={searchText}
  //         dateInfo={dateInfo}
  //         isAdult={true}
  //       />
  //     </ScrollView>
  //   </View>
  // );










  return (
    <View style={[ styles.centerColumn ]}>

      <StatusBar
        animated={true}
        backgroundColor={PALETTE.back.light}
        barStyle={'dark-content'}
      />

      {/* The collapsing header component */}
      <Animated.View style={{
        height: headerHeight, width: SCREEN_WIDTH,
        position: 'absolute', top: 0, left: 0,
        backgroundColor: PALETTE.back.light,
        borderBottomWidth: 5, borderColor: PALETTE.green.dark,
      }}>

        {/* The collapsed header */}
        <Animated.View style={{
          opacity: headerColOpacity, height: headerHeight,
          position: 'absolute', top: 0, //left: 0,
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>
          <View style={[styles.centerColumn, {width: SCREEN_WIDTH}]}>
            <Image
              source={require("../assets/images/PR_logo.png")}
              style={{width: 25, height: 25}}
              resizeMode={"contain"}
            />
          </View>
        </Animated.View>

        {/* The expanded header */}
        <Animated.View style={{
          opacity: headerExpOpacity,
          // height: headerHeight,
          flex: 1, alignItems: 'center', justifyContent: 'center',
        }}>
          <Image
            source={require("../assets/images/PR_logo_horizontal.png")}
            style={{ width: SCREEN_WIDTH * 2/3 }}
            resizeMode={"contain"}
          />
        </Animated.View>

      </Animated.View>

      {/* The shelf view for the Rainbow Channels */}
      <ScrollView
        style={{
          width: "100%", height: SCREEN_HEIGHT - HEADER_COL_HEIGHT - 20,
          marginTop: HEADER_COL_HEIGHT,
          zIndex: -1,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll_y } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={{
          height: HEADER_EXP_HEIGHT - HEADER_COL_HEIGHT,
          backgroundColor: theme.colors.background,
          marginBottom: 20,
        }} />

        {/* TODO: Featured videos banner */}
        <FeaturedBanner />

        {/* The banner showing the logo for each sponsor */}
        <SponsorBanner
          image_ids={[
            "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
            "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
            "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
            "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE",
            "1WHN_VDbOesXyuRlGc6Qv3TSG96XW5MNV",
            "1WHN_VDbOesXyuRlGc6Qv3TSG96XW5MNV",
            "1WHN_VDbOesXyuRlGc6Qv3TSG96XW5MNV",
            "1WHN_VDbOesXyuRlGc6Qv3TSG96XW5MNV",
          ]}
          navigation={navigation}
          shuffle={true}
        />

        {/* The search bar for the channels */}
        <SearchBar
          containerStyle={{ margin: 15, borderRadius: 25 }}
          placeholder="Search title or date"
          onChangeText={updateSearch}
          value={searchText}
          platform={"android"}
          round={true}
        />
        <View style={{
          borderWidth: 2,
          borderColor: PALETTE.blue.normal,
          margin: 20, marginTop: 0,
        }} />

        {/* The list of channels themselves */}
        <ChannelCollection
          navigation={navigation}
          channels={channels}
          searchText={searchText}
          dateInfo={dateInfo}
          isAdult={true}
        />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;