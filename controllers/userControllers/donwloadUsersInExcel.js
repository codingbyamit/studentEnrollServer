const exceljs = require("exceljs");
const User = require("../../models/User");
const { error, success } = require("../../utils/Wrapper");

const donwloadUsersInExcel = async (req, res) => {
    try {
        // Fetch users from MongoDB
        const users = await User.find();

        // Create a new Excel workbook
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        // Define the headers for the Excel file
        worksheet.columns = [
            { header: "Roll No", key: "rollNo", width: 15 },
            { header: "Name", key: "name", width: 15 },
            { header: "Parent's Name", key: "parentName", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Mobile", key: "mobile", width: 15 },
            { header: "Address", key: "address", width: 45 },
            { header: "Subjects", key: "subjects", width: 35 },
            // Add more columns as needed
        ];

        // Add data to the Excel file
        users.forEach((user) => {
            worksheet.addRow({
                rollNo: user.rollNo,
                name: user.name,
                parentName: user.parentName,
                email: user.email,
                mobile: user.mobile,
                address: `${user.village}, ${user.city}, ${user.pinCode}, ${user.state}`,
                subjects: user.subjects,

                // Add more properties as needed
            });
        });

        // Set response headers to trigger download
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

        // Send Excel file as response
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        res.send(error(500, err.message));
    }
};

module.exports = donwloadUsersInExcel;
