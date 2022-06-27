//import liraries
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

// create a component
const Header = () => {
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assests/logo.png')} />
        {/* source={require('../assests/instagramtext.png')} */}
        <Image
          style={{width: 30, height: 30}}
          source={require('../assests/messenger.png')}
        />
      </View>
      {/* <ScrollView>
        <View style={{height: 1000, marginTop: 10, backgroundColor: 'pink'}} />
      </ScrollView> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
  },
  logo: {
    width: 140,
    height: 90,
    resizeMode: 'contain',
  },
});

//make this component available to the app
export default Header;
