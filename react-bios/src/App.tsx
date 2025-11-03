import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://api.themoviedb.org/3/movie/popular";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "./hooks/useFavorites";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// interface Movie {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: number[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

function App() {
  // const [count, setCount] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  // const [error, setError] = useState();
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(() => {
    const timerId = setInterval(() => {
      fetchMovies();
    }, 10000);

    // Component wordt ge-unmount
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    // fetchMovies();
    fetchMoviesWithAxios();
  }, [isRefresh]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          Authorization: import.meta.env.VITE_TMDB_API_KEY,
        },
      });
      const data = (await response.json()) as MovieResponse;
      setMovies(data.results);
    } catch (error) {
      // setError(error);
      console.log(error);
    }
  };

  const fetchMoviesWithAxios = async () => {
    try {
      const response = await Axios.get<MovieResponse>(BASE_URL, {
        headers: {
          Authorization: import.meta.env.TMDB_API_KEY,
        },
      });

      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const { toggleFavorite, favorites } = useFavorites();

  return (
    <div className="p-8 bg-slate-200 flex flex-col gap-4">
      {/* <button
        className="bg-teal-600 text-2xl text-white uppercase font-black px-4 py-2 cursor-pointer hover:bg-teal-800 rounded-lg"
        onClick={() => {
          setIsRefresh(!isRefresh);
        }}>
        Ververs
      </button> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((m) => (
          <div
            onClick={() => {
              navigate(`details/${m.id}`);
            }}
            className="relative shadow-2xl rounded-xl overflow-clip hover:scale-105 duration-700 cursor-pointer bg-white"
            key={m.id}>
            <img src={`${IMG_BASE_URL}${m.poster_path}`} alt={m.title} />
            <div className="py-4 text-center">
              <h1 className="font-bold text-2xl text-teal-700">{m.title}</h1>
            </div>

            <button
              onClick={(event) => {
                toggleFavorite(m);

                event.stopPropagation();
              }}
              className="absolute top-2 right-2 bg-teal-500 rounded-full p-2 hover:bg-teal-300">
              {favorites.some((f) => f.id === m.id) ? (
                <MdOutlineStar size={24} />
              ) : (
                <MdOutlineStarBorder size={24} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
