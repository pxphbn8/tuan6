const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }
});

module.exports = mongoose.model("Student", studentSchema);

