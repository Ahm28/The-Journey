const { User } = require("../../models");

exports.getUser = async (req, res) => {
  try {
    const dataUser = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.status(200).send({
      status: "Succes",
      data: {
        dataUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const data = req.body;
    const dataUser = await User.create(data);

    res.send({
      status: "Succes",
      message: "Add User success",
      data: {
        dataUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
