import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import {Error} from '../components/Error';
import Card from '../components/Card';

const Search = ({navigation}) => {
  const [text, onChangeText] = React.useState();
  const [searchResults, setSearchResults] = React.useState();
  const [error, setError] = React.useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(error => {
        setError(true);
        console.log(error.message);
      });
  };
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholder={'Search Movies or TV Shows'}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Ionicons name={'search-outline'} size={50} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Searched item results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={[styles.empty, {paddingTop: 20}]}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}
          {/* When nothing is searched. */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}
          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  empty: {},
});

export default Search;
