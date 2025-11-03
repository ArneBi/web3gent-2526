import React, { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      {!favorites.length && <p>Geen favorieten</p>}
      {favorites.map((f) => (
        <p key={f.id}>{f.title}</p>
      ))}
    </div>
  );
};

export default FavoritesPage;
