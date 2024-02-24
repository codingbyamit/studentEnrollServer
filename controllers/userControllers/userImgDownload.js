const User = require("../../models/User");
const { jsPDF } = require("jspdf");

const imgDownload = async (req, res) => {
    const userId = req._id;
    const user = await User.findById(userId);
    const userImg = user.avatar.url;
    console.log(userImg);
    const doc = new jsPDF();
    doc.text("hello world", 10, 10);
    doc.addImage(userImg, "JPEG", 50, 50, 100, 100);
    doc.save("a4.pdf");

    res.send(doc);
};

module.exports = imgDownload;
