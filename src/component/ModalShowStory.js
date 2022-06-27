//import liraries
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// create a component
const MyComponent = ({modalVisible, closeModal, data}) => {
  return (
    <View style={{flex: 1}}>
      {modalVisible === true && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            closeModal;
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
          <View style={[styless.buttonContainer]}>
            <TouchableOpacity
              style={[styless.button1]}
              onPress={() => {
                slideOnPress(true);
              }}>
              <Text style={[styless.buttonText]}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styless.button, styless.button2]}
              onPress={() => {
                slideOnPress(false);
              }}>
              <Text style={[styless.buttonText]}></Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

// define your styles
const styless = StyleSheet.create({
  container: {
    flex: 1,
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
export default MyComponent;
