const Project = require("./model");
const HttpError = require("./http-error");
const { get } = require("mongoose");

const getProjects = async (req, res, next) => {
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    const error = new HttpError("Something went wrong, try again.", 500);
    return next(error);
  }

  res.json({ projects });
};

const createProject = async (req, res, next) => {
  const { title, description, techstack, demo, code, image } = req.body;

  const createdProject = new Project({
    title,
    description,
    techstack,
    demo,
    code,
    image,
  });

  try {
    await createdProject.save();
  } catch (err) {
    const error = new HttpError("Creating project failed, try again.", 500);
    return next(error);
  }
  res.status(201).json({ project: createdProject });
};

exports.createProject = createProject;
exports.getProjects = getProjects;
