import jwt from "jsonwebtoken";
import Listing from "../models/list.model.js";
import User from "../models/user.model.js";
import createError from "./utils/createError.js";
import mongoose from "mongoose";


export const deletePost = async (req, res, next) => {
    //whatev
    // res.send("from controller");
    try {
        const list = await Listing.findById(req.params.id);
        if (list.userId !== req.userId)
            return next(createError(403, "You can only delete your gig!"));

        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted");
    } catch (error) {
        next(error);
    }
}
export const createPost = async (req, res, next) => {
    // res.send("register");
    try {
        const newListing = new Listing({
            userId: req.userId,
            ...req.body,
        });
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req, res, next) => {
    // console.log(req.body);
    try {
        const list = await Listing.findById(req.params.id);
        if (list.userId !== req.body.userId)
            return next(createError(403, "You can only edit your gig!"));
        const updatedList = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ...req.body,
                },
            },
        );
        res.status(200).send(updatedList);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export const getPosts = async (req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.what && { what: q.what }),
        ...(q.sale && { sale: q.sale }),
        ...(q.com && { commune: q.com }),
        ...(q.zone && { zone: q.zone }),
        ...(q.style && { style: q.style }),
        ...(q.price && { price: { $lte: q.price } }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    const count = await Listing.find(filters).count();
    try {
        const posts = await Listing.find(filters)
            .sort({ [q.sort]: q.order })
            .limit(q.limit)
            .skip((q.page - 1) * q.limit);
        res.status(200).json({ "count": count, posts });
    } catch (err) {
        // console.log(err);
        next(err);
    }
}

export const getRand = async (req, res, next) => {
    const q = req.query;
    // const { page = 1, limit = 5 } = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.what && { what: q.what }),
        ...(q.sale && { sale: q.sale }),
        ...(q.com && { commune: q.com }),
        ...(q.zone && { zone: q.zone }),
        ...(q.style && { style: q.style }),
        ...(q.price && { price: { $lte: q.price } }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {
        const posts = await Listing
            .aggregate([{ $match: filters }, { $sample: { size: Number(q.size) } }])
        res.status(200).json({ posts });
    } catch (err) {
        console.log(err);
        next(err);
    }
}


export const getSaved = async (req, res, next) => {
    try {
        // console.log(req.params);
        const list = await User.findById(req.params.id);
        // console.log(list);
        if (!list) next(createError(404, "User not found!"));

        const saved = await Listing.find({
            '_id': {
                $in:
                    list.saved,
            }
        });
        if (!saved) next(createError(404, "Nothing found!"));
        res.status(200).send(saved);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export const getPost = async (req, res, next) => {
    try {
        const post = await Listing.findById(req.params.id);
        if (!post) next(createError(404, "Gig not found!"));
        res.status(200).send(post);
    } catch (err) {
        next(err);
    }
}