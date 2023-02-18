const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

// gửi mục việc cần làm mới
router.post('/todo', function (req, res) {
    // tạo mô hình việc cần làm với dữ liệu được truyền từ yêu cầu và lưu vào cơ sở dữ liệu

    Todo({
        todo: req.body.todo,
        check: req.body.check,
        username: req.session.user
    }).save(function (err, doc) {
        if (err) throw err;
        console.log("item saved!");

        // gửi phản hồi lại với đối tượng tài liệu đã được tạo
        res.send(doc);
    });
});

module.exports = router;