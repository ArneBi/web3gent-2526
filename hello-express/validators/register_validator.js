import { body } from "express-validator";

export const registerValidator = [
  body("firstName").exists().withMessage("Voornaam is verplicht"),
  body("lastName").exists(),
  body("email")
    .exists()
    .withMessage("Email is verplicht")
    .isEmail()
    .withMessage("Geen geldig emailadres"),
  body("password").exists().isStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
  }),
];
