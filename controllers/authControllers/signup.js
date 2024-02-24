const User = require("../../models/User");
const { success, error } = require("../../utils/Wrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            parentName,
            mobile,
            village,
            city,
            pinCode,
            state,
            subjects,
        } = req.body;
        if (!name || !email || !password) {
            return res.send(success(error(400, "All field Required")));
        }
        const alreadyUser = await User.findOne({ email });
        if (alreadyUser && alreadyUser.email === email) {
            return res.send(error(403, "User Already exist"));
        }
        const accessToken = jwt.sign(
            { email },
            process.env.ACCESS_PRIVATE_TOKEN_KEY,
            {
                expiresIn: "2d",
            }
        );

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashPassword,
            parentName,
            mobile,
            village,
            city,
            pinCode,
            state,
            subjects,
        });

        await user.save();

        return res.send(success(201, accessToken, "User Created Successfully"));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

module.exports = signup;
