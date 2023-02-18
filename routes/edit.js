const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

// sửa công việc
router.put('/todo/:id', function (req, res) {
    // cập nhật cv và khớp vs cv trong db
    Todo.update({ _id: req.params.id }, { todo: req.body.todo }, function (err, doc) {
        if (err) throw err;
        console.log("item edited!");

        // cv đã đc chỉnh sửa 
        res.send(doc);
    });
});

// chỉnh sửa cv
router.put('/check/:id', function (req, res) {
    // cập nhật cv trong db khớp vs ng dùng 
    Todo.update({ _id: req.params.id }, { check: req.body.check }, function (err, doc) {
        if (err) throw err;
        console.log("checkbox edited!");

        // cho ng dùng xem cv đã chỉnh sửa
        res.send(doc);
    });
});
module.exports = router;