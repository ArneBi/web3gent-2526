// import React, {
//   useEffect,
//   useState,
//   type ChangeEvent,
//   type FormEvent,
// } from "react";
// import Axios from "axios";

import { useFormik } from "formik";

// interface ContactResponse {
//   status: "success" | "error";
// }

const ContactPage = () => {
  // Manuele manier om met forms te werken in REACT

  //   const [email, setEmail] = useState("");
  //   const [name, setName] = useState("");
  //   const [message, setMessage] = useState("");

  // States groeperen in 1 state -> namelijk contactData object
  //   const [contactData, setContactData] = useState({
  //     email: "",
  //     name: "",
  //     message: "",
  //     age: 0,
  //   });

  //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     // const newObject = {
  //     //   email,
  //     //   name,
  //     //   message,
  //     // };

  //     // POST request naar backend met newObject als data in de body
  //     try {
  //       const response = await Axios.post<ContactResponse>(
  //         "http://localhost:3000/contact",
  //         contactData
  //       );

  //       const data = response.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const handleChange = (
  //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     if (event.target.type === "number") {
  //       setContactData({
  //         ...contactData,
  //         [event.target.name]: +event.target.value,
  //       });
  //     } else {
  //       setContactData({
  //         ...contactData,
  //         [event.target.name]: event.target.value,
  //       });
  //     }
  //   };

  //   FORMIK manier

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: 0,
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //   POST REQUEST
    },
  });

  return (
    <div className="p-4">
      {/* MANUELE MANIER */}
      {/* <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Naam"
          onChange={handleChange}
          value={contactData.name}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={contactData.email}
        />

        <input
          name="age"
          type="number"
          placeholder="Leeftijd"
          onChange={handleChange}
          value={contactData.age}
        />

        <textarea
          name="message"
          placeholder="Bericht"
          onChange={handleChange}
          value={contactData.message}
        />

        <input type="submit" />
      </form> */}
      {/* FORMIK MANIER */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Naam"
          onChange={handleChange}
          value={values.name}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
        />

        <input
          name="age"
          type="number"
          placeholder="Leeftijd"
          onChange={handleChange}
          value={values.age}
        />

        <textarea
          name="message"
          placeholder="Bericht"
          onChange={handleChange}
          value={values.message}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default ContactPage;
