const { bookmarks, blogs, User } = require("../../models");

exports.addBookmarks = async (req, res) => {
  try {
    let idUSer = req.user.id;

    let bookmark = await bookmarks.create({
      idBlogs: req.body.idBlogs,
      idUSer,
    });

    res.send({
      status: "succes",
      data: {
        bookmark,
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

exports.getBookById = async (req, res) => {
  try {
    const idUser = req.user.id;

    let bookmark = await bookmarks.findAll({
      where: {
        idUser,
      },
      attributes: {
        exclude: ["updatedAt", "idBlogs", "idUSer", "createdAt"],
      },
      include: [
        {
          model: blogs,
          as: "blogs",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
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
        },
      ],
    });

    bookmark = JSON.parse(JSON.stringify(bookmark));

    bookmark = bookmark.map((item) => {
      return {
        ...item,
        blogs: {
          ...item.blogs,
          image: process.env.PATH_FILE + item.blogs.image,
        },
      };
    });

    res.send({
      status: "Success",
      data: {
        bookmark,
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

exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    await bookmarks.destroy({
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
