import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Navbar extends React.PureComponent {
  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name={'chevron-back'} size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Navbar;
