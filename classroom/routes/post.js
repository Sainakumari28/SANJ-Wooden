const express = require("express");
const router = express.Router();

//Index 
router.get("/", (req, res) => {
 res.send("GET for posts");
})

//Show 
router.get("/:id", (req, res) => {
 res.send("GET for posts id");
})

//POST 
router.get("/", (req, res) => {
 res.send("POST for posts");
})

// DELETE users
router.delete("/:id", (req, res) => {
    res.send("DELETE for post id");
})
