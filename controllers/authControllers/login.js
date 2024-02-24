const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { error, success } = require("../../utils/Wrapper");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.send(error(200, "Email & Password are Required!"));

        const loginUser = await User.findOne({ email });
        if (!loginUser) return res.send(error(200, "User not Found"));
        const comparePassword = await bcrypt.compare(
            password,
            loginUser.password
        );
        if (!comparePassword) return res.send(error(200, "Invalid Password"));

        const accessToken = jwt.sign(
            { email },
            process.env.ACCESS_PRIVATE_TOKEN_KEY,
            {
                expiresIn: "2d",
            }
        );
        // const refreshToken = jwt.sign(
        //     { _id },
        //     process.env.REFRESH_PRIVATE_TOKEN_KEY,
        //     {
        //         expiresIn: "15d",
        //     }
        // );
        // res.cookie("jwt", refreshToken, { httpOnly: true, secure: true });

        return res.send(
            success(200, {
                accessToken,
            })
        );
    } catch (err) {
        res.send(error(500, err.message));
    }
};

module.exports = login;
