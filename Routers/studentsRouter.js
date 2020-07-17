const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = require("../Models/StudentModel");

// Find and display all the students
router.get("/", (req, res) => {
  Student.find()
    .then((students) => {
      if (students.length > 0)
        res.status(200).json({ count: students.length, students: students });
      else {
        res.status(500).json({ error: "Students not found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Save a student and display the result
router.post("/", (req, res) => {
  var student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });

  student
    .save()
    .then((result) => {
      if (result) res.status(201).json(result);
      else res.status(500).json({ error: "Failed to add student!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Lookup a student by id and display
router.get("/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(500).json({ error: "Student not found!" });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

router.patch("/:id", (req, res) => {
  res.status(200).json({
    message: `Here you can PATCH the student with id ${req.params.id}.`,
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: `Here you can DELETE the student with id ${req.params.id}`,
  });
});

module.exports = router;
