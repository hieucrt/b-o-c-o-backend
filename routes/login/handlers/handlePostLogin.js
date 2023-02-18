const fs = require('fs') //fs, path và strftime được yêu cầu để đọc các tập tin 
const path = require('path')
const strftime = require('strftime')
const crypto = require(path.join(process.cwd(), './helpers/crypto')) //giải mã
const decrypt = crypto.decrypt 
// đọc dữ liệu trong db và so sánh
function handlePostLogin (req, res) {
  const { email,  } = req.body
  let autentification = false

  fs.readFile('./data-db/users_txt.txt', {encoding:'utf-8'}, (err, data) => {
    if (err) throw err
    const usersArrEncrypted = data.split('\r\n') 
    const usersArrDecrypted = usersArrEncrypted.map((aAuthLine) => decrypt(aAuthLine))
    usersArrDecrypted.forEach((user) => {
      let [emailDB, passDB] = user.split(':')
      if (emailDB === email && passDB === password) {
        autentification = true
        req.session.login = { email }
        console.log('------------ đăng nhập mới --------------')
        console.log('user: ' + email)
        console.log('pass: ' + password)
        console.log('logged at: ' + strftime('%F:%T', new Date()))
        console.log('-------------------------------------')
      }
    })
    if (autentification) loadJSONtasks(req, res, email)
    else res.redirect('/Lỗi')
  })
}

function loadJSONtasks (req, res, userID) {
  const dataFileName = `./data-db/${userID?.split('@')[0]}.json`
  const data =fs.readFileSync(dataFileName, {encoding:'utf-8'})
   const newData = JSON.parse(data)
    req.session.tasks = newData.tasks
    req.session.completed = newData.completed
    res.redirect('/tasks/')
}

module.exports = handlePostLogin
