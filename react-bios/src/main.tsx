import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import FavoritesProvider from "./contexts/FavoritesContext.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";

const browserRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "details/:movieId",
        element: <DetailsPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* STAP 4: Provider wrappen rond components */}
    <FavoritesProvider>
      <RouterProvider router={browserRouter} />\{/* <App /> */}
    </FavoritesProvider>
  </StrictMode>
);
