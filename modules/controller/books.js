var DBUtil = require("../util/DBUtil");
var jsonResult = require("../util/JsonUtil");

var booksController = function() {};

booksController.getAll = function(req, res, next) {
  DBUtil.query("SELECT * FROM books", function(error, result) {
    if (error) {
      res.json(jsonResult(404, error));
    } else {
      res.json(jsonResult(200, "Get books success", result));
    }
  });
};

booksController.getByBookId = function(req, res, next) {
  const bookId = req.params.bookId;
  DBUtil.query("SELECT * FROM books WHERE bookId = ?", bookId, function(
    error,
    result
  ) {
    if (error) {
      res.json(jsonResult(500, error));
    } else if (result == "") {
      res.json(jsonResult(404, "Book with bookId " + bookId + " not found"));
    } else {
      res.json(jsonResult(200, "Get book success", result));
    }
  });
};

booksController.postBook = function(req, res, next) {
  let data = {
    // bookId: req.body.bookId,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    stock: req.body.stock
  };
  DBUtil.query("INSERT INTO books SET ?", data, function(error) {
    if (error) {
      res.json(jsonResult(404, error));
    } else {
      res.json(jsonResult(200, "Insert book success", data));
    }
  });
};

booksController.putBook = function(req, res, next) {
  let bookId = req.params.bookId;
  let data = {
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    stock: req.body.stock
  };
  DBUtil.query("UPDATE books SET ? WHERE bookId = ?", [data, bookId], function(
    error,
    result
  ) {
    if (error) {
      res.json(jsonResult(404, error));
    } else {
      res.json(
        jsonResult(200, "Update book with bookId " + bookId + " success", data)
      );
    }
  });
};

booksController.deleteByBookId = function(req, res, next) {
  let bookId = req.params.bookId;
  DBUtil.query("DELETE FROM books WHERE bookId = ?", bookId, function(
    error,
    result
  ) {
    if (error) {
      res.json(jsonResult(500, error));
    } else if (result.affectedRows == 0) {
      res.json(jsonResult(404, "Book with bookId " + bookId + " not found"));
    } else {
      res.json(
        jsonResult(200, "Delete book with bookId " + bookId + " success")
      );
    }
  });
};

module.exports = booksController;
