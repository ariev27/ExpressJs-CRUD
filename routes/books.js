var express = require("express");
var router = express.Router();
var cors = require("cors");
var booksController = require("../modules/controller/books");

router.use(cors(), function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", booksController.getAll);
router.get("/:bookId", booksController.getByBookId);
router.post("/", booksController.postBook);
router.put("/:bookId", booksController.putBook);
router.delete("/:bookId", booksController.deleteByBookId);

module.exports = router;
