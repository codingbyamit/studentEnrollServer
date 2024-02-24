const User = require("../../models/User");
const { success, error } = require("../../utils/Wrapper");

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
        res.send(success(200, allUser));
    } catch (err) {
        res.send(error(500, err.message));
    }
};

module.exports = getAllUser;
