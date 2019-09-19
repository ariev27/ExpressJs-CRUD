var books = require("../../models/books");
var jsonResult = require("../util/JsonUtil");

var booksController = function() {};

booksController.getAll = function(req, res, next) {
  books
    .findAll()
    .then(result => {
      res.json(jsonResult(200, "Get all books success", result));
    })
    .catch(err => {
      res.json(jsonResult(500, err));
    });
};

booksController.getByBookId = function(req, res, next) {
  const bookId = req.params.bookId;
  books
    .findByPk(bookId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(jsonResult(500, err));
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

  books
    .create(data)
    .then(result => {
      res.json(jsonResult(200, "Post book success", result));
    })
    .catch(err => {
      res.json(jsonResult(500, err));
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

  books
    .findByPk(bookId)
    .then(result => {
      console.log("Result " + JSON.stringify(result));
      if (result) {
        return result.update(data);
      } else {
        throw Error("BookId " + bookId + " not found on database");
        // res.json(jsonResult(404, 'BookId ' + bookId + ' not found on database'))
      }
    })
    .then(result => {
      res.json(jsonResult(200, "Book update success", result));
    })
    .catch(err => {
      res.json(jsonResult(500, err.message));
    });

  //Versi update static, tipe kembaliannya affected rows
  // books.update(data, {where: {bookId: bookId}}).then((result) => {
  //     console.log("result " + JSON.stringify(result));
  //     console.log("result " + JSON.stringify(result[0]));
  //     if (result[0] == 0) {
  //         res.json(jsonResult(404, 'BookId not found'))
  //     } else {
  //         res.json(jsonResult(200, 'Update book success', data))
  //     }
  // }).catch((err) => {
  //     res.json(jsonResult(500, err))
  // })
};

booksController.deleteByBookId = function(req, res, next) {
  let bookId = req.params.bookId;
  books
    .destroy({ where: { bookId: bookId } })
    .then(result => {
      console.log(result);
      if (result == 0) {
        res.json(
          jsonResult(
            404,
            "Book with bookId " + bookId + " not found on database"
          )
        );
      } else {
        res.json(
          jsonResult(200, "Delete book with bookId " + bookId + " success")
        );
      }
    })
    .catch(err => {
      res.json(jsonResult(500, err));
    });
};

module.exports = booksController;
