// import React, {
//   useEffect,
//   useState,
//   type ChangeEvent,
//   type FormEvent,
// } from "react";
// import Axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";

// interface ContactResponse {
//   status: "success" | "error";
// }

const subjects = [
  { id: 1, label: "Vraag", value: "vraag" },
  { id: 2, label: "Klacht", value: "klacht" },
  { id: 3, label: "Anders", value: "anders" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Naam is verplicht"),
  email: Yup.string()
    .required("Email is verplicht")
    .email("Geen geldig emailadres"),
  age: Yup.number()
    .positive("Leeftijd kan niet negatief zijn")
    .integer("Leeftijd kan geen kommagetal zijn"),
  subject: Yup.string().oneOf(
    subjects.map((s) => s.value),
    `Onderwerp moet één van deze waarden zijn: ${subjects
      .map((s) => s.value)
      .join(", ")}`
  ),
  message: Yup.string()
    .required("Bericht is verplicht")
    .min(5, "Minstens 5 karakters")
    .max(150, "Maximum 150 karakters"),
});

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

  const { values, handleChange, handleSubmit, handleBlur, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: 0,
      subject: subjects[0].value,
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //   POST REQUEST
    },
    validationSchema,
    // validateOnChange: false,
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* TODO: Eigen custom Input component te maken met dezelfde styling maar met andere props -> Typing dat je kan gebruiken voor uw props */}
        {/* <MyInput /> */}

        <input
          className={`block px-4 py-2 border rounded-lg  ${
            errors.name
              ? "border-red-600 outline-red-500 text-red-600"
              : "border-teal-700 outline-teal-500"
          }`}
          name="name"
          type="text"
          placeholder="Naam"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && (
          <p className="text-red-600 text-sm font-thin">{errors.name}</p>
        )}

        <input
          className={`block px-4 py-2 border rounded-lg  ${
            errors.email
              ? "border-red-600 outline-red-500 text-red-600"
              : "border-teal-700 outline-teal-500"
          }`}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && (
          <p className="text-red-600 text-sm font-thin">{errors.email}</p>
        )}

        <input
          className={`block px-4 py-2 border rounded-lg  ${
            errors.age
              ? "border-red-600 outline-red-500 text-red-600"
              : "border-teal-700 outline-teal-500"
          }`}
          name="age"
          type="number"
          placeholder="Leeftijd"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.age}
        />
        {errors.age && (
          <p className="text-red-600 text-sm font-thin">{errors.age}</p>
        )}

        <select
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`block px-4 py-2 border rounded-lg  ${
            errors.subject
              ? "border-red-600 outline-red-500 text-red-600"
              : "border-teal-700 outline-teal-500"
          }`}>
          {subjects.map((s) => (
            <option key={s.id} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="text-red-600 text-sm font-thin">{errors.subject}</p>
        )}

        <textarea
          className={`block px-4 py-2 border rounded-lg  ${
            errors.message
              ? "border-red-600 outline-red-500 text-red-600"
              : "border-teal-700 outline-teal-500"
          }`}
          name="message"
          placeholder="Bericht"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.message}
        />
        {errors.message && (
          <p className="text-red-600 text-sm font-thin">{errors.message}</p>
        )}

        <input
          className="px-4 py-2 bg-teal-600 rounded-lg text-white uppercase font-black hover:bg-teal-400 cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ContactPage;
