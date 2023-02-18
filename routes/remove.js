const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

// xóa cv
router.delete('/todo/:id', function (req, res) {
    // xóa cv trong db ứng vs id
    Todo.find({ _id: req.params.id }).remove(function (err, doc) {
        if (err) throw err;

        // gửi lại phản hồi
        res.send(doc);
    });
});

module.exports = router;