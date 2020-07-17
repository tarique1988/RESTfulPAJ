const express = require("express");
const mongoose = require("mongoose");
const AuthorizationCheck = require("../Controllers/AuthorizationCheck");

const router = express.Router();
const Student = require("../Models/StudentModel");
const { request } = require("express");

// Find and display all the students
router.get("/", AuthorizationCheck, (req, res) => {
  Student.find()
    .select("-__v")
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
      if (result)
        res
          .status(201)
          .json({ loggedInAs: req.body.currentUser.name, student: result });
      else res.status(500).json({ error: "Failed to add student!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Lookup a student by id and display
router.get("/:id", AuthorizationCheck, (req, res) => {
  Student.findById(req.params.id)
    .select("-__v")
    .exec()
    .then((result) => {
      if (result)
        res.status(200).json({
          loggedInAs: req.body.currentUser.name,
          student: result,
        });
      else res.status(500).json({ error: "Student not found!" });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

router.patch("/:studentId", AuthorizationCheck, (req, res) => {
  const id = req.params.studentId;
  const updateOperations = {};
  for (const operations of req.body) {
    updateOperations[operations.propertyName] = operations.propertyValue;
  }

  Student.update({ _id: id }, { $set: updateOperations })
    .exec()
    .then((result) => {
      if (result.ok === 1)
        res.status(200).json({
          loggedInAs: req.body.currentUser.name,
          message: `Student with id: ${id} is now updated!`,
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", AuthorizationCheck, (req, res) => {
  Student.findByIdAndRemove(req.params.id)
    .select("-__v")
    .exec()
    .then((result) => {
      if (result)
        res
          .status(200)
          .json({
            message: "Student deleted successfully!",
            loggedInAs: req.body.currentUser.name,
            student: result,
          });
      else res.status(500).json({ error: "User not found!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
