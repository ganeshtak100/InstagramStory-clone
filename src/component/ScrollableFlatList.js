//import liraries
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

// create a component
const ScrollableFlatList = ({data}) => {
  // console.log('scrolldata', data);
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);

  const [imageActive, setImageActive] = useState(0);
  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imageActive) {
        setImageActive(slide);
      }
    }
  };
  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {data.map(
            (item, index) =>
              item?.type == 'image' ? (
                <Image
                  key={index}
                  style={styles.wrap}
                  source={{
                    uri: item?.content,
                  }}
                  resizeMode="cover"
                />
              ) : item?.type == 'video' ? (
                <TouchableOpacity onPress={() => setMute(!mute)}>
                  <Video
                    key={index}
                    videoRef={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    repeat={false}
                    resizeMode="cover"
                    // paused={currentIndex == index ? false : true}
                    source={{uri: item?.content}}
                    muted={mute}
                    style={{
                      backgroundColor: 'black',
                      ...styles.wrap,
                    }}
                  />
                </TouchableOpacity>
              ) : null,

            // <Image
            //   key={index}
            //   source={{
            //     uri: item,
            //   }}
            //   style={{...styles.wrap, backgroundColor: 'red'}}
            // />
          )}
        </ScrollView>

        <View style={styles.wrapDot}>
          {data.map((e, index) => (
            <Text
              key={index}
              style={imageActive == index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
  },
  wrap: {
    width: WIDTH,
    height: 400,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
  dotActive: {
    margin: 3,
    color: 'gray',
  },
});

//make this component available to the app
export default ScrollableFlatList;

///instagram story tiles using reanimated 2
// const TilesProgressBar = ({current, slices, progress}) => {
// return (
//     <View style={{flexDirection: 'row'}}>
//       {slices.map((slice, index) => {
//         const animatedStyle = useAnimatedStyle(() => {
//           return {
//             flex: current == index ? progress.value : slice.finish,
//           };
//         });

//         return (
//           <View
//             key={index}
//             style={{
//               height: 2,
//               flex: 1,
//             }}>
//             <Animated.View style={[animatedStyle]} />
//           </View>
//         );
//       })}
//     </View>
//   );
// };
// current prop is the current slice selected, it changes when you tap right on left like on instagram.
// slices prop are all slices of the story, so the number of tiles is slices.length.
// progress is the reanimated useSharedValue() used to keep track of the slice duration, say for example 4 seconds.
