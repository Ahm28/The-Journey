const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const {
  addBlog,
  getBlogs,
  getBlog,
  getBlogbyId,
  updateBlog,
} = require("../controllers/blogs");
const { getUser, addUser } = require("../controllers/user");
const {
  addBookmarks,
  getBookById,
  deleteBookmark,
} = require("../controllers/bookmarks");

const { uploadsFileImage } = require("../middlewares/uploadFileImages");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/user", getUser);
router.post("/user", addUser);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

router.post("/blog", auth, uploadsFileImage("image"), addBlog);
router.patch("/blog/:id", auth, uploadsFileImage("image"), updateBlog);
router.get("/blogs", getBlogs);
router.get("/blog", auth, getBlogbyId);
router.get("/blog/:id", getBlog);
router.delete("/blog/:id", getBlog);

router.post("/bookmark", auth, addBookmarks);
router.get("/bookmark", auth, getBookById);
router.delete("/bookmark/:id", auth, deleteBookmark);

module.exports = router;
