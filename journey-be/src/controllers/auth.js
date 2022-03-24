const { User } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = joi.object({
    fullname: joi.string().min(5).required(),
    email: joi.string().email().min(5).required(),
    password: joi.string().min(6).required(),
    phone: joi.number().min(5).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
    });

    res.status(201).send({
      status: "Success Add User",
      data: {
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().min(5).required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
      exclude: ["createdAt", "updatedAt", "password"],
    });

    if (!userExist) {
      return res.status(400).send({
        status: "Failed",
        message: "Email & password not match",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Email & password not match",
      });
    }

    const SECRET_KEY = "bebas";
    const token = jwt.sign({ id: userExist.id }, SECRET_KEY);

    res.status(200).send({
      status: "Success",
      data: {
        fullname: userExist.fullname,
        email: userExist.email,
        phone: userExist.phone,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "Success",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          email: dataUser.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
