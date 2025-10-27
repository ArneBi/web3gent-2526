import React from "react";
import { useParams } from "react-router-dom";

const BASE_FIND_URL = "https://api.themoviedb.org/3/movie/";

const DetailsPage = () => {
  const { movieId } = useParams();

  // TODO: Request met de id uit de params

  return (
    <div>
      <p>{movieId}</p>
    </div>
  );
};

export default DetailsPage;
