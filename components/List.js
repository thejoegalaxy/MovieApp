import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Card from './Card';

class list extends React.PureComponent {
  render() {
    const {title, content} = this.props;
    return (
      <View>
        <View style={styles.list}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            horizontal={true}
            data={content}
            renderItem={({item}) => <Card item={item} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  list: {
    marginTop: 40,
  },
});

export default list;
