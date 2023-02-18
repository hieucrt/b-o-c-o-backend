const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

let Account = require("../models/account");

// đăng xuất, phiên bị hủy và người dùng được chuyển hướng để đăng nhập
router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

//người dùng xem trang đăng ký
router.get("/register", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("register", { message: undefined });
  }
});

// người dùng gửi chi tiết đăng ký
router.post("/register", validateRegister(), function(req, res) {
  // mã hóa mk
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) throw error;

    // mã hóa tk mk trong db
    Account({
      username: req.body.username,
      password: hash
    }).save(function(err, doc) {
      // hiển thị lỗi nếu tk dk bị trùng
      if (err) {
        res.render("register", { message: "Username already exists." });

        // nếu ko thì chuyển đến phần đăng nhập
      } else {
        // sử dụng tk và mk để đăng nhập
        req.login(doc._id, function(err) {
          if (err) throw err;
          req.session.user = req.body.username;

          res.redirect("../");
        });
      }
    });
  });
  
});

// đăng nhập
router.get("/login", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("login", { message: undefined });
  }
});

// đang đăng nhập
router.post("/login", function(req, res) {
  // ko phan biệt chữ hoa và chữ thường
  req.body.username = req.body.username.toLowerCase();
  req.body.password = req.body.password.toLowerCase();

  // tìm tk mk trong db
  Account.find({ username: req.body.username }, function(err, doc) {
    if (err) throw err;

    // nếu tk vs mk ko có trong db sẽ tb lloix
    if (!doc.length) {
      res.render("login", { message: "Username or password is incorrect." });
    } else {
      // compare  with hashed password
      bcrypt.compare(req.body.password, doc[0].password, function(err, result) {
        if (err) throw err;

        //so sánh mk vs mk trong db
        if (result == true) {
          console.log("hash matches");

          // đúng thì sẽ đăng nhập
          req.login(doc[0]._id, function(err) {
            if (err) throw err;
            req.session.user = req.body.username;

            res.redirect("../");
          });

          //sai bắt đăng nhập lại
        } else {
          console.log("hash does not match");
          res.render("login", {
            message: "Username or password is incorrect."
          });
        }
      });
    }
  });
});


function validateRegister() {
  return function(req, res, next) {
    // chữ cái đầu ko phân biệt hoa vs thường
    req.body.username = req.body.username.toLowerCase();
    req.body.password = req.body.password.toLowerCase();

    if (
      validator.isAlphanumeric(req.body.username) &&
      validator.isAlphanumeric(req.body.username)
    ) {
      console.log("authentication = " + req.isAuthenticated());
      return next();
    }
    res.render("register", { message: "Invalid input. Try again." });
  };
}

module.exports = router;
