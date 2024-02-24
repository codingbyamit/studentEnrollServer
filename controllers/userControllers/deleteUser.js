const User = require("../../models/User");
const { success, error } = require("../../utils/Wrapper");
const cloudinary = require("cloudinary").v2;

const deleteUser = async (req, res) => {
    try {
        const email = req._email;

        const user = await User.findOne({email});
        const publicId = user.avatar.publicId;

        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.error("Error deleting image:", error);
            } else {
                console.log("Image deleted successfully:", result);
            }
        });

        await user.deleteOne();
        res.clearCookie("jwt", { httpOnly: true, secure: true });
        res.send(success(200, "Delete User Successfully"));
    } catch (err) {
        res.send(error(500, err.message));
    }
};

module.exports = deleteUser;
