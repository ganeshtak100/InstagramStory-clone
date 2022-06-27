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
import {postInfo} from '../assests/data';
import PostComment from './PostComment';
import ScrollableFlatList from './ScrollableFlatList';
// create a component
const Post = () => {
  return (
    <View style={styles.container}>
      {postInfo.map((item, index) => {
        const postComments = () => {
          item.postComments.map(item => {
            // console.log('kjkjjj', item);
          });
        };
        postComments();
        // useEffect(() => {}, [...item.postComments]);
        // console.log('item', item?.postComments);
        const [like, setLike] = useState(item.isLiked);
        const [noLikes, setNoLikes] = useState(item?.likes);
        const [comment, setComment] = useState('');
        const [showTextInput, setShowTextInput] = useState(false);

        return (
          <View
            key={index}
            style={{
              paddingBottom: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item?.postPersonImage}}
                  style={{
                    borderRadius: 100,
                    backgroundColor: 'orange',
                    resizeMode: 'cover',
                    width: 40,
                    height: 40,
                  }}
                />

                <View style={{paddingLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    {item?.postTitle}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  source={require('../assests/dotsBlack.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <SwiperFlatList
                autoplay={false}
                showPagination
                data={item}
                renderItem={({ite}) => {
                  console.log('ite, iimage', ite);
                  return (
                    // <View style={{width: '100%', height: 400}}>
                    <Image
                      source={{uri: ite.postImage}}
                      style={{width: '100%', height: 400}}
                    />
                    // </View>
                  );
                }}
              /> */}
              {/* <Image
                source={{uri: item.postImage}}
                style={{width: '100%', height: 400}}
              /> */}
              <ScrollableFlatList data={item?.postImage} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{paddingRight: 20}}
                  onPress={() => {
                    setLike(!like);
                    if (like == true) {
                      setNoLikes(noLikes - 1);
                    } else setNoLikes(noLikes + 1);
                  }}>
                  {like ? (
                    <Image
                      source={require('../assests/redheart.png')}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../assests/love.png')}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={{paddingRight: 20}}>
                  <Image
                    source={require('../assests/chat.png')}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TouchableOpacity>

                    


                <TouchableOpacity style={{paddingRight: 20}}>
                  <Image
                    source={require('../assests/navigation.png')}
                    style={{
                      width: 24,
                      height: 24,
                      paddingRight: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Image
                source={require('../assests/save-instagram.png')}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </View>

            <View style={{paddingHorizontal: 15}}>
              <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                {noLikes} likes
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,

                  paddingVertical: 2,
                }}>
                {item?.postTitle}
              </Text>
              <Text style={{opacity: 0.6, paddingVertical: 2}}>
                View all{' '}
                {item?.postComments.length > 0 && item?.postComments.length}{' '}
                comments
              </Text>
              {item?.postComments.map((it, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      paddingVertical: 2,
                    }}>
                    {item?.postTitle}
                    <Text style={{fontSize: 12, fontWeight: '600'}}>
                      {'  ' + it}
                    </Text>
                  </Text>
                );
              })}
            </View>

            {showTextInput == false && (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                  }}>
                  <Image
                    source={{uri: item.postPersonImage}}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      backgroundColor: 'orange',
                      marginRight: 10,
                    }}
                  />
                  <TouchableOpacity onPress={() => setShowTextInput(true)}>
                    <TextInput
                      placeholder="Add a comment... "
                      style={{opacity: 0.7}}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assests/redheart.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 13,
                    }}
                  />
                  <Image
                    source={require('../assests/raise-hand.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 13,
                    }}
                  />
                  <Image
                    source={require('../assests/add.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 13,
                    }}
                  />
                </View>
              </View>
            )}
            {showTextInput == true && (
              <PostComment
                image={item.postPersonImage}
                onPostPress={txt => {
                  console.log('txt', txt);
                  item?.postComments.push(txt);
                  setShowTextInput(false);
                }}
              />
            )}
          </View>
        );
      })}
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
export default Post;
