//import liraries
import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

// create a component
const ProgressBar = ({step, steps, height}) => {
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);
  return (
    <View
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={{
        flex: 1,
        // padding: 20,
        height,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: height,
        borderWidth: 1,
        overflow: 'hidden',
        // position: 'absolute',
      }}>
      <Animated.View
        style={{
          height,
          backgroundColor: '#fff',
          width: '100%',
          position: 'absolute',
          // left: 0,
          // top: 1,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default ProgressBar;
