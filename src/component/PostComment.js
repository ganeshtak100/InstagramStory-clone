//import liraries
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// create a component
const PostComment = ({image, onPostPress}) => {
  const [comment, setComment] = useState('');
  const PostOnPress = () => {
    onPostPress(comment);
    setComment('');
  };
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <Image
          source={{uri: image}}
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: 'orange',
            marginRight: 10,
          }}
        />
        <TextInput
          value={comment}
          placeholder="Add a comment... "
          style={{opacity: 0.7}}
          onChangeText={text => {
            setComment(text);
            // item?.postComments.push(comment);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={PostOnPress}
        style={{flexDirection: 'row', paddingRight: 14, alignItems: 'center'}}>
        <Text style={{color: '#448AC8', opacity: comment ? 1 : 0.3}}>Post</Text>
      </TouchableOpacity>
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
export default PostComment;
