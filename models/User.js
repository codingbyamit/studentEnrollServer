const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
        avatar: {
            publicId: {
                type: String,
                default: "",
            },
            url: {
                type: String,
                default: "",
            },
        },
        name: {
            type: String,
            required: true,
            uppercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
            minlength: 10,
            maxlength: 10,
        },
        rollNo: {
            type: String,
            default: generateRollNo,
            unique: true,
        },
        parentName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 15,
        },
        village: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 15,
        },
        city: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 15,
        },
        state: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 15,
        },
        pinCode: {
            type: Number,
            required: true,
            minlength: 6,
        },
        subjects: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

function generateRollNo() {
    let rollNo = "";
    for (let i = 0; i < 10; i++) {
        rollNo += Math.floor(Math.random() * 10);
    }
    return rollNo;
}

module.exports = mongoose.model("user", studentSchema);
