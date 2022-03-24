const { blogs, User } = require("../../models");

exports.addBlog = async (req, res) => {
  try {
    let data = req.body;
    let idUser = req.user.id;
    // console.log(idUser);

    let blogData = await blogs.create({
      ...data,
      image: req.file.filename,
      idUser,
    });

    blogData = JSON.parse(JSON.stringify(blogData));

    blogData = {
      ...blogData,
      image: blogData.image,
    };

    res.status(201).send({
      status: "Success",
      message: "Success Add Products",
      data: {
        blogData,
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

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      title: req?.body?.title,
      image: req?.file?.filename,
      description: req?.body?.description,
    };

    await blogs.update(data, {
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: "Succes update products",
      data: {
        id,
        data,
        image: req?.file?.filename,
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

exports.getBlogs = async (req, res) => {
  try {
    let dataBlogs = await blogs.findAll({
      attributes: {
        exclude: ["updatedAt", "idUser"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["updatedAt", "password", "createdAt"],
          },
        },
      ],
    });

    dataBlogs = JSON.parse(JSON.stringify(dataBlogs));

    dataBlogs = dataBlogs.map((blog) => {
      return {
        ...blog,
        image: process.env.PATH_FILE + blog.image,
      };
    });

    res.send({
      status: "success",
      data: {
        dataBlogs,
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

exports.getBlogbyId = async (req, res) => {
  try {
    const idUser = req.user.id;

    // console.log(req.user.id);

    let dataBlogs = await blogs.findAll({
      where: {
        idUser,
      },
      attributes: {
        exclude: ["updatedAt", "idUser"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["updatedAt", "password", "createdAt"],
          },
        },
      ],
    });

    dataBlogs = JSON.parse(JSON.stringify(dataBlogs));

    dataBlogs = dataBlogs.map((blog) => {
      return {
        ...blog,
        image: process.env.PATH_FILE + blog.image,
      };
    });

    res.send({
      status: "success",
      data: {
        dataBlogs,
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

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    let dataBlog = await blogs.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["updatedAt", "password", "createdAt"],
          },
        },
      ],
    });

    dataBlog = JSON.parse(JSON.stringify(dataBlog));

    dataBlog = {
      ...dataBlog,
      image: process.env.PATH_FILE + dataBlog.image,
    };

    res.send({
      status: "Success",
      data: {
        dataBlog,
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

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await blogs.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Success Delete PRoducts",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
