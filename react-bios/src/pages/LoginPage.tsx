import { useFormik } from "formik";
import React from "react";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  // TODO: Implementeer met Formik login formulier - email en wachtwoord, validatie

  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();

  const { handleChange, handleSubmit, values, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await Axios.post(
          "http://localhost:5001/users/login",
          values,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
          navigate("/users", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }

      console.log(values);
    },
  });

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="block px-4 py-2 border"
          type="text"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          value={values.email}
        />
        <input
          className="block px-4 py-2 border"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="******"
          value={values.password}
        />
        <button type="submit">Inloggen</button>
      </form>
    </div>
  );
};

export default LoginPage;
