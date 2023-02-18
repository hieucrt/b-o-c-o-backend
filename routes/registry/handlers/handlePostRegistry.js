const fs = require('fs')
const strftime = require('strftime')
const path = require('path')
const crypto = require(path.join(process.cwd(), './helpers/crypto'))
const decrypt = crypto.decrypt
const encrypt = crypto.encrypt

function handlePostRegistry (req, res) {
  const { email,  } = req.body
  const dataToWrite = `${email}:${password}`
  const encryptedData = '\r\n' + encrypt(dataToWrite)
  let existentUser = false
//đọc dữ liệu db
 const data = fs.readFileSync('./data-db/users_txt.txt', {encoding: 'utf-8'})

    const usersArrEncrypted = data.split('\r\n')                   //giải mã
    const usersArrDecrypted = usersArrEncrypted.map((aAuthLine) => decrypt(aAuthLine))
    usersArrDecrypted.forEach((user) => {
      let [emailDB] = user.split(':')
      if (emailDB === email) existentUser = true
    })
    if (existentUser) {
      console.log('Email đã đc sử dụng')
      res.redirect('/đăng ký/') 
    } else {
      fs.appendFile('./data-db/users_txt.txt', encryptedData, function (err) {
        if (err) throw err
        console.log('------ đăng ký mới --------------')
        console.log('email: ' + email)
        console.log('password: ' + password)
        console.log('registered at: ' + strftime('%F:%T', new Date()))
        console.log('encrypted as: ' + encryptedData)
        console.log('----------------------------------')
        createCleanUserTask(email)
        res.redirect('/')
      })
    }
}
//thông tin mới vào trong tệp tin rồi tạo tệp tin json mới
function createCleanUserTask (userID) {
  const newUserTask = {tasks: [], completed: []}
  fs.writeFileSync(`./data-db/${userID?.split('@')[0]}.json`, JSON.stringify(newUserTask),'utf-8')
}

module.exports = handlePostRegistry
