const path = require('path')
const writeFile = require(path.join(process.cwd(), './helpers/writeFile'))

function removeTask (req, res) { //sẽ lọc qua các cv và loại bỏ cv có ID trùng với req.params.id
  const id = req.params.id
  req.session.tasks = req.session.tasks.filter(task => task.ID !== id)
  writeFile(req) //để lưu lại công việc đã được xóa và

  res.status(200).send('xóa thành công')
}

function removeTaskCompleted (req, res) {
  const id = req.params.id
  req.session.completed = req.session.completed.filter(task => task.ID !== id)
  writeFile(req)

  res.status(200).send('xóa xong nhiệm vụ ')
}

module.exports = {removeTask, removeTaskCompleted}
