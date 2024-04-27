import { Request, Response } from 'express';
import User from '../models/user';
import { validationResult } from 'express-validator';
// import { handleValidationErrors } from '../middleware/validation';

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(404).json({ status: 'User not found' });
        }

        res.status(200).json(currentUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong"});
    }
}

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;

        const existinguser = await User.findOne({ auth0Id });
        if (existinguser) {
            return res.status(200).json(existinguser);
        }

        const newUser = await User.create(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });

    }
};

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        // handleValidationErrors;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();

        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Errior updating user" });

    }
};

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
};