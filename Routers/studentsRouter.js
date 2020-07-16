const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Here you can GET all Students. ;)",
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Here you can POST a new student. :D",
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    message: `Here you can GET the student with id ${req.params.id}.`,
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
