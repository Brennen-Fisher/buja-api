// import { reset } from "nodemon";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createError from "./utils/createError.js";
import { secureToken } from "../mongo.js";
// import nodemon from "nodemon";


export const test = async (req, res, next) => {
    res.json({ "result": "register" });
    console.log("It hit the test");
}

export const register = async (req, res, next) => {
    // res.send("register");
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(201).send("User Has been created");
    } catch (error) {
        next(error);
    }
}

export const resetUser = async (req, res, next) => {
    // res.send("register");
    try {
        // console.log(req);
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ...req.body,
                },
            },
        );
        res.status(201).send(updatedUser);

    } catch (error) {
        next(error);
    }
}

export const resetPass = async (req, res, next) => {
    // res.send("register");
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    password: hash,
                },
            },
        );
        res.status(201).send(updatedUser);

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    //whatev
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User Not Found"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Password or Username!"));

        const token = jwt.sign({
            id: user._id,
        }, secureToken
        );

        const { password, ...info } = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(info);
    } catch (error) {
        next(error);
        console.log(error);
    }
}
export const logout = async (req, res) => {
    //whatev
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,

    }).status(200).send("User has been logged out");
    try {

    } catch (error) {
        console.log(error);
    }
}