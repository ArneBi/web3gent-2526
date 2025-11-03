import { createContext, useState, type PropsWithChildren } from "react";

interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (item: Movie) => void;
}

// STAP 1: Nieuwe context aanmaken
// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext<FavoritesContextType | null>(
  null
);

// STAP 2: Provider aanmaken

const FavoritesProvider = (props: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const toggleFavorite = (item: Movie) => {
    if (favorites.some((f) => f.id === item.id)) {
      setFavorites(favorites.filter((fi) => fi.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  // STAP 3: Koppeling tussen Context en Provider
  return (
    // STAP 5: props.children anders geen child components
    // STAP 6: Value en meegeven wat je nodig hebt
    <FavoritesContext.Provider
      value={{
        favorites: favorites,
        toggleFavorite,
      }}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
