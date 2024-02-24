const User = require("../../models/User");
const { success, error } = require("../../utils/Wrapper");

const profile = async (req, res) => {
    try {
        const userId = req._id;
        const email = req._email;

        if (userId) {
            const user = await User.findById(userId);
            res.send(success(200, user));
        }
        if (email) {
            const user = await User.findOne({ email });
            res.send(success(200, user));
        }
    } catch (err) {
        res.send(error(500, err.message));
    }
};

module.exports = profile;
