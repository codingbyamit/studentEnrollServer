const User = require("../../models/User");
const { success, error } = require("../../utils/Wrapper");
const cloudinary = require("cloudinary").v2;

const updateUser = async (req, res) => {
    try {
        const email = req._email;
        const {
            name,
            mobile,
            parentName,
            village,
            city,
            pinCode,
            state,
            subjects,
            userImg,
        } = req.body;

        const user = await User.findOneAndUpdate(
            { email },
            {
                name,
                parentName,
                mobile,
                village,
                city,
                pinCode,
                state,
                subjects,
                userImg,
            }
        );
        if (userImg) {
            const cloudImg = await cloudinary.uploader.upload(userImg, {
                folder: "profilePhoto",
            });
            user.avatar = {
                publicId: cloudImg.public_id,
                url: cloudImg.secure_url,
            };
        }

        await user.save();

        res.send(success(200, "User Updated"));
    } catch (err) {
        res.send(error(500, err.message));
    }
};

module.exports = updateUser;
