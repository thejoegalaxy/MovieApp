import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Modal,
  Pressable,
} from 'react-native';
//brackets are because services file has multiple exports.
import {getMovie} from '../services/services';
import Star from 'react-native-star-view';
//only 1 component in PlayButton so no brackets importing.
import PlayButton from '../components/PlayButton';
import dateFormat from 'dateformat';
import Video from '../components/Video';
//import Error from '../components/Error';

const placeholderImage = require('../assets/images/placeholderImage.jpg');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //TODO: if getting TV details need to call getTV not getMovie.
  // will have to pass in if this is a tv detail card or movie detail card.
  useEffect(() => {
    getMovie(movieId)
      .then(movieData => {
        setMovieDetail(movieData);
      })
      .catch(err => {
        console.log(err.message);
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }></Image>
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <Star style={styles.star} score={movieDetail.vote_average / 2} />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  star: {
    width: 100,
    height: 20,
    marginBottom: 20,
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -30,
    right: 10,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
