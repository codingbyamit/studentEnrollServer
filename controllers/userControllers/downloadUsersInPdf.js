const fs = require("fs");
const PDFDocument = require("pdfkit");
const User = require("../../models/User");

const downloadUsersInPdf = async (req, res) => {
    try {
        // Fetch users from MongoDB
        const users = await User.find();

        // Create a new PDF document
        const doc = new PDFDocument();

        // Pipe the PDF document to a writable stream
        const stream = fs.createWriteStream("users.pdf");
        doc.pipe(stream);

        // Add users' data to the PDF document
        users.forEach((user, index) => {
            doc.text(`Student : ${index + 1}`);
            doc.text("-----------------------------------------");
            doc.text(`Roll No : ${user.rollNo}`);
            doc.text(`Name : ${user.name}`);
            doc.text(`Parent Name : ${user.parentName}`);
            doc.text(`Email : ${user.email}`);
            doc.text(`Mobile : ${user.mobile}`);
            doc.text(
                `Address : ${user.village}, ${user.city}, ${user.pinCode}, ${user.state}`
            );
            doc.text(`Subjects : ${user.subjects}`);
            doc.text("-----------------------------------------");
            doc.text(" ");
        });

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
