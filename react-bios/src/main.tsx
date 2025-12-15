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
import ContactPage from "./pages/ContactPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";

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
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* STAP 4: Provider wrappen rond components */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          <RouterProvider router={browserRouter} />\{/* <App /> */}
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
