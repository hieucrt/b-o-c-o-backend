const path = require('path')
const writeFile = require(path.join(process.cwd(), './helpers/writeFile'))

function updateTask (req, res) {
  const id = req.params.id // để lấy id của task và duyệt qua danh sách
  for (let i = 0; i < req.session.tasks.length; i++) {
    if (req.session.tasks[i].ID === id)  { //tìm id ứng trong db
      req.session.completed.push(req.session.tasks[i]) //cập nhật và xóa
      req.session.tasks.splice(i, 1)
    }
  }
  writeFile(req) //cập nhật
  res.status(200).send('thay đổi thành công')
}

module.exports = updateTask
