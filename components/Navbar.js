import React from 'react';
import {
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../theme/colors';
const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};
class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;

    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              style={styles.logo}
              source={require('../assets/images/movieclub.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Ionicons name={'search-outline'} size={50} color={'black'} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Ionicons
                name={'chevron-back'}
                size={30}
                color={Colors.lightGray}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  mainNav: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
