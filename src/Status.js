import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

const Status = ({route, navigation}) => {
  // console.log('routes data', route?.params?.story);
  const {name} = route.params;
  const {image} = route.params;
  const {story} = route.params;
  let [storyImages, setStoryImages] = useState(story);
  let a = story;
  // console.log('images for show--', a);
  const sliderRef = React.createRef();
  const sliderWidth = Dimensions.get('window').width;
  const itemHeight = Dimensions.get('window').height;
  const [index, setIndex] = React.useState(0);
  const videoRef = useRef(null);

  const [progress, setProgress] = useState(new Animated.Value(0));
  useEffect(() => {
    let timer = setTimeout(() => {
      // navigation.goBack();
      onScroll(index + 1);
    }, 5000);

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (!finished) {
        setTimeout(() => {
          Animated.timing(progress, {
            toValue: 0,
          }).start();
        }, 0);
      }
    });
    return () => clearTimeout(timer);
  }, []);

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });
  const onScroll = _index => {
    sliderRef && sliderRef?.current?.scrollToIndex({index: _index});
    setIndex(_index);
    return;
  };

  const slideOnPress = (isLeftPress, mystatus = false) => {
    if (isLeftPress) {
      if (index > 0) {
        onScroll(index - 1);
      }
    } else {
      if (index < storyImages.length - 1) {
        onScroll(index + 1);
      }
    }
  };

  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };

  const [mute, setMute] = useState(false);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((index + 1) % (10 + 1));
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [index]);
  return (
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
        // position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {/* <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          zIndex: 10,
          position: 'absolute',
          flexDirection: 'row',
        }}>
        <ProgressBar step={7} steps={10} height={8} />
      </View> */}
      <View
        style={{
          position: 'absolute',
          top: 18,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        {storyImages.map((item, indexx) => {
          return (
            <>
              <View
                key={indexx}
                style={{
                  height: 3,
                  width: sliderWidth / storyImages.length,
                  borderWidth: 1,
                  backgroundColor: 'gray',
                  marginLeft: 2,
                }}>
                {index == indexx ||
                  (index > indexx && (
                    <Animated.View
                      style={{
                        height: '100%',
                        backgroundColor: 'white',
                        width: progressAnimation,
                        // marginLeft: 2,
                      }}></Animated.View>
                  ))}
              </View>
            </>
          );
        })}
      </View>

      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 12,
          left: 0,
          width: '90%',
        }}>
        <View
          style={{
            borderRadius: 100,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: image}}
            style={{
              borderRadius: 100,
              backgroundColor: 'orange',
              resizeMode: 'cover',
              width: '92%',
              height: '92%',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Text style={{color: 'white', fontSize: 15, paddingLeft: 10}}>
            {name}
          </Text>
          <TouchableOpacity onPress={() => alert()}>
            <Image
              source={require('./assests/dots.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{
          position: 'absolute',
          flex: 1,
          width: '100%',
          height: 600,
          backgroundColor: 'red',
        }}
        ref={sliderRef}
        keyExtractor={(I, i) => String(i)}
        scrollEnabled={false}
        pagingEnabled
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onEndReachedThreshold={0}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={storyImages}
        renderItem={({item, index}) => {
          // console.log('images data--', item?.content);
          return (
            <View style={{width: sliderWidth}}>
              {
                item?.type == 'image' ? (
                  <Image
                    style={{
                      width: sliderWidth,
                      height: 600,
                      position: 'absolute',
                    }}
                    source={{
                      uri: item?.content,
                    }}
                    resizeMode="cover"
                  />
                ) : item?.type == 'video' ? (
                  // <TouchableOpacity onPress={() => setMute(!mute)}>
                  <Video
                    videoRef={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    // repeat={true}
                    resizeMode="cover"
                    // paused={currentIndex == index ? false : true}
                    source={{uri: item?.content}}
                    // muted={mute}
                    style={{
                      backgroundColor: 'black',
                      width: sliderWidth,
                      height: 600,
                      position: 'absolute',
                    }}
                  />
                ) : // </TouchableOpacity>
                null
                // <Video
                //   // ref={ref => (this.state.post_id = ref)}
                //   // source={{uri: this.state.postData.videos[0]}}
                //   resizeMode={'cover'}
                //   repeat={true}
                //   muted={true}
                //   // style={style.postImage}
                //   onLoad={() => {
                //     //this.state.postData.id.seek(2);
                //     // this.setState({imageLoader: false});
                //   }}
                // />
              }
            </View>
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginVertical: 10,
          width: '100%',
        }}>
        <TextInput
          placeholder="send message"
          placeholderTextColor="white"
          style={{
            borderColor: 'gray',
            borderRadius: 25,
            opacity: 0.7,
            width: '75%',
            height: 48,
            paddingLeft: 20,
            borderWidth: 1,
            fontSize: 20,
            color: 'white',
          }}
        />
        <TouchableOpacity
          style={{marginHorizontal: 6}}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('./assests/heart.png')}
            style={{
              width: 30,
              height: 30,
              // opacity: 0.6,
              // backgroundColor: 'fff',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{right: 3}}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('./assests/compass.png')}
            style={{
              width: 28,
              height: 28,
              // opacity: 0.6,
            }}
          />
        </TouchableOpacity>
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
          style={[styles.button2]}
          onPress={() => {
            slideOnPress(false);
          }}>
          <Text style={[styles.buttonText]}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 20,
    fontWeight: '700',
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: '#000',
  },
  button1: {
    // backgroundColor: 'yellow',
    // alignItems: 'flex-start',
    width: '30%',
    height: '100%',
  },
  button2: {
    width: '30%',
    height: '100%',
    // backgroundColor: 'yellow',
    // alignItems: 'flex-end',
  },
});
export default Status;
{
  /* {storyImages.map((item, index) => {
          // console.log('item imnages---', item);
          return (
            <Image
              // onLoadEnd={}
              ref={sliderRef}
              key={index}
              source={{uri: item}}
              resizeMode="cover"
              style={{width: '100%', height: 600}}
            />
          );
        })} */
}
{
  /* </View> */
}
{
  /*   <FlatList
          // ref={flatListRef}
          ref={sliderRef}
          keyExtractor={(I, i) => String(i)}
          scrollEnabled={false}
          pagingEnabled
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          onEndReachedThreshold={0}
          horizontal
          data={story}
          renderItem={({item, index}) => {
            console.log('images data--', item, 'index', index);
            // setCurrentIndex(index);
            return (
              <Image
                // resizeMode="cover"
                style={{
                  width: '100%',
                  height: 600,
                }}
                source={{uri: item}}
              />
            );
          }}
        />
        <Image source={{uri: image}} style={{width: '100%', height: 600}} /> 
       */
}
