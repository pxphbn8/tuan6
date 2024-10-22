const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/students", async (req, res) => {
    const student = new Student({
        name: req.body.name,
        studentId: req.body.studentId,
        dateOfBirth: req.body.dateOfBirth
    });
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send("Sinh viên không tìm thấy");
        
        student.name = req.body.name;
        student.studentId = req.body.studentId;
        student.dateOfBirth = req.body.dateOfBirth;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send("Sinh viên không tìm thấy");
        
        await student.remove();
        res.json({ message: "Sinh viên đã được xóa" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
