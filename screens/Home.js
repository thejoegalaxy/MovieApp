/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Dimensions, FlatList} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {getPopularMovies, getUpcomingMovies} from '../services/services.js';
import react from 'react';
import List from '../components/List'; //calling a pure Component no curly brackets.

const dimensions = Dimensions.get('screen');
const Home = () => {
  const [moviesImages, setMoviesImages] = useState('');
  const [popularMovies, setPopularMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(dimensions);
    getUpcomingMovies()
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
      })
      .catch(err => {
        setError(err);
      });

    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        setError(err);
      });
  }, []); //can set a rate up updating pulling the data.  every 1000 ms, etc. [] on mount execute.

  return (
    <react.Fragment>
      <ScrollView>
        <View style={styles.sliderContainer}>
          <SliderBox
            images={moviesImages}
            autoplay={true}
            circleLoop={true}
            sliderBoxHeight={dimensions.height / 1.5}
            dotStyle={styles.sliderStyle}
          />
        </View>
        <View style={styles.carousel}>
          <List title="Popular Movies" content={popularMovies}></List>
        </View>
      </ScrollView>
    </react.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
