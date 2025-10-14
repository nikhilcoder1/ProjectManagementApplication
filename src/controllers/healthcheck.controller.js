import { ApiResponse } from "../utils/api-response.js";

const healthcheck = (req, res) => {
    try {
        res
        .status(200)
        .json(new ApiResponse(200, {message : "Service is up and running"}));
    } catch (error) {
        res
        .status(500)
        .json(new ApiResponse(500, "Internal Server Error", error.message));
    }
};

export { healthcheck };