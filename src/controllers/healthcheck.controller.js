import { ApiResponse } from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

/**
    const healthcheck = async (req, res, next) => {
        try {
            const user = await getUserFromDb(); // Example async operation

            res
            .status(200)
            .json(new ApiResponse(200, {message : "Service is up and running"}));
        } catch (error) {
            next(err);
        }
    };
**/

const healthcheck = asyncHandler(async (req, res) => {
    res
    .status(200)
    .json(new ApiResponse(200, {message : "Service is up and running"}));
});

export { healthcheck };