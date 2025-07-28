import asyncHandler from "express-async-handler";

export const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.type === "admin") {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
});