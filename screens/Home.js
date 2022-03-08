/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Dimensions, FlatList} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {
  getPopularMovies,
  getUpcomingMovies,
  getFamilyMovies,
  getPopularTv,
  getDocumentaries,
} from '../services/services.js';
import react from 'react';
import List from '../components/List'; //calling a pure Component no curly brackets.

const dimensions = Dimensions.get('screen');
const Home = () => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [documentaries, setDocumentaries] = useState();
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getFamilyMovies(),
      getDocumentaries(),
      getPopularTv(),
    ]);
  };
  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          familyMoviesData,
          documentariesData,
          popularTvData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setFamilyMovies(familyMoviesData);
          setDocumentaries(documentariesData);
          setPopularTv(popularTvData);
        },
      )
      .catch(err => {
        setError(err);
      });
  }, []); //can set a rate up updating pulling the data.  every 1000 ms, etc. [] on mount execute.

  return (
    <react.Fragment>
      <ScrollView>
        {/* Upcoming Movies */}
        {moviesImages && (
          <View style={styles.sliderContainer}>
            <SliderBox
              images={moviesImages}
              autoplay={true}
              circleLoop={true}
              sliderBoxHeight={dimensions.height / 1.5}
              dotStyle={styles.sliderStyle}
            />
          </View>
        )}
        {/* Popular Movies */}
        {popularMovies && (
          <View style={styles.carousel}>
            <List title="Popular Movies" content={popularMovies} />
          </View>
        )}
        {/* Family Movies */}
        {familyMovies && (
          <View style={styles.carousel}>
            <List title="Family Movies" content={familyMovies} />
          </View>
        )}
        {/* Popular TV */}
        {popularTv && (
          <View style={styles.carousel}>
            <List title="Popular TV Shows" content={popularTv} />
          </View>
        )}
        {/* Documentary */}
        {documentaries && (
          <View style={styles.carousel}>
            <List title="Documentary" content={documentaries} />
          </View>
        )}
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
