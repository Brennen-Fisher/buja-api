import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "./utils/createError.js";

export const deleteUser = async (req, res, next) => {
    //whatev
    // res.send("from controller");
    try {
        const user = await User.findById(req.params.id);


        if (req.userId !== user._id.toString()) {
            // console.log(payload.id);
            // console.log(user._id);
            return next(createError(401, "You cannot do that"));

        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted");

        // await User.findByIdAndDelete(req.params.id);
    } catch (error) {
        next(error);
    }
}

export const saveList = async (req, res, next) => {
    // console.log(req.body);
    try {
        const updatedSavedList = await User.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    saved: req.body.saved,
                },
            },
        );
        res.status(200).send(updatedSavedList);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export const setList = async (req, res, next) => {
    // console.log(req.body);
    try {
        const updatedSavedList = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ...req.body,
                },
            },
        );
        res.status(200).send(updatedSavedList);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export const delList = async (req, res, next) => {
    // console.log(req.body.saved);
    try {
        const updatedSavedList = await User.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    saved: { $in: req.body.saved, },
                },
            },
        );
        res.status(200).send(updatedSavedList);
    } catch (err) {
        console.log(err);
        next(err);
    }
}