const { success, error } = require("../../utils/Wrapper");

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, secure: true });
        res.send(success(200, "User Logged Out"));
    } catch (err) {
        res.send(error(500, err.message));
    }
};

module.exports = logout;
