import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { styles } from '../scripts/constants.js'
import RoundedButton from '../components/RoundedButton.js'

// The components used in the Homescreen
import SponsorBanner from '../components/SponsorBanner.js'
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
    { channelTitle : "Test Channel 1",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
    { channelTitle : "Test Channel 2",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
    { channelTitle : "Test Channel 3",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
    { channelTitle : "Test Channel 4",
      channelImage : "music",
      playlistId : "PLWgiRpr4E_tV2_sL7r-6eGxVDN8EJBkkZ",
    },
  ];

  return (
    <View style={styles.centerColumn}>

      {/* TODO: Featured videos banner */}

      {/* The banner showing the logo for each sponsor */}
      <SponsorBanner
        image_ids={[ "19Y4tCXEbft3isAWAT-4l34t8fRiZzpWE" ]}
        shuffle={true}
      />

      {/* The shelf view for the Rainbow Channels */}
      <View style={{width: "100%"}}>

        {/* The search bar for the channels */}
        <SearchBar
          placeholder="Search title or date"
          onChangeText={updateSearch}
          value={searchText}
          platform={"android"}
          round={true}
        />

        {/* The list of channels themselves */}
        <ChannelCollection
          channels={channels}
          searchText={searchText}
          dateInfo={dateInfo}
          isAdult={true}
        />
      </View>
    </View>
  );
}

export default HomeScreen;