const express = require("express");
const {
  getNews,
  updateNews,
  createNews,
  searchNewss,
  deleteNews,
  newsListDo,
  newsDetailDo,
  uploadUserPhoto,
} = require("./newsController");

// const { protect, restricTo } = require('../auth/auth.controller');

// console.log('protect:', protect);
// console.log('restricTo:', restricTo);
// console.log('uploadUserPhoto:', uploadUserPhoto);
// console.log('newsDetailDo:', newsDetailDo);
const router = express.Router();

router.route("").post(uploadUserPhoto, createNews).get(searchNewss);
router.route("/do").post(newsListDo);
router.route("/do/:id").post(newsDetailDo);

router
  .route("/:id")
  .patch(uploadUserPhoto, updateNews)
  .get(getNews)
  .delete(deleteNews);

module.exports = router;
