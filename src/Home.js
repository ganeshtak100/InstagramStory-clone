//import liraries
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../src/component/Header.js';
import StoryList from '../src/component/StoryList';
import Post from './component/Post.js';

// create a component
const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StoryList />

        <View
          style={{
            // position: 'absolute',
            marginTop: 6,
            borderColor: 'gray',
            borderBottomWidth: 0.4,
            borderTopWidth: 0.5,
            opacity: 0.1,
          }}></View>
        <Post />
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Home;
