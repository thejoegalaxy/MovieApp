import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import {Ionicons} from '@expo/vector-icons';

class PlayButton extends React.PureComponent {
  render() {
    return (
      <Pressable style={styles.button}>
        <Ionicons name={'play'} size={30} color={'#ffff'} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FC',
  },
});
export default PlayButton;
