import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const BASE_FIND_URL = "https://api.themoviedb.org/3/movie/";

const DetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await Axios.get<Movie>(`${BASE_FIND_URL}${movieId}`, {
          headers: {
            Authorization: import.meta.env.VITE_TMDB_API_KEY,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId]);

  // if (isLoading) {
  //   return <p>Loading....</p>;
  // }

  return <div>{isLoading ? <p>Loading...</p> : <p>{movie?.title}</p>}</div>;
};

export default DetailsPage;
