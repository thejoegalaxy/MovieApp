import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../theme/colors';
//import {Ionicons} from '@expo/vector-icons';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Ionicons name={'play'} size={30} color={Color.white} />
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
    backgroundColor: Color.primary,
  },
});
export default PlayButton;
