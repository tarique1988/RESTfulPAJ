const express = require("express");
const mongoose = require("mongoose");
const AuthorizationCheck = require("../Controllers/AuthorizationCheck");

const router = express.Router();
const Student = require("../Models/StudentModel");

// Find and display all the students
router.get("/", AuthorizationCheck, (req, res) => {
  Student.find()
    .exec()
    .then((students) => {
      if (students.length > 0) {
        res.status(200).json({
          count: students.length,
          loggedInAs: req.body.currentUser.name,
          students: students,
        });
      } else {
        res.status(500).json({ error: "Students not found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Save a student and display the result
router.post("/", AuthorizationCheck, (req, res) => {
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
router.get("/:id", AuthorizationCheck, (req, res) => {
  Student.findById(req.params.id)
    .exec()
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(500).json({ error: "Student not found!" });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

router.patch("/:id", AuthorizationCheck, (req, res) => {
  res.status(200).json({
    message: `Here you can PATCH the student with id ${req.params.id}.`,
  });
});

router.delete("/:id", AuthorizationCheck, (req, res) => {
  Student.findByIdAndRemove(req.params.id)
    .exec()
    .then((result) => {
      if (result)
        res
          .status(200)
          .json({ message: "Student deleted successfully!", student: result });
      else res.status(500).json({ error: "User not found!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
