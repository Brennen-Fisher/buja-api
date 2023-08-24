import jwt from "jsonwebtoken";
import createError from "../controller/utils/createError.js";
import { secureToken } from "../mongo.js";

export const verifyToken = (req, res, next) => {
    try {

        const token = req.cookies.accessToken;
        if (!token) return next(createError(401, "You are not logged in"));
        // console.log("st: " + secureToken);
        // console.log("t: " + token);
        jwt.verify(token, secureToken, async (err, payload) => {

            if (err) return next(createError(403, "Not a valid token"));
            // console.log(payload);
            req.userId = payload.id;
            next(); //will not go to next function in router.delete("/:id",verifyToken, deleteUser); without the next very important
        });

    } catch (error) {

        console.log(error);

    }
}
