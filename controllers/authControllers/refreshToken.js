const { success, error } = require("../../utils/Wrapper");

const refreshTokenController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies) return res.send(error(401, "Refresh Token Required"));
    const refreshToken = cookies.jwt;
    try {
        const tokenVerify = jwt.verify(
            refreshToken,
            process.env.REFRESH_PRIVATE_TOKEN_KEY
        );
        const _id = tokenVerify._id;

        const accessToken = jwt.sign(
            { _id },
            process.env.ACCESS_PRIVATE_TOKEN_KEY,
            {
                expiresIn: "30m",
            }
        );

        return res.send(success(201, { accessToken }));
    } catch (err) {
        res.send(error(401, `Refresh Token Expired : ${err.message}`));
    }
};

module.exports = refreshTokenController;
