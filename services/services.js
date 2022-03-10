import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=b819030cb1546c3f366517ec0d676519';

//Get Popular Movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

//Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

//Get Popular TV
export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};
//Get Family Movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};
//Get Documentaries
export const getDocumentaries = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};
//Get Movie
export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data; //this service returns an object.
};
