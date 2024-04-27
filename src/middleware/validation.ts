import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateMyUserRequest = [
    body("name", "Name must be provided")
        .isString()
        .notEmpty(),
    body("addressLine1", "Address line 1 must be provided")
        .isString()
        .notEmpty(),
    body("city", "City must be provided")
        .isString()
        .notEmpty(),
    body("country", "Country must be provided")
        .isString()
        .notEmpty(),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    body("restaurantName")
        .notEmpty()
        .withMessage("Restaurant Name is required"),
    body("city")
        .notEmpty()
        .withMessage("City is required"),
    body("country")
        .notEmpty()
        .withMessage("Country is required"),
    body("deliveryPrice")
        .isFloat({ min: 0 })
        .withMessage("Delivery Price must be a positive number"),
    body("estimatedDeliveryTime")
        .isInt({ min: 0 })
        .withMessage("Estimated Delivery Time must be a positive number"),
    body("cuisines")
        .isArray()
        .withMessage("Cuisines must be an array")
        .not()
        .isEmpty()
        .withMessage("Cuisines array cannot be empty"),
    body("menuItems")
        .isArray()
        .withMessage("Menu Items must be an array"),
    body("menuItems.*.name")
        .notEmpty()
        .withMessage("Menu item name is required"),
    body("menuItems.*.price")
        .isFloat({ min: 0 })
        .withMessage("Menu item price is required and must be a positive number"),
    handleValidationErrors,
];