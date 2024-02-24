const User = require("../models/User");
const { success, error } = require("../utils/Wrapper");
const jwt = require("jsonwebtoken");

const RequireUser = async (req, res, next) => {
    if (
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    ) {
        return res.send(error(200, "Authorization Header are Required"));
    }
    const accessToken = req.headers.authorization.split(" ")[1];

    try {
        const tokenVerify = jwt.verify(
            accessToken,
            process.env.ACCESS_PRIVATE_TOKEN_KEY
        );

        req._id = tokenVerify._id;
        req._email = tokenVerify.email;
        email = req._email;
        console.log(tokenVerify);
        if (req._id && req._email) {
            const user = await User.findOne(req._email && req._id);
            if (!user) return res.send(error(404, "User not Found"));
        }

        // if (req._id) {
        //     const user = await User.findById(req._id);
        //     if (!user) return res.send(error(404, "User not Found"));
        // }

        next();
    } catch (err) {
        res.send(error(401, "Invalid Access Token"));
    }
};

module.exports = RequireUser;
