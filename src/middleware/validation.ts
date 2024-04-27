import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// const handleValidationErrors = async (req: Response, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

// const handleValidationErrors = async (req: Response, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
// };

export const validateMyUserRequest = [
    body("name", "Name must be provided").isString().notEmpty(),
    body("addressLine1", "Address line 1 must be provided").isString().notEmpty(),
    body("city", "City must be provided").isString().notEmpty(),
    body("country", "Country must be provided").isString().notEmpty()
];