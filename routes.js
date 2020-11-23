const express = require("express");
const router = express.Router();
const createProject = require("./controller");

router.post("/createProject", createProject.createProject);
router.get("/getProjects", createProject.getProjects);

module.exports = router;
