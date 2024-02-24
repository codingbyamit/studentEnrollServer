const fs = require("fs");
const PDFDocument = require("pdfkit");
const User = require("../../models/User");
const request = require("request");
const downloadUsersInPdf = async (req, res) => {
    try {
        // Fetch users from MongoDB
        const userId = req._id;
        const user = await User.findById(userId);
        const userImg = user.avatar.url;

        // Create a new PDF document
        const doc = new PDFDocument();
        console.log("doc", doc);
        // Pipe the PDF document to a writable stream
        const stream = fs.createWriteStream("users.pdf");

        // Add users' data to the PDF document
        doc.text(
            `---------------------- STUDENT DATA OF ${user.name} ----------------------`
        );
        doc.text("\n");
        doc.text("\n");


        doc.text(`Roll No: ${user.rollNo}`);
        doc.text(`Name: ${user.name}`);
        doc.text(`Parent's Name: ${user.parentName}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Mobile: ${user.mobile}`);
        doc.text(
            `Address: ${user.village} ${user.city} ${user.pinCode} ${user.state}`
        );
        doc.text("Subjects:");
        user.subjects.forEach((sub, index) => {
            doc.text(`${index + 1} : ${sub}`);
        });
        doc.pipe(stream);
        // Finalize the PDF document
        doc.end();

        // Set response headers to trigger download
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=users.pdf");

        // Send the PDF file as response
        stream.on("finish", () => {
            res.download("users.pdf");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

module.exports = downloadUsersInPdf;
