//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {storyUrl} from '../assests/data';

// create a component
const StoryList = () => {
  let [showInstaStory, setShowInstaStory] = useState(false);
  const sliderRef = React.createRef();
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();

  React.useEffect(() => {}, [index]);

  const ProfileHead = ({uri, name, borderRadius}) => {
    return (
      <View>
        <View
          style={{
            ...styles.storyProfile,
            borderColor: borderRadius === true ? '#CD88C8' : '#fff',
          }}>
          <Image
            source={{
              uri,
            }}
            style={styles.storyProfileImage}
          />
        </View>
        <View>
          <Text style={{textAlign: 'center', fontSize: 13}}>{name}</Text>
        </View>
      </View>
    );
  };
  const goForStories = () => {
    setShowInstaStory(true);
  };
  let closeModal = () => {
    setShowInstaStory(false);
  };

  const slideOnPress = (isLeftPress, mystatus = false) => {
    if (isLeftPress) {
      if (index > 0) {
        onScroll(index - 1);
      }
    } else {
      if (index < data.length - 1) {
        onScroll(index + 1);
      } else if (mystatus == true && index < imagesArray.length - 1) {
        onScroll(index + 1);
      }
    }
  };

  return (
    <ScrollView
      horizontal
      // style={styles.container}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.storyContainer}>
        <View>
          <View style={{position: 'relative'}}>
            <ProfileHead
              // key={id}
              uri={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWlKVGJeILLo6n3_-9GgvdvWyz7MJbC1o7g&usqp=CAU'
              }
              name="Your Story"
              borderRadius={false}
            />
            <View
              style={{
                backgroundColor: '#448AC8',
                width: 25,
                height: 25,
                borderRadius: 60,
                borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 50,
                left: 55,
              }}>
              <Image
                style={{
                  width: 14,
                  height: 14,
                  // backgroundColor: 'blue',
                  padding: 1,
                  borderRadius: 20,
                  // position: 'absolute',
                  // top: 55,
                  // right: 0,
                }}
                source={require('../assests/plus.png')}
              />
            </View>
          </View>
        </View>

        {storyUrl.map(({id, uri, name, stories}) => (
          // console.log('0-----', stories),
          <TouchableOpacity
            key={id}
            onPress={() =>
              navigation.push('Status', {
                name: name,
                image: uri,
                story: stories,
                id: id,
              })
            }>
            <ProfileHead key={id} uri={uri} name={name} borderRadius={true} />
          </TouchableOpacity>
        ))}
      </View>
      {/* {showInstaStory === true && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={showInstaStory}
          onRequestClose={() => {
            closeModal();
          }}>
          <View style={{flex: 1}}>
            <FlatList
              // ref={flatListRef}
              ref={sliderRef}
              keyExtractor={(I, i) => String(i)}
              scrollEnabled={false}
              pagingEnabled
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              onEndReachedThreshold={0}
              horizontal
              data={data}
              renderItem={({item, index}) => {
                console.log('images data--', item, 'index', index);
                // setCurrentIndex(index);
                return (
                  <View style={{flex: 1}}>
                    <Image
                      resizeMode="cover"
                      style={{width: sliderWidth, height: itemHeight}}
                      source={{uri: item}}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity
              style={[styles.button1]}
              onPress={() => {
                slideOnPress(true);
              }}>
              <Text style={[styles.buttonText]}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.button2]}
              onPress={() => {
                slideOnPress(false);
              }}>
              <Text style={[styles.buttonText]}></Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )} */}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  storyProfileImage: {
    width: '90%',
    height: '90%',
    borderRadius: 40,
  },
  storyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  storyProfile: {
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    borderWidth: 2,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 20,
    fontWeight: '700',
  },
  buttonText: {
    color: '#000',
  },
  button1: {
    // backgroundColor: 'yellow',
    alignItems: 'flex-start',
    width: '20%',
    height: '100%',
  },
  button2: {
    width: '20%',
    height: '100%',
    // backgroundColor: 'yellow',
    alignItems: 'flex-end',
  },
});

//make this component available to the app
export default StoryList;
